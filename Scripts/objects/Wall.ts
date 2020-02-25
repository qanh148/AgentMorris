import { GameObject } from "../engine/GameObject.js";
import { SpriteRenderer } from "../engine/components/SpriteRenderer.js";
import { Collider } from "../engine/components/Collider.js";

export class Wall extends GameObject {
	constructor() {
		super();

		this.addComponent(SpriteRenderer, new SpriteRenderer(this, {
			images: ["./Assets/images/default.png"],
			frames: { width: 64, height: 64 },
			animations: {
				idle: 0
			}
		}));

		this.addComponent(Collider, new Collider(this, {
			tag: "wall",
			width: 64,
			height: 64,
			offset: { x: 0, y: 0 }
		}));

		this._init();
	}

	private _init() {
		this.getComponent(SpriteRenderer).sprite.gotoAndPlay("idle");
	}
}