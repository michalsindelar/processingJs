const MINIMAL_POINTS_COUNT_FOR_VORONOI = 3

function getDiagram(points, alg) {

	const [triangulationDiagonals, triangles] = delaunay(points, true)

	if (points.size < MINIMAL_POINTS_COUNT_FOR_VORONOI)
		throw "At least " + MINIMAL_POINTS_COUNT_FOR_VORONOI + " points are required for triangulation."

	switch (alg) {
		case MODES_SETTINGS.VORONOI:
		default:
			return voronoiFromDelaunay(triangles)
	}

}

