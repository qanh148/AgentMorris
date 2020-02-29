import { GameComponent } from "../GameComponent.js";
import { Collider } from "./Collider.js";
import { Transform } from "./Transform.js";
import { EventName } from "./EventName.js";
export var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["Up"] = 0] = "Up";
    MoveDirection[MoveDirection["Down"] = 1] = "Down";
    MoveDirection[MoveDirection["Left"] = 2] = "Left";
    MoveDirection[MoveDirection["Right"] = 3] = "Right";
})(MoveDirection || (MoveDirection = {}));
export class Mover extends GameComponent {
    constructor(gameObject) {
        super(gameObject);
        // Private
        this._moveSpeed = 5;
        this._movingX = 0;
        this._movingY = 0;
        this.transform = gameObject.getComponent(Transform);
        this.collider = gameObject.getComponent(Collider); // may be undefined
        this.gameObject.eventManager.addListener(EventName.GameObject_Update, () => {
            this.update();
        });
        this.gameObject.eventManager.addListener(EventName.PlayerController_MoveStart, moveDirection => {
            this.moveStart(moveDirection);
        });
        this.gameObject.eventManager.addListener(EventName.PlayerController_MoveStop, moveDirection => {
            this.moveStop(moveDirection);
        });
        this.gameObject.eventManager.addListener(EventName.Collider_MoveRequestAccepted, position => {
            this.transform.position = position;
        });
    }
    moveStart(moveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
                this._movingY = -this._moveSpeed;
                break;
            case MoveDirection.Down:
                this._movingY = this._moveSpeed;
                break;
            case MoveDirection.Left:
                this.gameObject.eventManager.invoke(EventName.Mover_Turned, { facingRight: false });
                this._movingX = -this._moveSpeed;
                break;
            case MoveDirection.Right:
                this.gameObject.eventManager.invoke(EventName.Mover_Turned, { facingRight: true });
                this._movingX = this._moveSpeed;
                break;
        }
        if (this._movingX != 0 || this._movingY != 0) {
            this.gameObject.eventManager.invoke(EventName.Mover_StartWalk);
        }
    }
    moveStop(moveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
            case MoveDirection.Down:
                this._movingY = 0;
                break;
            case MoveDirection.Left:
                this.gameObject.eventManager.invoke(EventName.Mover_Turned, { facingRight: false });
                this._movingX = 0;
                break;
            case MoveDirection.Right:
                this.gameObject.eventManager.invoke(EventName.Mover_Turned, { facingRight: true });
                this._movingX = 0;
                break;
        }
        if (this._movingX == 0 && this._movingY == 0) {
            this.gameObject.eventManager.invoke(EventName.Mover_StopWalk);
        }
    }
    update() {
        if (this._movingX != 0 || this._movingY != 0) {
            this.updateMove();
        }
    }
    updateMove() {
        const newPos = Object.assign({}, this.transform.position);
        // Move based on moving vars
        newPos.x += this._movingX;
        newPos.y += this._movingY;
        // If collider is defined,
        if (this.collider != undefined) {
            // request movement from collider
            this.gameObject.eventManager.invoke(EventName.Mover_RequestMove, newPos);
        }
        else {
            // Otherwise, set transform directly
            this.transform.position = newPos;
        }
    }
}
//# sourceMappingURL=Mover.js.map