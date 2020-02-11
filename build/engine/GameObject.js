import { Collider } from "./components/Collider.js";
import { EventManager } from "./components/EventManager.js";
export class GameObject {
    //#endregion
    constructor(spriteSheetData, colliderTag) {
        this._eventManager = new EventManager(this);
        this._position = { x: 0, y: 0 };
        // https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
        let spriteSheet = new createjs.SpriteSheet(spriteSheetData);
        this._sprite = new createjs.Sprite(spriteSheet);
        this._facingRight = true;
        this._collider = new Collider(this, colliderTag);
        this.sprite.regX = 32;
        this.sprite.regY = 32;
    }
    //#region Property getters/setters
    get eventManager() {
        return this._eventManager;
    }
    get position() {
        return this._position;
    }
    set position(v) {
        this._position = Object.assign({}, v);
        this.collider.setPosition(v);
        this.sprite.x = v.x;
        this.sprite.y = v.y;
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
    get collider() {
        return this._collider;
    }
}
//# sourceMappingURL=GameObject.js.map