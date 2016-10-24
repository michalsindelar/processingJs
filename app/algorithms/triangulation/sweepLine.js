/**
 * Input points create convex polygon
 *
 * @param points
 * @returns {*}
 */
function sweepLine(points) {

	// Ensure that first point of input points are lexicographic minimal
	while (points.first() !== points.minBy(point => point.y)) {
		points = points.push(points.first())
		points = points.shift()
	}

	// TODO: Fix lexicographic sorting
	var sortedPoints = points.sortBy(point => point.y)

	// Divide into right left path
	const pathsSeparator = points.indexOf(sortedPoints.last())

	const leftPath = points.takeLast(points.size - pathsSeparator - 1).reverse()
	const rightPath = points.take(pathsSeparator).shift()

	// Path seems correct

	// Stack top --> stack.last()
	// Stack bot --> stack.first()
	var stack = new Immutable.Stack()
	stack = stack.push(sortedPoints.first()) // v1
	stack = stack.push(sortedPoints.shift().first()) // v2

	const pointsOnSamePath = (a, b) => {
		return  leftPath.includes(a)   && leftPath.includes(b) ||
				rightPath.includes(a)  && rightPath.includes(b)
	}


	var diagonals = new Immutable.List()

	// i = 2, we're indexing from 1
	for (var i = 2; i < points.size; i++) {
		var processedPoint = sortedPoints.get(i)

		if (pointsOnSamePath(processedPoint, stack.first())) {

			const testFunction = leftHandedTest(processedPoint, stack.shift().first(), stack.first()) ?
				_.partial(leftHandedTest) :
				_.partial(rightHandedTest)

			while(testFunction(processedPoint, stack.shift().first(), stack.first())) {
				// j == at first top of stack, j - k in stack
				diagonals = diagonals.push([processedPoint, stack.shift().first()])
				stack = stack.shift()
			}

			stack = stack.push(processedPoint)
		}

		else {
			var topStack = stack.first()
			while(!stack.isEmpty()) {
				diagonals = diagonals.push([processedPoint, stack.first()])
				stack = stack.shift()
			}
			stack = stack.push(topStack)
			stack = stack.push(processedPoint)
		}
	}

	return diagonals
}