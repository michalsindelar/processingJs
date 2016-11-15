"use strict"

const flipEdge = edge => [edge[1], edge[0]]
const sameOrFlipEdge = (e1, e2) => sameEdge(e1, e2) || sameEdge(e1, flipEdge(e2))
const sameEdge = (e1, e2) => e1[0] === e2[0] && e1[1] === e2[1]

const containsEdge = (edges, edge) => !!edges.find(e => sameEdge(e, edge))
const containsEdgeAndFlipEdge = (edges, edge) => containsEdge(edges, edge) && containsEdge(edges, flipEdge(edge))

const euclideanDistance = (a, b) => createVector(a.x, a.y).dist(createVector(b.x, b.y))
const hasPointsOnTheLeft = (points, edge) => points.reduce(
	(agr, point) => leftHandedTest(...edge, point) || agr
, false)

const filterPointsOnLeft = (points, edge) => points
	.filter(point => point !== edge[0] && point !== edge[1])
	.filter(point => leftHandedTest(...edge, point))

const circumCenter = (a, b, c) => {
	const D = (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y)

	const center = new Point(
		(((a.x - c.x) * (a.x + c.x) + (a.y - c.y) * (a.y + c.y)) / 2 * (b.y - c.y)
		-  ((b.x - c.x) * (b.x + c.x) + (b.y - c.y) * (b.y + c.y)) / 2 * (a.y - c.y))
		/ D,
		(((b.x - c.x) * (b.x + c.x) + (b.y - c.y) * (b.y + c.y)) / 2 * (a.x - c.x)
		-  ((a.x - c.x) * (a.x + c.x) + (a.y - c.y) * (a.y + c.y)) / 2 * (b.x - c.x))
		/ D
	)

	const rad = Math.sqrt(Math.pow(c.x - center.x, 2) + Math.pow(c.y - center.y, 2))
	return center
}

const delaunyDistance  = (a,b,c) => {

	// Impossible to create circum circle
	if (curveTest(a,b,c) === CURVE_CONSTS.INLINE) {
		return Infinity
	}

	const center = circumCenter(a,b,c)

	return leftHandedTest(a, b, center)
		? euclideanDistance(a, center)
		: -euclideanDistance(a, center)
}

/**
 *
 * @param points immutable List
 */
const delaunay = (points) => {

	let sortedPoints = points.sortBy(point => point.x || point.y)
	const extremePoint = sortedPoints.first()

	sortedPoints = sortedPoints.sortBy(point => euclideanDistance(extremePoint, point)) // Find closest point
	const closestPoint = sortedPoints.shift().first()

	let initialEdge = [extremePoint, closestPoint]

	initialEdge = hasPointsOnTheLeft(
		sortedPoints.filter(point => point !== extremePoint && point !== closestPoint),
		initialEdge
	)
		? initialEdge
		: flipEdge(initialEdge)

	// Delaunay closest
	const p2 = filterPointsOnLeft(sortedPoints, initialEdge)
		.sortBy(point => delaunyDistance(...initialEdge, point))
		.first()

	let AEL = new Immutable.List()
	let DT = new Immutable.List()

	AEL = AEL.push(
		initialEdge,
		[initialEdge[1], p2],
		[p2, initialEdge[0]]
	)

	while (AEL.size) {
		let edge = AEL.first()
		edge = flipEdge(edge)

		const p = filterPointsOnLeft(sortedPoints, edge)
			.sortBy(point => delaunyDistance(...edge, point))
			.first()

		if (p) {
			const e2 = [p, edge[0]]
			const e3 = [edge[1], p]

			if (
				!containsEdgeAndFlipEdge(DT, e2) &&
				!containsEdgeAndFlipEdge(AEL, e2)
			) {
				AEL = AEL.push(e2)
			}

			if (
				!containsEdgeAndFlipEdge(DT, e3) &&
				!containsEdgeAndFlipEdge(AEL, e3)
			) {
				AEL = AEL.push(e3)
			}
		}

		DT = DT.push(edge)

		AEL = AEL.shift()
	}
	return DT
}

