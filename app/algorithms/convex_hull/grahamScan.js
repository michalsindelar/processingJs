function grahamScan(points) {
	// TODO: Solve case when more of same y coordinates
	var pivot = points.minBy(a => a.y)

	var sortedPoints = points.remove(pivot).toList().sortBy(
		point => p5.Vector.angleBetween(
			createVector(1, 0),
			createVector(point.x - pivot.x, point.y - pivot.y )
		)
	)

	let convexHull = new Immutable.List()
	convexHull = convexHull.push(pivot)
	convexHull = convexHull.push(sortedPoints.first())

	var j = 1 // difference we don't have pivot in sorted points

	while (j < sortedPoints.size) {
		var point = sortedPoints.get(j)

		if (leftHandedTest( convexHull.pop().last(), convexHull.last(), point) >= 0) {
			convexHull = convexHull.push(point)
			j++
		} else {
			convexHull = convexHull.pop() // exclude last point
		}
	}

	return convexHull
}


/**
 * Test of 3 points orientation
 *
 * returns > 0 if 3 points left-handed
 * returns 0 if 3 in row
 * returns < 0 if 3 points right-handed
 *
 * @param prevPoint
 * @param currPoint
 * @param nextPoint
 */
function leftHandedTest(prevPoint, currPoint, nextPoint) {
	return (currPoint.x - prevPoint.x) * (nextPoint.y - prevPoint.y) -
		(currPoint.y - prevPoint.y) * (nextPoint.x - prevPoint.x)
}