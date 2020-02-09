import { Collider } from "./Collider.js";
import { Point2D } from "./Point2D.js";

export abstract class GameObject {
	// Public
	public sprite: createjs.Sprite;
	public collider: Collider;

	// TODO: Add AABB either here or in collider
	// Probably in collider

	// Properties

	private _position: Point2D = new Point2D();
	public get position(): Point2D {
		return this._position;
	}
	public set position(v: Point2D) {
		this._position = v;
		this.sprite.x = v.x;
		this.sprite.y = v.y;
	}

	private _facingRight: boolean = true;
	public get facingRight(): boolean {
		return this._facingRight;
	}
	public set facingRight(value: boolean) {
		this._facingRight = value;
		this.sprite.scaleX = (value ? 1 : -1);
	}

	constructor(spriteSheetData: Object, colliderTag: string) {
		// https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
		let spriteSheet = new createjs.SpriteSheet(spriteSheetData);

		this.sprite = new createjs.Sprite(spriteSheet);
		this.sprite.gotoAndPlay("idle");

		this.sprite.regX = 32;
		this.sprite.regY = 32;

		this.collider = new Collider(colliderTag);
	}

}