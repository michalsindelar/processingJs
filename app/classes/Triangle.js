/**
 * Created by michal on 30/09/16.
 */
class Triangle {
	constructor(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;

		this.circumCenter = this.getCircumCenter()
	}

	static staticCircumCenter (a, b, c) {
		const D = (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y)

		return new Point(
			(((a.x - c.x) * (a.x + c.x) + (a.y - c.y) * (a.y + c.y)) / 2 * (b.y - c.y)
			-  ((b.x - c.x) * (b.x + c.x) + (b.y - c.y) * (b.y + c.y)) / 2 * (a.y - c.y))
			/ D,
			(((b.x - c.x) * (b.x + c.x) + (b.y - c.y) * (b.y + c.y)) / 2 * (a.x - c.x)
			-  ((a.x - c.x) * (a.x + c.x) + (a.y - c.y) * (a.y + c.y)) / 2 * (b.x - c.x))
			/ D
		)
	}

	hasSharedEdge(otherTriangle) {
		return this.edges.reduce((acc, edge) =>
			otherTriangle.edges.reduce((otherAcc, otherEdge) =>
				sameOrFlipEdge(edge, otherEdge) || otherAcc
			, false) || acc
		, false)
	}

	get edges() {
		return([[this.a, this.b], [this.b, this.c], [this.c, this.a]])
	}

	getCircumCenter() {
		return Triangle.staticCircumCenter(this.a, this.b, this.c)
	}
}

// same circumcenter and at one point - sufficient
Triangle.prototype.equals = function(b) {
	return	typeof b !== 'undefined' &&
		b !== null &&
		this.circumCenter.equals(b.circumCenter) &&
		(this.a == b.a || this.a == b.b || this.a == b.c)
}