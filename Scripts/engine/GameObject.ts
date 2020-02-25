import { GameComponent } from "./GameComponent.js";

export abstract class GameObject {
	private _components : GameComponent[];

	//#region Property getters/setters
	
	public get components() : GameComponent[] {
		return this._components;
	}
	public set components(v : GameComponent[]) {
		this._components = v;
	}

	//#endregion

	constructor() {
		this._components = [];
	}

	//

	public getComponent(): void {
		
	}
}



// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
