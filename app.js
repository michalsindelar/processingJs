// GLOBAL VARIABLES HERE
var points = []; // Immutable
var mode;

// SEPARATE STORE
var SETTINGS = {
	pointRadius: 20,
	acceptedFocusDeviation: 20,

	canvasWidth: window.innerWidth,
	canvasHeight: window.innerHeight * .8,

}

// CUSTOM CLASSES
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}


function setup() {

	// Full width + create space for Menu
	createCanvas(
		SETTINGS.canvasWidth,
		SETTINGS.canvasHeight
	);

	noStroke();

	background(10, 10, 10);
}

function draw() {
	background(255, 255, 255);

	// Draw all points
	points.map((point, index) => drawPoint(point.x, point.y))
}

function mouseClicked() {
	var existingPoint = findExistingPoint()

	// Add point
	if (mouseButton == LEFT && !existingPoint) {

		addPoint(new Point(mouseX, mouseY))
	}
	// Remove point
	else if (mouseButton == RIGHT && existingPoint) {
		points.splice(points.indexOf(existingPoint), 1)
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
	points.push(point)
}

function addRandomPoint() {
	addPoint(new Point(_.random(0, SETTINGS.canvasWidth), _.random(0, SETTINGS.canvasHeight)))
}

function drawPoint(x, y) {
	fill(200, 200, 200);
	ellipse(x, y, SETTINGS.pointRadius, SETTINGS.pointRadius);
}

function keyPressed() {
	SETTINGS.canvasHeight = 10
}

/**
 * Clear all app data (points etc)
 */
function clearAppData() {
	points = [];
}

/**
 * Restarts the app to initial settings
 */
function restartApp() {
	clear(); // native processing clear
	clearAppData();
	setup();
}

