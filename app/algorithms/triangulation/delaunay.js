"use strict"

const flipEdge = edge => [edge[1], edge[0]]
const sameOrFlipEdge = (e1, e2) => sameEdge(e1, e2) || sameEdge(e1, flipEdge(e2))
const sameEdge = (e1, e2) => e1[0] === e2[0] && e1[1] === e2[1]

const containsEdge = (edges, edge) => !!edges.find(e => sameEdge(e, edge))
const containsEdgeAndFlipEdge = (edges, edge) => containsEdge(edges, edge) && containsEdge(edges, flipEdge(edge))
const containsEdgeOrFlipEdge = (edges, edge) => containsEdge(edges, edge) || containsEdge(edges, flipEdge(edge))

const euclideanDistance = (a, b) => createVector(a.x, a.y).dist(createVector(b.x, b.y))
const hasPointsOnTheLeft = (points, edge) => points.reduce(
	(agr, point) => leftHandedTest(...edge, point) || agr
, false)

const filterPointsOnLeft = (points, edge) => points
	.filter(point => point !== edge[0] && point !== edge[1])
	.filter(point => leftHandedTest(...edge, point))

const delaunyDistance  = (a,b,c) => {

	// Impossible to create circum circle
	if (curveTest(a,b,c) === CURVE_CONSTS.INLINE) {
		return Infinity
	}

	const center = Triangle.staticCircumCenter(a,b,c)

	return leftHandedTest(a, b, center)
		? euclideanDistance(a, center)
		: -euclideanDistance(a, center)
}

/**
 *
 * @param points immutable List
 */
const delaunay = (points, voronoiSupport = false) => {

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

	let TR = new Immutable.Set()

	AEL = AEL.push(
		initialEdge,
		[initialEdge[1], p2],
		[p2, initialEdge[0]]
	)

	if (voronoiSupport) {
		TR = TR.add(new Triangle(initialEdge[0], initialEdge[1], p2))
	}

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

				if (voronoiSupport) {
					const newTriangle = new Triangle(p, edge[0], edge[1])
					TR = TR.filter(triangle => triangle !== newTriangle)
					TR = TR.add(newTriangle)
				}
			}

			if (
				!containsEdgeAndFlipEdge(DT, e3) &&
				!containsEdgeAndFlipEdge(AEL, e3)
			) {
				AEL = AEL.push(e3)

				if (voronoiSupport) {
					const newTriangle = new Triangle(edge[1], p, edge[0])
					TR = TR.filter(triangle => triangle !== newTriangle)
					TR = TR.add(newTriangle)
				}
			}
		}

		DT = DT.push(edge)

		AEL = AEL.shift()
	}
	return voronoiSupport
		? [DT, TR]
		: DT
}

