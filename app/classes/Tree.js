

class Tree {
	constructor() {

	}
}

class Node {
	/**
	 * @param point Point class
	 */
	constructor(point, line) {
		this.point = point
		this.line = line
		this.parentNode = null
		this.leftNode = null
		this.rightNode = null
	}
}