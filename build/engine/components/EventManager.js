import { GameComponent } from "../GameComponent.js";
/**
 * An event class used within the event manager
 *
 * @export
 * @class Event
 */
export class Event {
    constructor() {
        this._listeners = [];
    }
    addListener(listener) {
        this._listeners.push(listener);
    }
    removeListener(listener) {
        const index = this._listeners.indexOf(listener);
        this._listeners.splice(index, 1);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoke(data) {
        this._listeners.forEach(listener => {
            listener(data);
        });
    }
}
/**
 * An Event Manager that can associate multiple listeners to named events
 *
 * @export
 * @class EventManager
 */
export class EventManager extends GameComponent {
    constructor(gameObject) {
        super(gameObject);
        this._events = new Map();
    }
    addListener(name, listener) {
        let event = this._events.get(name);
        if (event == undefined) {
            event = new Event();
        }
        event.addListener(listener);
        this._events.set(name, event);
    }
    removeListener(name, listener) {
        const event = this._events.get(name);
        if (event != undefined) {
            event.removeListener(listener);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoke(name, data = undefined) {
        const event = this._events.get(name);
        if (event != undefined) {
            event.invoke(data);
        }
    }
}
//# sourceMappingURL=EventManager.js.map