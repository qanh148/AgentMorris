import { AABB } from "../interfaces/AABB.js";
import { EventManager, Listener } from "./EventManager.js";

// https://stackoverflow.com/questions/14638990/are-strongly-typed-functions-as-parameters-possible-in-typescript
export type CollisionCallback = (collider: Collider) => any;

export class Collider {
	//#region static vars

	public static debugView:boolean = false;

	private static colliders: Collider[];
	private static _initialized = false;

	private static checksPerSecond = 4;
	private static timePerCheck: number = 0; // milliseconds
	private static timeAtLastCheck: number = 0;

	//#endregion

	//#region object vars

	private _tag: string;
	private _aabb: AABB;

	//#endregion

	//#region Property getters/setters

	public get tag(): string {
		return this._tag;
	}
	public set tag(v: string) {
		this._tag = v;
	}

	//#endregion

	//#region object functions

	constructor(tag: string) {
		this._tag = tag;
		this._aabb = {
			position: {x:0, y:0},
			width: 0,
			height: 0
		};

		Collider.colliders.push(this);
	}

	// TODO: Use Event listener or something

	public delete() {
		let index = Collider.colliders.indexOf(this);
		Collider.colliders.splice(index, 1);
	}

	//#endregion

	//#region static functions

	public static initialize(): void {
		if (!this._initialized) {
			Collider.colliders = [];
			Collider.timePerCheck = 1000 / Collider.checksPerSecond;
			this._initialized = true;
		}
	}

	public static update(): void {
		let timeNow = createjs.Ticker.getTime();
		let timeDiff = timeNow - Collider.timeAtLastCheck;

		if (timeDiff >= Collider.timePerCheck) {
			this.checkCollisions();
			Collider.timeAtLastCheck = timeNow;
		}
	}
	
	// TODO: Make debug view for AABB
	// var graphics = new createjs.Graphics().beginStroke("#ff0000").drawRect(0, 0, 100, 100);
	// var shape = new createjs.Shape(graphics);

	public static checkCollisions(): void {
		Collider.colliders.forEach(collider1 => {
			Collider.colliders.forEach(collider2 => {
				if (collider1 !== collider2) { // All except self
					let collision = Collider.AABB(collider1, collider2);
					if (collision) {
						// collider1.callback(collider2);
						// collider2.callback(collider1);
					}
				}
			});
		});
	}

	public static AABB(collider1: Collider, collider2: Collider): boolean {
		return false;
	}

	//#endregion
}

Collider.initialize();
