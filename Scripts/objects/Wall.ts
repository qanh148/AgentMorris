import { GameObject } from "../engine/GameObject.js";
import { SpriteRenderer } from "../engine/components/SpriteRenderer.js";
import { Collider } from "../engine/components/Collider.js";

export class Wall extends GameObject {
	private _spriteRenderer: SpriteRenderer;

	constructor() {
		super();

		this._spriteRenderer = new SpriteRenderer(this, {
			images: ["./Assets/images/wallPlaceholder.png"],
			frames: { width: 64, height: 64 },
			animations: {
				idle: 0
			}
		});

		this.addComponent(SpriteRenderer, this._spriteRenderer);

		this.addComponent(Collider, new Collider(this, {
			tag: "wall",
			isTrigger: false,
			width: 64,
			height: 64,
			offset: { x: 0, y: 0 }
		}));

		this._init();
	}

	private _init(): void {
		this._spriteRenderer.sprite.gotoAndPlay("idle");
	}
}