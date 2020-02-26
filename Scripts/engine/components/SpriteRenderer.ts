import { GameComponent } from "../GameComponent.js";
import { GameObject } from "../GameObject.js";
import { EventName } from "./EventName.js";

export class SpriteRenderer extends GameComponent {
	private _sprite: createjs.Sprite;
	private _facingRight: boolean;

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(gameObject: GameObject, spriteSheetData: Record<string, any>) {
		super(gameObject);

		// https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
		const spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		this._sprite = new createjs.Sprite(spriteSheet);
		
		this.sprite.regX = 32;
		this.sprite.regY = 32;

		this._facingRight = true;
		
		this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, data => {
			this.sprite.x = data.x;
			this.sprite.y = data.y;
		});
	}
}