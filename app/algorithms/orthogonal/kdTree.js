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
		sortedPoints.takeLast(sortedPoints.size - median(sortedPoints.size))
	]
}
const splitLine = (points, allowedArea, depth) => {
	const median = getPointsMedian(points, isEven(depth) ? AXIS.X : AXIS.Y)

	// even ... |  vertical line
	// odd  ... -- horizontal line
	return [
		new Point(
			isEven(depth)
				? median.x
				: allowedArea[0].x,
			isEven(depth)
				? allowedArea[0].y
				: median.y
		),
		new Point(
			isEven(depth)
				? median.x
				: allowedArea[1].x,
			isEven(depth)
				? allowedArea[1].y
				: median.y
		)
	]
}
/**
 * @param points Immutable list
 * @param allowedArea
 * @param depth Integer
 * @returns Node
 */
function buildKdTree(points, allowedArea, depth = 0) {
	// Special case
	if (points.size === 1) {
		return new Node(points.get(0))
	}

	const median = getPointsMedian(points, isEven(depth) ? AXIS.X : AXIS.Y)

	// Initialize node
	let node = new Node(
		median,
		splitLine(points, allowedArea, depth)
	)

	// left == bottom, right == upper (based on vertical / horizontal split line)
	const [left, right] = splitPoints(points, depth)

	const leftArea = isEven(depth)
		? [allowedArea[0], new Point(median.x, allowedArea[1].y)]
		: [allowedArea[0], new Point(allowedArea[1].x, median.y)]

	const rightArea = isEven(depth)
		? [new Point(median.x, allowedArea[0].y), allowedArea[1]]
		: [new Point(allowedArea[0].x, median.y), allowedArea[1]]

	node.leftNode = buildKdTree(left, leftArea, depth + 1)
	node.rightNode = buildKdTree(right, rightArea, depth + 1)

	return node
}