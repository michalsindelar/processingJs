// GLOBAL VARIABLES HERE
// ===
var points = new Immutable.Set(); // Immutable
var mode;

// SEPARATE STORE
// ===
var SETTINGS = {
	pointRadius: 20,
	acceptedFocusDeviation: 20,

	canvasWidth: window.innerWidth,
	canvasHeight: window.innerHeight * .8,

}

// COMMON TOOLS
// ===
const drawLine = (a, b, color = [0,0,0]) => {
	line(a.x, a.y, b.x, b.y)
	stroke(color)
}
const dfs = (node, depth, extraFnc = () => {}) => {
	node.line &&
		extraFnc(
			node.line[0],
			node.line[1],
			depth % 2
				? [150, 0, 0]
				: [0, 0, 150]
		)

	node.leftNode &&
		dfs(node.leftNode, depth + 1, extraFnc)
	node.rightNode &&
		dfs(node.rightNode, depth + 1, extraFnc)
}

function setup() {

	// Full width + create space for Menu
	createCanvas(
		SETTINGS.canvasWidth,
		SETTINGS.canvasHeight
	);

	// noStroke();
	background(255, 255, 255);
}

function draw() {
	clear()

	// Draw all points
	points.map((point, index) => drawPoint(point.x, point.y))

	const drawPolygon = pointsList => {
		pointsList.map((point, i) => {
			drawLine(point, pointsList.get((i+1) % pointsList.size))
			stroke(0)
		})
	}

	if (MODES.DIRECT_POINTS_SET) {
		drawPolygon(points.toList())
	}

	// All modes can emit exception (minimal point count)
	try {

		// CONVEX HULL
		// ===
		if (MODES.GIFT_WRAPPING || MODES.GRAHAM_SCAN) {

			const convexHull = MODES.GIFT_WRAPPING ?
				getConvexHullList(points, MODES_SETTINGS.GIFT_WRAPPING) :
				getConvexHullList(points, MODES_SETTINGS.GRAHAM_SCAN)

			drawPolygon(convexHull)

		}

		// TRIANGULATION
		// ===

		// Sweep line
		if (MODES.TRIANGULATION_SWEEP_LINE) {
			const inputPolygon = MODES.DIRECT_POINTS_SET
				? points.toList()
				: getConvexHullList(points, MODES_SETTINGS.GRAHAM_SCAN)

			const triangulationDiagonals =
				getTriangulationPoints(
					inputPolygon,
					MODES_SETTINGS.TRIANGULATION_SWEEP_LINE
				)


			!MODES.DIRECT_POINTS_SET && drawPolygon(inputPolygon)

			triangulationDiagonals.map((diagonal) => {
				drawLine(diagonal[0], diagonal[1])
				stroke(0)
			})
		}

		// Delaunay
		if (MODES.TRIANGULATION_DELAUNAY) {
			const triangulationDiagonals =
				getTriangulationPoints(
					points.toList(),
					MODES_SETTINGS.TRIANGULATION_DELAUNAY
				)
			triangulationDiagonals.map((diagonal) => {
				drawLine(diagonal[0], diagonal[1])
				stroke(0)
			})

		}

		// ORTHOGONAL SORTING
		// ===
		if (MODES.KD_TREE) {
			const rootNode = getOrthogonalDataStructure(
				points,
				[new Point(0, 0), new Point(SETTINGS.canvasWidth, SETTINGS.canvasHeight)]
			)
			dfs(rootNode, 0, drawLine)
		}


		// VORONOI DIAGRAM
		// ===
		if (MODES.VORONOI) {
			const [centerPoints, edges] = getDiagram(points.toList(), MODES_SETTINGS.VORONOI)
			centerPoints.map(center => {
				stroke([255,0,0])
				drawPoint(center.x, center.y)
				stroke([0,0,0])
			})
			edges.map(edge => {
				stroke([255,0,0])
				drawLine(edge[0], edge[1])
				stroke([0,0,0])
			})

		}
	} catch (e) {
		// Show alert and recover from exception
		window.alert(e)
		restartApp()
	}
}



function mousePressed() {
	if ($("canvas:hover").length === 0) return // interaction only above canvas

	var existingPoint = findExistingPoint()

	// Add point
	if (mouseButton == LEFT && !existingPoint) {
		addPoint(new Point(mouseX, mouseY))
	}
	// Remove point
	else if (mouseButton == RIGHT && existingPoint) {
		removePoint(existingPoint)
	}
}

function mouseDragged() {
	var existingPoint = findExistingPoint()

	// Move point with mouse
	if (existingPoint) {
		existingPoint.x = mouseX
		existingPoint.y = mouseY
	}
}

function findExistingPoint() {
	return points.find((point) => Math.abs(point.x - mouseX) < SETTINGS.acceptedFocusDeviation && Math.abs(point.y - mouseY) < SETTINGS.acceptedFocusDeviation)
}

function addPoint(point) {
	points = points.add(point)
}

function addRandomPoint() {
	addPoint(new Point(_.random(0, SETTINGS.canvasWidth), _.random(0, SETTINGS.canvasHeight)))
}

function removePoint(existingPoint) {
	points = points.remove(existingPoint)
}

function removeRandomPoint() {
	points = points.remove(points.last())
}

function drawPoint(x, y) {
	fill(200, 200, 200);
	ellipse(x, y, SETTINGS.pointRadius, SETTINGS.pointRadius);
	text("[" + round(x) + "," + round(y) + "]", x + 15, y);
}

function keyPressed() {
	SETTINGS.canvasHeight = 10
}

/**
 * Clear all app data (points etc)
 */
function clearAppData() {
	points = points.clear()

	// Not very nice
	for( var key in MODES ) {
		MODES[key] = false;
	}
}

/**
 * Restarts the app to initial settings
 */
function restartApp() {
	clear(); // native processing clear
	clearAppData();
	setup();
}

