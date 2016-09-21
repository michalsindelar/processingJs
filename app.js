// GLOBAL VARIABLES HERE
var points = []; // Immutable
var mode;

// SEPARATE STORE
var SETTINGS = {
	pointRadius: 20,
	acceptedFocusDeviation: 20
}

// CUSTOM CLASSES
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}


function setup() {

	createCanvas(800, 500);
	noStroke();

	// color del fondo
	background(255, 0, 88);
}

function draw() {
	background(255, 255, 255, 10);

	// Draw all points
	points.map((point, index) => drawPoint(point.x, point.y))
}

function mouseClicked() {
	var existingPoint = findExistingPoint()

	// Add point
	if (mouseButton == LEFT && !existingPoint) {
		points.push(new Point(mouseX, mouseY))
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

function drawPoint(x, y) {
	fill(0, 0, 0, 100);
	ellipse(x, y, SETTINGS.pointRadius, SETTINGS.pointRadius);
}

/**
 * TODO: Decide what should restart the app - probably some btn
 */
function keyPressed() {
	restartApp();
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

