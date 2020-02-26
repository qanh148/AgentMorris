import { GameComponent, GameComponentType } from "./GameComponent.js";
import { Transform } from "./components/Transform.js";
import { EventManager } from "./components/EventManager.js";
import { EventName } from "./components/EventName.js";

export abstract class GameObject {
	private _components: GameComponent[];
	
	private _transform: Transform;
	private _eventManager: EventManager;

	//#region Property getters/setters
	
	public get components(): GameComponent[] {
		return this._components;
	}

	public get transform(): Transform {
		return this._transform;
	}

	public get eventManager(): EventManager {
		return this._eventManager;
	}

	//#endregion

	constructor() {
		this._components = [];

		this._transform = new Transform(this);
		this.addComponent(Transform, this._transform);

		this._eventManager = new EventManager(this);
		this.addComponent(EventManager, this._eventManager);
	}

	public init(stage: createjs.Stage): void {
		this.eventManager.invoke(EventName.GameObject_Init, stage);
	}

	public update(): void {
		this.eventManager.invoke(EventName.GameObject_Update);
	}

	//#region Components

	/**
	 * Adds specified component to this GameObject
	 *
	 * @template T
	 * @param {GameComponentType<T>} gameComponentType
	 * @param {T} component
	 * @memberof GameObject
	 */
	public addComponent<T extends GameComponent>(gameComponentType: GameComponentType<T>, component: T): void {
		if (this.hasComponent(gameComponentType)) {
			throw new Error("Already have component of type: " + gameComponentType.name);
		} else {
			this.components.push(component);
		}
	}

	/**
	 * Returns whether this GameObject has component of type gameComponentType
	 *
	 * @template T
	 * @param {GameComponentType<T>} gameComponentType
	 * @returns {boolean}
	 * @memberof GameObject
	 */
	public hasComponent<T extends GameComponent>(gameComponentType: GameComponentType<T>): boolean {
		let result = false;

		this.components.some(c => {
			if (c instanceof gameComponentType) {
				result = true;
				return;
			}
		});

		return result;
	}

	/**
	 * Returns component of type gameComponentType if it exists. Otherwise returns undefined.
	 *
	 * @template T
	 * @param {GameComponentType<T>} gameComponentType
	 * @returns {(T | undefined)}
	 * @memberof GameObject
	 */
	public getComponent<T extends GameComponent>(gameComponentType: GameComponentType<T>): T | undefined {
		let component = undefined;

		this.components.some(c => {
			if (c instanceof gameComponentType) {
				component = c;
				return;
			}
		});

		return component;
	}

	//#endregion
}

// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
