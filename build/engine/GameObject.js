import { Transform } from "./components/Transform.js";
import { EventManager } from "./components/EventManager.js";
import { EventName } from "./components/EventName.js";
export class GameObject {
    //#endregion
    constructor() {
        this._components = [];
        this._container = new createjs.Container();
        this._transform = new Transform(this);
        this.addComponent(Transform, this._transform);
        this._eventManager = new EventManager(this);
        this.addComponent(EventManager, this._eventManager);
    }
    //#region Property getters/setters
    get components() {
        return this._components;
    }
    get container() {
        return this._container;
    }
    get transform() {
        return this._transform;
    }
    get eventManager() {
        return this._eventManager;
    }
    init(stage) {
        stage.addChild(this._container);
        this.eventManager.invoke(EventName.GameObject_Init, stage);
    }
    update() {
        this.eventManager.invoke(EventName.GameObject_Update);
    }
    destroy() {
        this.eventManager.invoke(EventName.GameObject_Destroy);
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
    addComponent(gameComponentType, component) {
        if (this.hasComponent(gameComponentType)) {
            throw new Error("Already have component of type: " + gameComponentType.name);
        }
        else {
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
    /**
     * Returns component of type gameComponentType if it exists. Otherwise returns undefined.
     *
     * @template T
     * @param {GameComponentType<T>} gameComponentType
     * @returns {(T | undefined)}
     * @memberof GameObject
     */
    getComponent(gameComponentType) {
        let component = undefined;
        this.components.some(c => {
            if (c instanceof gameComponentType) {
                component = c;
                return;
            }
        });
        return component;
    }
}
// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
//# sourceMappingURL=GameObject.js.map