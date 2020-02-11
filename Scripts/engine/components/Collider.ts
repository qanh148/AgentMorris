import { AABB } from "../interfaces/AABB.js";
import { GameObject } from "../GameObject.js";
import { GameComponent } from "../GameComponent.js";
import { Point2D } from "../interfaces/Point2D.js";

export interface ColliderData {
	tag: string;
	width: number;
	height: number;
	offset: Point2D;
}

export class Collider extends GameComponent {
	//#region static vars

	private static debugView: boolean = false;

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

	private _debugShape: createjs.Shape;

	//#endregion

	//#region Property getters/setters

	public get tag(): string {
		return this._tag;
	}
	public set tag(v: string) {
		this._tag = v;
	}

	public get currentColliders(): Collider[] {
		return this._currentColliders;
	}

	//#endregion

	//#region object functions

	constructor(parent: GameObject, data: ColliderData) {
		super(parent);

		this._tag = data.tag;

		this._aabb = {
			position: { x: 0, y: 0 },
			width: data.width,
			height: data.height
		};

		this._aabbOffset = Object.assign({}, data.offset);

		this._currentColliders = [];

		Collider.colliders.push(this);

		let graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
		this._debugShape = new createjs.Shape(graphics);
	}

	public setPosition(position: Point2D) {
		this._aabb.position = Object.assign({}, position);
		
		this._aabb.position.x += this._aabbOffset.x;
		this._aabb.position.y += this._aabbOffset.y;
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

				if (Collider.AABB(this._aabb, otherCollider._aabb)) { // Has collision
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
	
	public static toggleDebugView(toggle:boolean) {
		this.debugView = toggle;
		
		this.colliders.forEach
	}

	//#endregion
}

Collider.initialize();
