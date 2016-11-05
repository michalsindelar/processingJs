const AXIS = {
	X: "x",
	Y: "y",
}

const isEven = number => !(number % 2)
const getPointsMedian = (points, axis = AXIS.X) => {
	return axis === AXIS.X
		? points.sortBy(point => point.x).get(median(points.size) - 1)
		: points.sortBy(point => point.y).get(median(points.size) - 1)
}
const median = x => Math.ceil(x / 2)
const splitPoints = (points, depth) => {

	const sortedPoints = isEven(depth)
		? points.sortBy(point => point.x)
		: points.sortBy(point => point.y)

	return [
		sortedPoints.take(median(sortedPoints.size)),
		sortedPoints.takeLast(sortedPoints.size - median(sortedPoints.size) + 1)
	]
}
const splitLine = (points, depth) => {
	const median = getPointsMedian(points, isEven(depth) ? AXIS.X : AXIS.Y)
	const sortedPoints = points.sortBy(point => isEven(depth) ? point.y : point.x)

	return [
		new Point(
			isEven(depth)
				? median.x
				: sortedPoints.first().x,
			isEven(depth)
				? sortedPoints.first().y
				: median.y
		),
		new Point(
			isEven(depth)
				? median.x
				: sortedPoints.last().x,
			isEven(depth)
				? sortedPoints.last().y
				: median.y
		)
	]
}
/**
 * @param points Immutable list
 * @param depth Integer
 * @returns Node
 */
function buildKdTree(points, depth = 0) {
	// Special case
	if (points.size === 2) {
		return new Node(points.get(0))
	}

	// Initialize node
	let node = new Node(
		getPointsMedian(points, isEven(depth) ? AXIS.X : AXIS.Y),
		splitLine(points, depth)
	)

	// Test decomposition
	const [left, right] = splitPoints(points, depth)


	node.leftNode = buildKdTree(left, depth + 1)
	node.rightNode = buildKdTree(right, depth + 1)

	return node
}