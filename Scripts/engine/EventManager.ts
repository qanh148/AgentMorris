/**
 * Abstract class to create event listeners
 *
 * @export
 * @abstract
 * @class Listener
 */
export abstract class Listener {
	public abstract invoke(): void;
}

/**
 * An event class used within the event manager
 *
 * @export
 * @class Event
 */
export class Event {
	private _listeners: Listener[];

	constructor() {
		this._listeners = [];
	}

	public addListener(listener: Listener) {
		this._listeners.push(listener);
	}

	public removeListener(listener: Listener) {
		let index = this._listeners.indexOf(listener);
		this._listeners.splice(index, 1);
	}

	public invoke() {
		this._listeners.forEach(listener => {
			listener.invoke();
		});
	}
}

/**
 * An Event Manager that can associate multiple listeners to named events
 *
 * @export
 * @class EventManager
 */
export class EventManager {
	private _events: Map<string, Event>;

	constructor() {
		this._events = new Map();
	}

	public addListener(name: string, listener: Listener): void {
		let event = this._events.get(name);
		if (event == undefined) {
			event = new Event();
		}

		event.addListener(listener);
		this._events.set(name, event);
	}

	public removeListener(name: string, listener: Listener): void {
		let event = this._events.get(name)
		if (event != undefined) {
			event.removeListener(listener);
		}
	}

	public invoke(name: string) {
		let event = this._events.get(name)
		if (event != undefined) {
			event.invoke();
		}
	}
}