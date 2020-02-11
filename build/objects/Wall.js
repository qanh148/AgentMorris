import { GameObject } from "../engine/GameObject.js";
export class Wall extends GameObject {
    constructor() {
        super({
            images: ["./Assets/images/default.png"],
            frames: { width: 64, height: 64 },
            animations: {
                idle: 0
            }
        }, "wall");
        this.sprite.gotoAndPlay("idle");
        this.collider.aabb.width = 64;
        this.collider.aabb.height = 64;
    }
}
//# sourceMappingURL=Wall.js.map