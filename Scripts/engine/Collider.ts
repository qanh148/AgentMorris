export type CollisionCallback = (collider: Collider) => any;
// https://stackoverflow.com/questions/14638990/are-strongly-typed-functions-as-parameters-possible-in-typescript

export class Collider {
	//#region static vars

	private static colliders: Collider[];
	private static _initialized = false;

	private static checksPerSecond = 4;
	private static timePerCheck: number = 0; // milliseconds
	private static timeAtLastCheck: number = 0;

	private static defaultCallback: CollisionCallback = (collider: Collider) => { };

	//#endregion

	//#region object vars

	private _tag: string = "";
	public get tag(): string {
		return this._tag;
	}
	public set tag(v: string) {
		this._tag = v;
	}

	private _onCollisionEnter: CollisionCallback = Collider.defaultCallback;
	public get onCollisionEnter(): CollisionCallback {
		return this._onCollisionEnter;
	}
	public set onCollisionEnter(v: CollisionCallback) {
		this._onCollisionEnter = v;
	}

	private _onCollisionExit: CollisionCallback = Collider.defaultCallback;
	public get onCollisionExit(): CollisionCallback {
		return this._onCollisionExit;
	}
	public set onCollisionExit(v: CollisionCallback) {
		this._onCollisionExit = v;
	}

	//#endregion

	//#region object functions

	constructor(tag: string) {
		this.tag = tag;

		Collider.colliders.push(this);
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

	public static checkCollisions(): void {
		Collider.colliders.forEach(collider1 => {
			Collider.colliders.forEach(collider2 => {
				if (collider1 !== collider2) {
					// collider1.callback(collider2);
					// collider2.callback(collider1);
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