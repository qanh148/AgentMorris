import { GameObject } from "./GameObject.js";

export enum MoveDirection {
	Up, Down, Left, Right
}

export class MovingGameObject extends GameObject {
	// Private
	private _moveSpeed: number = 5;
	private _movingX: number = 0;
	private _movingY: number = 0;

	constructor(spriteSheetData: Object, colliderTag: string) {
		super(spriteSheetData, colliderTag);

		this.eventManager.addListener("moveStart", moveDirection => {
			this.moveStart(moveDirection);
		});
		this.eventManager.addListener("moveStop", moveDirection => {
			this.moveStop(moveDirection);
		});

		this.eventManager.addListener("collisionEnter", otherCollider => {
			console.log(otherCollider);
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
		if (this._movingX != 0) {
			this.sprite.x += this._movingX;
			this.eventManager.invoke("moved");
		}
		if (this._movingY != 0) {
			this.sprite.y += this._movingY;
			this.eventManager.invoke("moved");
		}
	}
}