// GLOBAL VARIABLES HERE
var points = new Immutable.Set(); // Immutable
var mode;

// SEPARATE STORE
var SETTINGS = {
	pointRadius: 20,
	acceptedFocusDeviation: 20,

	canvasWidth: window.innerWidth,
	canvasHeight: window.innerHeight * .8,

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

	// Enabled modes
	if (MODES.GIFT_WRAPPING) {
		const convexHull = getConvexHullList(points)
		convexHull.map((point, i) => {
			line(point.x, point.y, convexHull.get((i+1) % convexHull.size).x, convexHull.get((i+1) % convexHull.size).y)
			stroke(0)
		})
	}
}



function mousePressed() {
	if ($(".Menu:hover").length !== 0) return // menu interaction handles jquery binding
	if ($(".Modes:hover").length !== 0) return // menu interaction handles jquery binding

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

