import { GameComponent } from "../GameComponent.js";
import { Point2D } from "../interfaces/Point2D.js";
import { Collider } from "./Collider.js";
import { GameObject } from "../GameObject.js";
import { SpriteRenderer } from "./SpriteRenderer.js";
import { Transform } from "./Transform.js";

export enum MoveDirection {
	Up, Down, Left, Right
}

export class Mover extends GameComponent {
	private transform: Transform;
	private spriteRenderer: SpriteRenderer;
	private collider: Collider;
	
	// Private
	private _moveSpeed = 5;
	private _movingX = 0;
	private _movingY = 0;

	private _collided = false;
	private _lastUncollidedPos: Point2D = { x: 0, y: 0 };

	constructor(gameObject: GameObject) {
		super(gameObject);

		this.transform = gameObject.getComponent(Transform);
		this.spriteRenderer = gameObject.getComponent(SpriteRenderer);
		this.collider = gameObject.getComponent(Collider);

		// TODO: Don't need to check collision every time you move,
		// Rather, turn on a bool to check collision IF there was movement
		// That check should be in a time based loop
		// UPDATE: Nah, go with predicted next step model
		// ALSO: Check collision before actually moving to avoid moving twice
		// ALSO: Determine if there's a better way to prevent movement instead of this flag

		this.gameObject.eventManager.addListener("moved", () => {
			// this.setPosition(this.parent.position);
			this.collider.checkCollision();
		});

		this.gameObject.eventManager.addListener("moveStart", moveDirection => {
			this.moveStart(moveDirection);
		});
		this.gameObject.eventManager.addListener("moveStop", moveDirection => {
			this.moveStop(moveDirection);
		});

		this.gameObject.eventManager.addListener("collisionEnter", otherColliderAbstract => {
			const otherCollider = otherColliderAbstract as Collider;
			if (otherCollider.tag == "wall") {
				this._collided = true;
			}
		});
		this.gameObject.eventManager.addListener("collisionExit", otherColliderAbstract => {
			const otherCollider = otherColliderAbstract as Collider;
			if (otherCollider.tag == "wall") {
				this._collided = false;
			}
		});
	}

	public moveStart(moveDirection: MoveDirection): void {
		switch (moveDirection) {
			case MoveDirection.Up:
				this._movingY = -this._moveSpeed;
				break;
			case MoveDirection.Down:
				this._movingY = this._moveSpeed;
				break;
			case MoveDirection.Left:
				this.spriteRenderer.facingRight = false;
				this._movingX = -this._moveSpeed;
				break;
			case MoveDirection.Right:
				this.spriteRenderer.facingRight = true;
				this._movingX = this._moveSpeed;
				break;
		}

		if (this._movingX != 0 || this._movingY != 0) {
			this.spriteRenderer.sprite.gotoAndPlay("walk");
		}
	}

	public moveStop(moveDirection: MoveDirection): void {
		switch (moveDirection) {
			case MoveDirection.Up:
			case MoveDirection.Down:
				this._movingY = 0;
				break;
			case MoveDirection.Left:
				this.spriteRenderer.facingRight = false;
				this._movingX = 0;
				break;
			case MoveDirection.Right:
				this.spriteRenderer.facingRight = true;
				this._movingX = 0;
				break;
		}

		if (this._movingX == 0 && this._movingY == 0) {
			this.spriteRenderer.sprite.gotoAndPlay("idle");
		}
	}

	public update(): void {
		if (this._movingX != 0 || this._movingY != 0) {
			this.updateMove();
		}
	}

	private updateMove(): void {
		const newPos: Point2D = Object.assign({}, this.transform.position);

		// If first run, save pos
		if (this._lastUncollidedPos.x == 0 && this._lastUncollidedPos.y == 0) {
			this._lastUncollidedPos = Object.assign({}, newPos);
		}

		// Move based on moving vars
		if (this._movingX != 0) {
			newPos.x += this._movingX;
		}
		if (this._movingY != 0) {
			newPos.y += this._movingY;
		}

		// Set new pos, which also sets collision etc
		this.transform.position = newPos;
		this.gameObject.eventManager.invoke("moved");

		// Move back based on collision
		if (this._collided) {
			this.transform.position = Object.assign({}, this._lastUncollidedPos);
		} else {
			this._lastUncollidedPos = Object.assign(this.transform.position);
		}
	}
}