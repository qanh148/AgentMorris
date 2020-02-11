import { GameObject } from "../engine/GameObject.js";
export class Wall extends GameObject {
    constructor() {
        super({
            images: ["./Assets/images/default.png"],
            frames: { width: 64, height: 64 },
            animations: {
                idle: 0
            }
        }, {
            tag: "wall",
            width: 64,
            height: 64,
            offset: { x: 0, y: 0 }
        });
        this.sprite.gotoAndPlay("idle");
    }
}
//# sourceMappingURL=Wall.js.map