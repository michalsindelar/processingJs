const MINIMAL_POINTS_COUNT_FOR_HULL = 3

function getConvexHullList(points, alg) {

	if (points.size < MINIMAL_POINTS_COUNT_FOR_HULL)
		throw "At least " + MINIMAL_POINTS_COUNT_FOR_HULL + " points are required for convex hull."

	switch (alg) {
		case MODES_SETTINGS.GIFT_WRAPPING:
			return giftWrapping(points)
			break;

		case MODES_SETTINGS.GRAHAM_SCAN:
			return grahamScan(points)
			break;

		default:
			return giftWrapping(points)
	}

}