import { GameComponent } from "../GameComponent.js";
import { Collider } from "./Collider.js";
import { Transform } from "./Transform.js";
import { EventName } from "./EventName.js";
// TODO: Const enum?
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
        this._collided = false;
        this._lastUncollidedPos = { x: 0, y: 0 };
        this.transform = gameObject.getComponent(Transform);
        this.collider = gameObject.getComponent(Collider); // may be undefined
        // TODO: Predicted next AABB step model
        this.gameObject.eventManager.addListener(EventName.Mover_Moved, () => {
            // this.setPosition(this.parent.position);
            if (this.collider != undefined) {
                this.collider.checkCollision();
            }
        });
        this.gameObject.eventManager.addListener(EventName.PlayerController_MoveStart, moveDirection => {
            this.moveStart(moveDirection);
        });
        this.gameObject.eventManager.addListener(EventName.PlayerController_MoveStop, moveDirection => {
            this.moveStop(moveDirection);
        });
        this.gameObject.eventManager.addListener(EventName.Collider_CollisionEnter, otherColliderAbstract => {
            const otherCollider = otherColliderAbstract;
            if (otherCollider.tag == "wall") {
                this._collided = true;
            }
        });
        this.gameObject.eventManager.addListener(EventName.Collider_CollisionExit, otherColliderAbstract => {
            const otherCollider = otherColliderAbstract;
            if (otherCollider.tag == "wall") {
                this._collided = false;
            }
        });
        this.gameObject.eventManager.addListener(EventName.GameObject_Update, () => {
            this.update();
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
        // If first run, save pos
        if (this._lastUncollidedPos.x == 0 && this._lastUncollidedPos.y == 0) {
            this._lastUncollidedPos = Object.assign({}, newPos);
        }
        // Move based on moving vars
        if (this._movingX != 0) {
            newPos.x += this._movingX;
        }
        if (this._movingY != 0) {
            newPos.y += this._movingY;
        }
        // Set new pos, which also sets collision etc
        this.transform.position = newPos;
        this.gameObject.eventManager.invoke(EventName.Mover_Moved);
        // Move back based on collision
        if (this._collided) {
            this.transform.position = Object.assign({}, this._lastUncollidedPos);
        }
        else {
            this._lastUncollidedPos = Object.assign(this.transform.position);
        }
    }
}
//# sourceMappingURL=Mover.js.map