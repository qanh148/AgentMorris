import { GameComponent } from "../GameComponent.js";
import { GameObject } from "../GameObject.js";
import { Point2D } from "../interfaces/Point2D.js";

export class Transform extends GameComponent {
	private _position: Point2D;
	
	public get position(): Point2D {
		return this._position;
	}
	public set position(v: Point2D) {
		this._position = Object.assign({}, v);
	}

	constructor(gameObject: GameObject) {
		super(gameObject);

		this._position = {x:0, y:0};
	}
}