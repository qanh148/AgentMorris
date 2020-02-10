import { GameObject } from "./GameObject.js";
import { Point2D } from "./interfaces/Point2D.js";
import { Collider } from "./components/Collider.js";

export enum MoveDirection {
	Up, Down, Left, Right
}

export class MovingGameObject extends GameObject {
	// Private
	private _moveSpeed: number = 5;
	private _movingX: number = 0;
	private _movingY: number = 0;

	private _collided: boolean = false;
	private _lastUncollidedPos: Point2D = { x: 0, y: 0 };

	constructor(spriteSheetData: Object, colliderTag: string) {
		super(spriteSheetData, colliderTag);

		this.eventManager.addListener("moveStart", moveDirection => {
			this.moveStart(moveDirection);
		});
		this.eventManager.addListener("moveStop", moveDirection => {
			this.moveStop(moveDirection);
		});

		this.eventManager.addListener("collisionEnter", otherColliderData => {
			let otherCollider = otherColliderData as Collider;
			if (otherCollider.tag == "wall") {
				this._collided = true;
			}
		});
		this.eventManager.addListener("collisionExit", otherColliderData => {
			let otherCollider = otherColliderData as Collider;
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
				this.facingRight = false;
				this._movingX = -this._moveSpeed;
				break;
			case MoveDirection.Right:
				this.facingRight = true;
				this._movingX = this._moveSpeed;
				break;
		}

		if (this._movingX != 0 || this._movingY != 0) {
			this.sprite.gotoAndPlay("walk");
		}
	}

	public moveStop(moveDirection: MoveDirection) {
		switch (moveDirection) {
			case MoveDirection.Up:
			case MoveDirection.Down:
				this._movingY = 0;
				break;
			case MoveDirection.Left:
				this.facingRight = false;
				this._movingX = 0;
				break;
			case MoveDirection.Right:
				this.facingRight = true;
				this._movingX = 0;
				break;
		}

		if (this._movingX == 0 && this._movingY == 0) {
			this.sprite.gotoAndPlay("idle");
		}
	}

	public update() {
		if (this._movingX != 0 || this._movingY != 0) {
			this.updateMove();
		}
	}

	private updateMove() {
		let newPos: Point2D = Object.assign({}, this.position);

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
		this.position = newPos;
		this.eventManager.invoke("moved");

		// TODO: Determine if there's a better way to prevent movement instead of this flag

		// Move back based on collision
		if (this._collided) {
			this.position = Object.assign({}, this._lastUncollidedPos);
		} else {
			this._lastUncollidedPos = Object.assign(this.position);
		}
	}
}