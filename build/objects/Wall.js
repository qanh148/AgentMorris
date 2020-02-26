import { GameObject } from "../engine/GameObject.js";
import { SpriteRenderer } from "../engine/components/SpriteRenderer.js";
import { Collider } from "../engine/components/Collider.js";
export class Wall extends GameObject {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: ["./Assets/images/default.png"],
            frames: { width: 64, height: 64 },
            animations: {
                idle: 0
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: "wall",
            width: 64,
            height: 64,
            offset: { x: 0, y: 0 }
        }));
        this._init();
    }
    _init() {
        this._spriteRenderer.sprite.gotoAndPlay("idle");
    }
}
//# sourceMappingURL=Wall.js.map