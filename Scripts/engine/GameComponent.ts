import { GameObject } from "./GameObject";

export abstract class GameComponent {
	private _parent : GameObject;

	public get parent() : GameObject {
		return this._parent;
	}
	public set parent(v : GameObject) {
		this._parent = v;
	}
	
	constructor(parent:GameObject) {
		this._parent = parent;
	}
}