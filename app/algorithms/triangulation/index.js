const MINIMAL_POINTS_COUNT_FOR_TRIANGULATION = 3

function getTriangulationPoints(points, alg) {

	if (points.size < MINIMAL_POINTS_COUNT_FOR_TRIANGULATION)
		throw "At least " + MINIMAL_POINTS_COUNT_FOR_TRIANGULATION + " points are required for triangulation."

	switch (alg) {
		case MODES_SETTINGS.TRIANGULATION_DELAUNAY:
			return delaunay(points)
			break

		case MODES_SETTINGS.TRIANGULATION_SWEEP_LINE:
		default:
			return sweepLine(points)
			break
	}

}