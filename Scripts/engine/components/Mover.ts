import { GameComponent } from "../GameComponent.js";
import { Point2D } from "../interfaces/Point2D.js";
import { Collider } from "./Collider.js";
import { GameObject } from "../GameObject.js";
import { Transform } from "./Transform.js";
import { EventName } from "./EventName.js";

export enum MoveDirection {
	Up, Down, Left, Right
}

export class Mover extends GameComponent {
	private transform: Transform;
	private collider?: Collider;
	
	// Private
	private _moveSpeed = 5;
	private _movingX = 0;
	private _movingY = 0;

	constructor(gameObject: GameObject) {
		super(gameObject);

		this.transform = gameObject.getComponent(Transform) as Transform;
		this.collider = gameObject.getComponent(Collider); // may be undefined

		this.gameObject.eventManager.addListener(EventName.GameObject_Update, () => {
			this.update();
		});
		
		this.gameObject.eventManager.addListener(EventName.PlayerController_MoveStart, moveDirection => {
			this.moveStart(moveDirection);
		});

		this.gameObject.eventManager.addListener(EventName.PlayerController_MoveStop, moveDirection => {
			this.moveStop(moveDirection);
		});

		this.gameObject.eventManager.addListener(EventName.Collider_MoveRequestAccepted, position => {
			this.transform.position = position;
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
				this.gameObject.eventManager.invoke(EventName.Mover_Turned, {facingRight: false});
				this._movingX = -this._moveSpeed;
				break;
			case MoveDirection.Right:
				this.gameObject.eventManager.invoke(EventName.Mover_Turned, {facingRight: true});
				this._movingX = this._moveSpeed;
				break;
		}

		if (this._movingX != 0 || this._movingY != 0) {
			this.gameObject.eventManager.invoke(EventName.Mover_StartWalk);
		}
	}

	public moveStop(moveDirection: MoveDirection): void {
		switch (moveDirection) {
			case MoveDirection.Up:
			case MoveDirection.Down:
				this._movingY = 0;
				break;
			case MoveDirection.Left:
				this.gameObject.eventManager.invoke(EventName.Mover_Turned, {facingRight: false});
				this._movingX = 0;
				break;
			case MoveDirection.Right:
				this.gameObject.eventManager.invoke(EventName.Mover_Turned, {facingRight: true});
				this._movingX = 0;
				break;
		}

		if (this._movingX == 0 && this._movingY == 0) {
			this.gameObject.eventManager.invoke(EventName.Mover_StopWalk);
		}
	}

	public update(): void {
		if (this._movingX != 0 || this._movingY != 0) {
			this.updateMove();
		}
	}

	private updateMove(): void {
		const newPos: Point2D = Object.assign({}, this.transform.position);

		// Move based on moving vars
		newPos.x += this._movingX;
		newPos.y += this._movingY;

		// If collider is defined,
		if (this.collider != undefined) {
			// request movement from collider
			this.gameObject.eventManager.invoke(EventName.Mover_RequestMove, newPos);
		} else {
			// Otherwise, set transform directly
			this.transform.position = newPos;
		}
	}
}