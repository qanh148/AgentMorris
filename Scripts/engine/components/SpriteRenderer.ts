import { GameComponent } from "../GameComponent.js";
import { GameObject } from "../GameObject.js";

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

	constructor(gameObject: GameObject, spriteSheetData: Record<string, any>) {
		super(gameObject);

		// https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
		const spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		this._sprite = new createjs.Sprite(spriteSheet);
		
		this.sprite.regX = 32;
		this.sprite.regY = 32;

		this._facingRight = true;
		
		this.gameObject.eventManager.addListener("TransformPositionUpdate", data => {
			this.sprite.x = data.x;
			this.sprite.y = data.y;
		});
	}
}