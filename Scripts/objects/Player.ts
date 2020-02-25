import { GameObject } from "../engine/GameObject.js";
import { Mover } from "../engine/components/Mover.js";
import { SpriteRenderer } from "../engine/components/SpriteRenderer.js";
import { Collider } from "../engine/components/Collider.js";

export class Player extends GameObject {
	constructor() {
		super();

		this.addComponent(SpriteRenderer, new SpriteRenderer(this, {
			images: ["./Assets/images/AgentMorris_SpriteSheet.png"],
			frames: { width: 64, height: 64 },
			animations: {
				idle: [0, 1, undefined, 0.1],
				walk: [2, 3, undefined, 0.2],
				run: [2, 3, undefined, 0.4],
			}
		}));

		this.addComponent(Collider, new Collider(this, {
			tag: "player",
			width: 26,
			height: 32,
			offset: { x: 16, y: 32 }
		}));

		this.addComponent(Mover, new Mover(this));

		this._init();
	}

	private _init() {
		this.getComponent(SpriteRenderer).sprite.gotoAndPlay("idle");
	}
}
