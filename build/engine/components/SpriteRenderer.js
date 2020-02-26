import { GameComponent } from "../GameComponent.js";
import { EventName } from "./EventName.js";
export class SpriteRenderer extends GameComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(gameObject, spriteSheetData) {
        super(gameObject);
        // https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
        const spriteSheet = new createjs.SpriteSheet(spriteSheetData);
        this._sprite = new createjs.Sprite(spriteSheet);
        this.sprite.regX = 32;
        this.sprite.regY = 32;
        this._facingRight = true;
        this.gameObject.eventManager.addListener(EventName.GameObject_Init, stage => {
            stage.addChild(this.sprite);
        });
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
    get sprite() {
        return this._sprite;
    }
    get facingRight() {
        return this._facingRight;
    }
    set facingRight(value) {
        this._facingRight = value;
        this.sprite.scaleX = (value ? 1 : -1);
    }
}
//# sourceMappingURL=SpriteRenderer.js.map