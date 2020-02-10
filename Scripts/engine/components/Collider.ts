import { AABB } from "../interfaces/AABB.js";
import { EventManager, Listener } from "./EventManager.js";
import { GameObject } from "../GameObject.js";
import { GameComponent } from "../GameComponent.js";
import { MovingGameObject } from "../MovingGameObject.js";
import { Point2D } from "../interfaces/Point2D.js";

// https://stackoverflow.com/questions/14638990/are-strongly-typed-functions-as-parameters-possible-in-typescript
export type CollisionCallback = (collider: Collider) => any;

export class Collider extends GameComponent {
	//#region static vars

	public static debugView: boolean = false;

	private static colliders: Collider[];
	private static _initialized = false;

	// private static checksPerSecond = 4;
	// private static timePerCheck: number = 0; // milliseconds
	// private static timeAtLastCheck: number = 0;

	//#endregion

	//#region object vars

	private _tag: string;
	private _aabb: AABB;
	private _aabbOffset: Point2D;
	private _currentColliders: Collider[];

	//#endregion

	//#region Property getters/setters

	public get tag(): string {
		return this._tag;
	}
	public set tag(v: string) {
		this._tag = v;
	}

	public get aabb(): AABB {
		return this._aabb;
	}

	public get currentColliders(): Collider[] {
		return this._currentColliders;
	}

	//#endregion

	//#region object functions

	constructor(parent: GameObject, tag: string) {
		super(parent);

		this._tag = tag;

		this._aabb = {
			position: { x: 0, y: 0 },
			width: 0,
			height: 0
		};

		this._aabbOffset = { x: 0, y: 0 };

		this._currentColliders = [];

		Collider.colliders.push(this);

		// TODO: Don't need to check collision every time you move,
		// Rather, turn on a bool to check collision IF there was movement
		// That check should be in a time based loop

		if (this.parent instanceof MovingGameObject) {
			this.parent.eventManager.addListener("moved", () => {
				// this.setPosition(this.parent.position);
				this.checkCollision();
			});
		}
	}

	public setOffset(offset: Point2D) {
		this._aabbOffset = Object.assign({}, offset);
		this.setPosition(this.aabb.position);
	}

	public setPosition(position: Point2D) {
		this.aabb.position = Object.assign({}, position);
		
		this.aabb.position.x += this._aabbOffset.x;
		this.aabb.position.y += this._aabbOffset.y;
	}

	public delete() {
		let index = Collider.colliders.indexOf(this);
		Collider.colliders.splice(index, 1);
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

	// TODO: Make debug view for AABB
	// var graphics = new createjs.Graphics().beginStroke("#ff0000").drawRect(0, 0, 100, 100);
	// var shape = new createjs.Shape(graphics);

	public checkCollision(): void {
		Collider.colliders.forEach(otherCollider => { // For all colliders
			if (this !== otherCollider) { // If not self
				// Check if exists in currentColliders
				let index = this.currentColliders.indexOf(otherCollider);
				let otherColliderWasColliding = (index != -1);

				if (Collider.AABB(this.aabb, otherCollider.aabb)) { // Has collision
					if (!otherColliderWasColliding) { // Wasn't colliding before
						// Send collision enter events
						this.parent.eventManager.invoke("collisionEnter", otherCollider);
						otherCollider.parent.eventManager.invoke("collisionEnter", this);

						// Save to arrays
						this.currentColliders.push(otherCollider);
						otherCollider.currentColliders.push(this);
					}
				} else { // No collision
					if (otherColliderWasColliding) { // Was colliding before
						// Send collision exut events
						this.parent.eventManager.invoke("collisionExit", otherCollider);
						otherCollider.parent.eventManager.invoke("collisionExit", this);

						// Remove from arrays
						this.currentColliders.splice(index, 1);
						let otherIndex = otherCollider.currentColliders.indexOf(this);
						otherCollider.currentColliders.splice(otherIndex, 1);
					}
				}
			}
		});
	}

	public predictCollision() : void {

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

	//#endregion
}

Collider.initialize();
