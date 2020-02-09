export class Point2D {
	private _x: number = 0;
	public get x(): number {
		return this._x;
	}
	public set x(v: number) {
		this._x = v;
	}

	private _y: number = 0;
	public get y(): number {
		return this._y;
	}
	public set y(v: number) {
		this._y = v;
	}
}