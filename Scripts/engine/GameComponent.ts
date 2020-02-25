import { GameObject } from "./GameObject";

export abstract class GameComponent {
	private _gameObject : GameObject;

	public get gameObject() : GameObject {
		return this._gameObject;
	}
	// public set gameObject(v : GameObject) {
	// 	this._gameObject = v;
	// }
	
	constructor(gameObject:GameObject) {
		this._gameObject = gameObject;
	}
}

// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
