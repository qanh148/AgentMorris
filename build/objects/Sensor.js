import { GameObject } from "../engine/GameObject.js";
import { SpriteRenderer } from "../engine/components/SpriteRenderer.js";
import { Collider } from "../engine/components/Collider.js";
export class Sensor extends GameObject {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: ["./Assets/images/sensorPlaceholder.png"],
            frames: { width: 64, height: 64 },
            animations: {
                idle: 0
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: "sensor",
            isTrigger: true,
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
//# sourceMappingURL=Sensor.js.map