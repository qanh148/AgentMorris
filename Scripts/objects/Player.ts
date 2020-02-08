import { GameObject } from "./GameObject.js";

export class Player extends GameObject {
    constructor() {
        super({
            images: ["./Assets/images/AgentMorris_SpriteSheet.png"],
            frames: {width: 64, height: 64},
            animations: {
                idle: [0, 1, undefined, 0.1],
                walk: [2, 3, undefined, 0.2],
                run: [2, 3, undefined, 0.4],
            }
        }, "player");
    }
}
