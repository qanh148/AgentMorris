import { AABB } from "../interfaces/AABB.js";
import { GameObject } from "../GameObject.js";
import { GameComponent } from "../GameComponent.js";
import { Point2D } from "../interfaces/Point2D.js";
import { EventName } from "./EventName.js";

export interface ColliderData {
	tag: string;
	isTrigger: boolean;
	width: number;
	height: number;
	offset: Point2D;
}

export class Collider extends GameComponent {
	//#region static vars
	private static colliders: Collider[];
	private static _initialized = false;

	// private static checksPerSecond = 4;
	// private static timePerCheck: number = 0; // milliseconds
	// private static timeAtLastCheck: number = 0;

	//#endregion

	//#region object vars

	private _tag: string;
	private _isTrigger: boolean;

	private _aabb: AABB;
	private _aabbOffset: Point2D;

	private _moveRequested: boolean;
	private _requestedPos: Point2D;
	private _requestedAABB: AABB;

	private _currentTriggerOverlaps: Collider[];

	private _debugShape: createjs.Shape;

	//#endregion

	//#region Property getters/setters

	public get isTrigger(): boolean {
		return this._isTrigger;
	}

	public set isTrigger(v: boolean) {
		this._isTrigger = v;
	}

	public get tag(): string {
		return this._tag;
	}
	public set tag(v: string) {
		this._tag = v;
	}

	//#endregion

	//#region object functions

	constructor(gameObject: GameObject, data: ColliderData) {
		super(gameObject);

		this._tag = data.tag;
		this._isTrigger = data.isTrigger;

		this._aabb = {
			position: { x: 0, y: 0 },
			width: data.width,
			height: data.height
		};

		this._aabbOffset = Object.assign({}, data.offset);

		this._moveRequested = false;
		this._requestedPos = { x: 0, y: 0 };
		this._requestedAABB = Object.assign({}, this._aabb);

		this._currentTriggerOverlaps = [];

		const graphics = new createjs.Graphics().beginStroke("#ff0000").drawRect(0, 0, data.width, data.height);
		this._debugShape = new createjs.Shape(graphics);

		// REMINDER: Don't hard-code regXY values
		this._debugShape.regX = 32;
		this._debugShape.regY = 32;
		this._debugShape.visible = false;

		this.gameObject.container.addChild(this._debugShape);

		this._initEvents();

		// Add to list of all colliders
		Collider.colliders.push(this);
	}

