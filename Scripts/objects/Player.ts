import { GameObject } from "../engine/GameObject.js";
import { Mover } from "../engine/components/Mover.js";

export class Player extends GameObject {
	private _mover: Mover;


	public get mover(): Mover {
		return this._mover;
	}
	public set mover(v: Mover) {
		this._mover = v;
	}
	

	constructor() {
		super({
			images: ["./Assets/images/AgentMorris_SpriteSheet.png"],
			frames: { width: 64, height: 64 },
			animations: {
				idle: [0, 1, undefined, 0.1],
				walk: [2, 3, undefined, 0.2],
				run: [2, 3, undefined, 0.4],
			}
		}, {
			tag: "player",
			width: 26,
			height: 32,
			offset: {x: 16, y: 32}
		});

		this.sprite.gotoAndPlay("idle");


		this._mover = new Mover(this);

		// this.collider.onCollisionEnter = (collider) => {
		// 	if (collider.tag == "wall") {
		// 		console.log("hit wall");
		// 	}
		// };
	}
}
