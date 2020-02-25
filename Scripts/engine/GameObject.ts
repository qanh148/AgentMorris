import { GameComponent, GameComponentType } from "./GameComponent.js";
import { Transform } from "./components/Transform.js";

export abstract class GameObject {
	private _components: GameComponent[];

	//#region Property getters/setters
	
	public get components(): GameComponent[] {
		return this._components;
	}

	//#endregion

	constructor() {
		this._components = [];

		// Init with a Transform component
		this.addComponent(Transform, new Transform(this));
	}

	//

	public addComponent<T extends GameComponent>(gameComponentType: GameComponentType<T>, component: T): void {
		if (this.hasComponent(gameComponentType)) {
			throw new Error("Already have component of type: " + gameComponentType);
		} else {
			this.components.push(component);
		}
	}

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

	public getComponent<T extends GameComponent>(gameComponentType: GameComponentType<T>): T {
		let component;

		this.components.some(c => {
			if (c instanceof gameComponentType) {
				component = c;
				return;
			}
		});

		if (component == undefined) {
			throw new Error("Component not found");
		}

		return component;
	}
}

// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
