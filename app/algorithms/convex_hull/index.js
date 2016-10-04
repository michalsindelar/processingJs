const MINIMAL_POINTS_COUNT_FOR_HULL = 3

function getConvexHullList(points, alg) {

	if (points.size < MINIMAL_POINTS_COUNT_FOR_HULL)
		throw "At least " + MINIMAL_POINTS_COUNT_FOR_HULL + " points are required for convex hull."



	switch (mode) {
		case MODES.GIFT_WRAPPING:
			return giftWrapping(points)
			break;

		case MODES.GRAHAM_SCAN:
			return grahamScan(points)

		default:
			return giftWrapping(points)
	}

}