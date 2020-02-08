import { GameObject } from "./GameObject.js";

export class Wall extends GameObject {
    constructor() {
        super({
            images: ["./Assets/images/default.png"],
            frames: {width: 64, height: 64},
            animations: {
                idle: 0
            }
        }, "wall");
    }
}