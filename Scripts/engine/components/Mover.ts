import { GameComponent } from "../GameComponent.js";
import { Point2D } from "../interfaces/Point2D.js";
import { ColliderData, Collider } from "./Collider.js";
import { GameObject } from "../GameObject.js";

export enum MoveDirection {
	Up, Down, Left, Right
}

export class Mover extends GameComponent {
	// Private
	private _moveSpeed: number = 5;
	private _movingX: number = 0;
	private _movingY: number = 0;

	private _collided: boolean = false;
	private _lastUncollidedPos: Point2D = { x: 0, y: 0 };

	constructor(parent: GameObject) {
		super(parent);

		// TODO: Don't need to check collision every time you move,
		// Rather, turn on a bool to check collision IF there was movement
		// That check should be in a time based loop
		// UPDATE: Nah, go with predicted next step model
		// ALSO: Check collision before actually moving to avoid moving twice
		// ALSO: Determine if there's a better way to prevent movement instead of this flag

		this.parent.eventManager.addListener("moved", () => {
			// this.setPosition(this.parent.position);
			this.parent.collider.checkCollision();
		});

		this.parent.eventManager.addListener("moveStart", moveDirection => {
			this.moveStart(moveDirection);
		});
		this.parent.eventManager.addListener("moveStop", moveDirection => {
			this.moveStop(moveDirection);
		});

		this.parent.eventManager.addListener("collisionEnter", otherColliderAbstract => {
			let otherCollider = otherColliderAbstract as Collider;
			if (otherCollider.tag == "wall") {
				this._collided = true;
			}
		});
		this.parent.eventManager.addListener("collisionExit", otherColliderAbstract => {
			let otherCollider = otherColliderAbstract as Collider;
			if (otherCollider.tag == "wall") {
				this._collided = false;
			}
		});
	}

	public moveStart(moveDirection: MoveDirection) {
		switch (moveDirection) {
			case MoveDirection.Up:
				this._movingY = -this._moveSpeed;
				break;
			case MoveDirection.Down:
				this._movingY = this._moveSpeed;
				break;
			case MoveDirection.Left:
				this.parent.facingRight = false;
				this._movingX = -this._moveSpeed;
				break;
			case MoveDirection.Right:
				this.parent.facingRight = true;
				this._movingX = this._moveSpeed;
				break;
		}

		if (this._movingX != 0 || this._movingY != 0) {
			this.parent.sprite.gotoAndPlay("walk");
		}
	}

	public moveStop(moveDirection: MoveDirection) {
		switch (moveDirection) {
			case MoveDirection.Up:
			case MoveDirection.Down:
				this._movingY = 0;
				break;
			case MoveDirection.Left:
				this.parent.facingRight = false;
				this._movingX = 0;
				break;
			case MoveDirection.Right:
				this.parent.facingRight = true;
				this._movingX = 0;
				break;
		}

		if (this._movingX == 0 && this._movingY == 0) {
			this.parent.sprite.gotoAndPlay("idle");
		}
	}

	public update() {
		if (this._movingX != 0 || this._movingY != 0) {
			this.updateMove();
		}
	}

	private updateMove() {
		let newPos: Point2D = Object.assign({}, this.parent.position);

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
		this.parent.position = newPos;
		this.parent.eventManager.invoke("moved");

		// Move back based on collision
		if (this._collided) {
			this.parent.position = Object.assign({}, this._lastUncollidedPos);
		} else {
			this._lastUncollidedPos = Object.assign(this.parent.position);
		}
	}
}