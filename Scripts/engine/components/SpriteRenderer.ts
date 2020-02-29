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
	
	public set facingRight(toggle: boolean) {
		this._facingRight = toggle;
		this.sprite.scaleX = (toggle ? 1 : -1);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(gameObject: GameObject, spriteSheetData: Record<string, any>) {
		super(gameObject);

		// https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
		const spriteSheet = new createjs.SpriteSheet(spriteSheetData);
		this._sprite = new createjs.Sprite(spriteSheet);
		
		// REMINDER: Don't hard-code regXY values
		this.sprite.regX = 32;
		this.sprite.regY = 32;

		this._facingRight = true;

		this.gameObject.container.addChild(this.sprite);
		// this.gameObject.eventManager.addListener(EventName.GameObject_Init, stage => {
		// 	(stage as createjs.Stage).addChild(this.sprite);
		// });
		
		this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, data => {
			this.sprite.x = data.x;
			this.sprite.y = data.y;
		});

		this.gameObject.eventManager.addListener(EventName.Mover_Turned, data => {
			this.facingRight = data.facingRight;
		});

		this.gameObject.eventManager.addListener(EventName.Mover_StartWalk, () => {
			this.sprite.gotoAndPlay("walk");
		});

		this.gameObject.eventManager.addListener(EventName.Mover_StopWalk, () => {
			this.sprite.gotoAndPlay("idle");
		});
	}
}