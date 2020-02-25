import { Collider, ColliderData } from "./components/Collider.js";
import { EventManager } from "./components/EventManager.js";
import { Point2D } from "./interfaces/Point2D.js";

export abstract class GameObject {
	private _eventManager: EventManager;
	private _position: Point2D;
	private _sprite: createjs.Sprite;
	private _facingRight: boolean;
	private _collider: Collider;

	//#region Property getters/setters

	public get eventManager(): EventManager {
		return this._eventManager;
	}

	public get position(): Point2D {
		return this._position;
	}
	public set position(v: Point2D) {
		this._position = Object.assign({}, v);
		this.collider.setPosition(v);
		this.sprite.x = v.x;
		this.sprite.y = v.y;
	}

	public get sprite(): createjs.Sprite {
		return this._sprite;
	}

	public get facingRight(): boolean {
		return this._facingRight;
	}
	public set facingRight(value: boolean) {
		this._facingRight = value;
		this.sprite.scaleX = (value ? 1 : -1);
	}

	public get collider(): Collider {
		return this._collider;
	}

	//#endregion

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(spriteSheetData: Record<string, any>, colliderData: ColliderData) {
		this._eventManager = new EventManager(this);

		this._position = {x:0, y:0};
		
		// https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
		const spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		this._sprite = new createjs.Sprite(spriteSheet);

		this._facingRight = true;
		this._collider = new Collider(this, colliderData);

		this.sprite.regX = 32;
		this.sprite.regY = 32;
	}
}
