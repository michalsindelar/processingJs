const MINIMAL_POINTS_COUNT_FOR_ORTHOGONAL_STRUCTURE = 3

function getOrthogonalDataStructure(points, alg) {

	if (points.size < MINIMAL_POINTS_COUNT_FOR_ORTHOGONAL_STRUCTURE)
		throw "At least " + MINIMAL_POINTS_COUNT_FOR_ORTHOGONAL_STRUCTURE + " points are required for triangulation."

	switch (alg) {
		case MODES_SETTINGS.KD_TREE:
		default:
			return buildKdTree(points.toList())
	}

}