	private _initEvents(): void {
		this.gameObject.eventManager.addListener(EventName.GameObject_Update, () => {
			this.update();
		});

		this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
			this.destroy();
		});

		this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, position => {
			this.setPosition(position as Point2D);
		});

		this.gameObject.eventManager.addListener(EventName.Mover_RequestMove, position => {
			this._moveRequested = true;
			this._requestedPos = position;
			this._setRequestedPosition(position);
		});
	}

	public update(): void {
		if (this._moveRequested) {
			this._attemptMoveRequest();
			this._moveRequested = false;
		}
	}

	public destroy(): void {
		const index = Collider.colliders.indexOf(this);
		Collider.colliders.splice(index, 1);
	}

	public setPosition(position: Point2D): void {
		// this._aabb.position = Object.assign({}, position);
		this._aabb.position.x = position.x + this._aabbOffset.x;
		this._aabb.position.y = position.y + this._aabbOffset.y;

		this._debugShape.x = this._aabb.position.x;
		this._debugShape.y = this._aabb.position.y;
	}

	private _attemptMoveRequest(): void {
		let moveRestricted = false;

		// For all colliders
		for (let i = 0; i < Collider.colliders.length; i++) {
			// Get collider
			const otherCollider = Collider.colliders[i];

			// Skip self
			if (otherCollider == this) {
				continue;
			}

			// If movement is already restricted by previous check,
			if (moveRestricted) {
				// and this new collider isn't a trigger,
				if (!otherCollider.isTrigger) {
					// Skip
					continue;
				}
			}

			// Get other collider's aabb
			const otherColliderAABB = Collider.ResolveAABB(otherCollider);

			// Check for collision
			const hasCollision = Collider.AABB(this._requestedAABB, otherColliderAABB);

			// If there is a collision
			if (hasCollision) {
				// If both colliders are solid (non-triggers),
				if (!this.isTrigger && !otherCollider.isTrigger) {
					// Can't move
					// If not already restricted by a previous collision, resovle and then restrict
					if (!moveRestricted) {
						this._resolveSolidCollision(otherCollider);
						moveRestricted = true;
					}
				} else { // At least one of the colliders is a trigger
					if (this.isTrigger) {
						this._addTriggerOverlap(otherCollider);
					}
					
					if (otherCollider.isTrigger) {
						otherCollider._addTriggerOverlap(this);
					}
				}
			} else { // Not colliding
				if (this.isTrigger) {
					this._removeTriggerOverlap(otherCollider);
				}
				
				if (otherCollider.isTrigger) {
					otherCollider._removeTriggerOverlap(this);
				}
			}
		} // end for all colliders

		// If no collisions, accept movement request
		if (!moveRestricted) {
			this._acceptMoveRequest();
		}
	}

	private _resolveSolidCollision(otherCollider: Collider): void {
		// Deny move request
		this._denyMoveRequest();
		
		// Deny other collider's movement too
		if (otherCollider._moveRequested) {
			otherCollider._denyMoveRequest();
		}

		// Call collision event
		this.gameObject.eventManager.invoke(EventName.Collider_Collided, otherCollider);
		otherCollider.gameObject.eventManager.invoke(EventName.Collider_Collided, this);
	}

	private _addTriggerOverlap(otherCollider: Collider): void {
		const index = this._currentTriggerOverlaps.indexOf(otherCollider);

		if (index == -1) {
			this._currentTriggerOverlaps.push(otherCollider);
			this.gameObject.eventManager.invoke(EventName.Collider_TriggerEnter, otherCollider);
		}
	}

	private _removeTriggerOverlap(otherCollider: Collider): void {
		const index = this._currentTriggerOverlaps.indexOf(otherCollider);

		if (index != -1) {
			this._currentTriggerOverlaps.splice(index, 1);
			this.gameObject.eventManager.invoke(EventName.Collider_TriggerExit, otherCollider);
		}
	}

	private _acceptMoveRequest(): void {
		this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestAccepted, this._requestedPos);
	}

	private _denyMoveRequest(): void {
		this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestDenied, this._requestedPos);
		this._moveRequested = false;
	}

	private _setRequestedPosition(position: Point2D): void {
		this._requestedAABB.position.x = position.x + this._aabbOffset.x;
		this._requestedAABB.position.y = position.y + this._aabbOffset.y;
	}

	//#endregion

	//#region static functions

	public static initialize(): void {
		if (!this._initialized) {
			Collider.colliders = [];
			// Collider.timePerCheck = 1000 / Collider.checksPerSecond;
			this._initialized = true;
		}
	}
	
	public static ResolveAABB(collider: Collider): AABB {
		let aabb: AABB;

		// If other collider also has a move requested,
		if (collider._moveRequested) {
			// Use other collider's requested aabb
			aabb = collider._requestedAABB;
		} else {
			// Otherwise use other collider's original aabb
			aabb = collider._aabb;
		}

		return aabb;
	}

	public static AABB(aabb1: AABB, aabb2: AABB): boolean {
		if (aabb1.position.x < aabb2.position.x + aabb2.width &&
			aabb1.position.x + aabb1.width > aabb2.position.x &&
			aabb1.position.y < aabb2.position.y + aabb2.height &&
			aabb1.position.y + aabb1.height > aabb2.position.y) {
			return true;
		} else {
			return false;
		}
	}

	public static toggleDebugView(toggle: boolean): void {
		this.colliders.forEach(collider => {
			collider._debugShape.visible = toggle;
		})
	}

	//#endregion
}

Collider.initialize();
