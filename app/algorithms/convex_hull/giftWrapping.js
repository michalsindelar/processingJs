/**
 * Created by michal on 27/09/16.
 */

const MINIMAL_POINTS_COUNT_FOR_HULL = 3

function getConvexHullList(points, alg) {

	if (points.size < MINIMAL_POINTS_COUNT_FOR_HULL)
		throw "At least " + MINIMAL_POINTS_COUNT_FOR_HULL + " points are required for convex hull."

	switch (mode) {

		default:
			return giftWrapping(points)
	}

}

/**
 *
 * @param points Immutable.Set
 * @returns Ordered Immutable.List with points creating the convex hull
 */
function giftWrapping(points) {
	var convexHull = new Immutable.List()

	// Finds point with minimal y coordinate
	// Store for better readibility
	var pivot = points.minBy(a => a.y)

	// Push pivot to convex hull
	convexHull = convexHull.push(pivot)

	// Use pivot as current point in first loop
	var nextPoint

	while (!pivot.equals(convexHull.last()) || convexHull.size < MINIMAL_POINTS_COUNT_FOR_HULL) {

		nextPoint = findNextConvexHullPoint(
			points.subtract(convexHull.shift().toSet()), // remove points from convex hull except for pivot
			convexHull.pop().last() || new Point(pivot.x - 10, pivot.y), // prevLast
			convexHull.last() // last
		)

		convexHull = convexHull.push(nextPoint)
	}

	// remove duplicity of picot occurrence
	convexHull = convexHull.pop()

	return convexHull
}

/**
 * Find point x with minimal angle between vectors
 * <prevPoint, currPoint> and <currPoint, x>
 * Default Infinity value because of <0,0> vector NaN problem
 *
 * @param restOfPoints
 * @param prevPoint
 * @param currPoint
 * @returns {*}
 */
function findNextConvexHullPoint(restOfPoints, prevPoint, currPoint) {
	return restOfPoints
		.minBy(newPoint =>
			p5.Vector.angleBetween(
				createVector(currPoint.x - prevPoint.x, currPoint.y - prevPoint.y),
				createVector(newPoint.x - currPoint.x, newPoint.y - currPoint.y )
			) || Infinity
		)
}