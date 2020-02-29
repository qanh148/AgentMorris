import { GameObject } from "./GameObject.js";

export abstract class GameComponent {
	private _gameObject: GameObject;

	public get gameObject(): GameObject {
		return this._gameObject;
	}
	// public set gameObject(v : GameObject) {
	// 	this._gameObject = v;
	// }
	
	constructor(gameObject: GameObject) {
		this._gameObject = gameObject;
	}
	
	// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
	public init(stage: createjs.Stage): void {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public update(): void {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public destroy(): void {}
}

export interface GameComponentType<T extends GameComponent> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new(...args: any[]): T;
}

// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
// https://dev.to/krumpet/generic-type-guard-in-typescript-258l
