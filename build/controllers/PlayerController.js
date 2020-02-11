import { KeyboardInput } from "./KeyboardInput.js";
import { MoveDirection } from "../engine/MovingGameObject.js";
export class PlayerController {
    constructor(player) {
        this._player = player;
        this._keyboardInput = new KeyboardInput();
    }
    initWASD() {
        // REMINDER when customizing controls, save and reuse the generated keymaps
        this._keyboardInput.addKey("w", this.GenKeyMap(MoveDirection.Up));
        this._keyboardInput.addKey("s", this.GenKeyMap(MoveDirection.Down));
        this._keyboardInput.addKey("a", this.GenKeyMap(MoveDirection.Left));
        this._keyboardInput.addKey("d", this.GenKeyMap(MoveDirection.Right));
    }
    GenKeyMap(direction) {
        return {
            down: () => {
                this._player.eventManager.invoke("moveStart", direction);
                // this._player.moveStart(direction);
            },
            up: () => {
                this._player.eventManager.invoke("moveStop", direction);
                // this._player.moveStop(direction);
            }
        };
    }
}
//# sourceMappingURL=PlayerController.js.map