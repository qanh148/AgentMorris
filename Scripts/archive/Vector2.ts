module objects {
	export class Vector2 {
		// PRIVATE INSTANCE
		private _x: number = 0;
		private _y: number = 0;
		private _magnitude: number = 0;
		private _sqrMagnitude: number = 0;

		//#region PUBLIC PROP

		get x(): number {
			return this._x;
		}

		set x(x: number) {
			this._x = x;
		}

		get y(): number {
			return this._y;
		}

		set y(y: number) {
			this._y = y;
		}

		get magnitude(): number {
			return this._magnitude;
		}

		set magnitude(magnitude: number) {
			this._magnitude = magnitude;
		}

		get sqrMagnitude(): number {
			return this._sqrMagnitude;
		}

		set sqrMagnitude(sqrMagnitude: number) {
			this._sqrMagnitude = sqrMagnitude;
		}

		get normalized(): Vector2 {
			let vector2 = new Vector2(this.x, this.y);
			vector2.normalize();
			return vector2;
		}

		//#endregion

		// CONSTRUCTOR

		constructor(x: number = 0, y: number = 0) {
			this.x = x;
			this.y = y;
			this.sqrMagnitude = this.x * this.x + this.y * this.y;
			this.magnitude = Math.sqrt(this.sqrMagnitude);
		}

		// PRIVATE METHODS

		// PUBLIC METHODS

		public add(addVector: Vector2) {
			this.x += addVector.x;
			this.y += addVector.y;
		}

		public subtract(subtractVector: Vector2) {
			this.x -= subtractVector.x;
			this.y -= subtractVector.y;
		}

		public scale(scalar: number) {
			this.x *= scalar;
			this.y *= scalar;
		}

		public static zero(): Vector2 {
			return new Vector2(0, 0);
		}

		public static one(): Vector2 {
			return new Vector2(1, 1);
		}

		public static up(): Vector2 {
			return new Vector2(0, 1);
		}

		public static down(): Vector2 {
			return new Vector2(0, -1);
		}

		public static right(): Vector2 {
			return new Vector2(1, 0);
		}

		public static left(): Vector2 {
			return new Vector2(-1, 0);
		}

		public normalize() {
			let magnitude = this.magnitude;
			if (magnitude > 9.99999974737875E-06) {
				this.x = this.x / magnitude;
				this.y = this.y / magnitude;
			} else {
				return Vector2.zero();
			}
		}

		public static dot(lhs: Vector2, rhs: Vector2): number {
			return lhs.x * rhs.x + lhs.y * rhs.y;
		}

        /**
         * Returns distance between p1 and p2
         *
         * @static
         * @param {Vector2} p1
         * @param {Vector2} p2
         * @returns {number}
         * @memberof Vector2
         */
		public static distance(p1: Vector2, p2: Vector2): number {
			return Math.sqrt(this.sqrDistance(p1, p2));
			// let xDiff = (p2.x - p1.x);
			// let yDiff = (p2.y - p1.y);
			// return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		}

        /**
         * Return square distance between p1 and p2
         *
         * @static
         * @param {Vector2} p1
         * @param {Vector2} p2
         * @returns {number}
         * @memberof Vector2
         */
		public static sqrDistance(p1: Vector2, p2: Vector2): number {
			let xDiff = (p2.x - p1.x);
			let yDiff = (p2.y - p1.y);
			return xDiff * xDiff + yDiff * yDiff;
		}
	}
}