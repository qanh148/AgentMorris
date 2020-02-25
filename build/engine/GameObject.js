import { Transform } from "./components/Transform.js";
import { EventManager } from "./components/EventManager.js";
export class GameObject {
    //#endregion
    constructor() {
        this._components = [];
        this._transform = new Transform(this);
        this.addComponent(Transform, this._transform);
        this._eventManager = new EventManager(this);
        this.addComponent(EventManager, this._eventManager);
    }
    //#region Property getters/setters
    get components() {
        return this._components;
    }
    get transform() {
        return this._transform;
    }
    get eventManager() {
        return this._eventManager;
    }
    //
    addComponent(gameComponentType, component) {
        if (this.hasComponent(gameComponentType)) {
            throw new Error("Already have component of type: " + gameComponentType.name);
        }
        else {
            this.components.push(component);
        }
    }
    hasComponent(gameComponentType) {
        let result = false;
        this.components.some(c => {
            if (c instanceof gameComponentType) {
                result = true;
                return;
            }
        });
        return result;
    }
    getComponent(gameComponentType) {
        let component;
        this.components.some(c => {
            if (c instanceof gameComponentType) {
                component = c;
                return;
            }
        });
        if (component == undefined) {
            throw new Error("Component " + gameComponentType.name + " not found");
        }
        return component;
    }
}
// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
//# sourceMappingURL=GameObject.js.map