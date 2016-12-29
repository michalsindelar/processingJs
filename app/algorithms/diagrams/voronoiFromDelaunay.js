/*
 Find circum center of neighbour triangle or
 finds edge point using normal vector of edge
 */
const findNeighbourCircumCenter = (circumCenter, edge, triangles) => {
	const neighbourTriangle = triangles
		.filter(triangle => containsEdgeOrFlipEdge(triangle.edges, edge))

	return neighbourTriangle.first()
		? neighbourTriangle.first().circumCenter
		: createVector(circumCenter.x, circumCenter.y).sub(getNormalVectorOfEdge(edge).mult(99))
}

const getNormalVectorOfEdge = edge => {
	const edgeVector = createVector(edge[1].x - edge[0].x, edge[1].y - edge[0].y)
	return createVector(-edgeVector.y, edgeVector.x)
}


function voronoiFromDelaunay(triangles) {

	let edges = new Immutable.Set()

	triangles.map(triangle => {
		const neighbourTriangles = triangles
			.filter(neighbourTriangle =>
				!triangle.equals(neighbourTriangle) &&
				triangle.hasSharedEdge(neighbourTriangle)
			)

		const triangleEdges = triangle.edges

		edges = edges.add([triangle.circumCenter, findNeighbourCircumCenter(triangle.circumCenter, triangleEdges[0], neighbourTriangles)])
		edges = edges.add([triangle.circumCenter, findNeighbourCircumCenter(triangle.circumCenter, triangleEdges[1], neighbourTriangles)])
		edges = edges.add([triangle.circumCenter, findNeighbourCircumCenter(triangle.circumCenter, triangleEdges[2], neighbourTriangles)])

	})

	return [
		Immutable.Set.of(triangles.map(triangle => triangle.circumCenter)),
		edges
	]
}

