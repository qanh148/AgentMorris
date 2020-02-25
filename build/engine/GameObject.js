import { Transform } from "./components/Transform.js";
export class GameObject {
    //#endregion
    constructor() {
        this._components = [];
        // Init with a Transform component
        this.addComponent(Transform, new Transform(this));
    }
    //#region Property getters/setters
    get components() {
        return this._components;
    }
    //
    addComponent(gameComponentType, component) {
        if (this.hasComponent(gameComponentType)) {
            throw new Error("Already have component of type: " + gameComponentType);
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
            throw new Error("Component not found");
        }
        return component;
    }
}
// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
//# sourceMappingURL=GameObject.js.map