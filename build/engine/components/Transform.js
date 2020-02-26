import { GameComponent } from "../GameComponent.js";
import { EventName } from "./EventName.js";
export class Transform extends GameComponent {
    constructor(gameObject) {
        super(gameObject);
        this._position = { x: 0, y: 0 };
    }
    get position() {
        return this._position;
    }
    set position(v) {
        this._position = Object.assign({}, v);
        this.gameObject.eventManager.invoke(EventName.Transform_PositionChange, v);
    }
}
//# sourceMappingURL=Transform.js.map