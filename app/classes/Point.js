/**
 * Created by michal on 30/09/16.
 */
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

Point.prototype.equals = function(b) {
	return	typeof b !== 'undefined' &&
		b !== null &&
		this.x === b.x &&
		this.y === b.y
}