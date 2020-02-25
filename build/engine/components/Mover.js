import { GameComponent } from "../GameComponent.js";
import { Collider } from "./Collider.js";
import { EventManager } from "./EventManager.js";
import { SpriteRenderer } from "./SpriteRenderer.js";
import { Transform } from "./Transform.js";
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
        this.eventManager = gameObject.getComponent(EventManager);
        this.spriteRenderer = gameObject.getComponent(SpriteRenderer);
        this.collider = gameObject.getComponent(Collider);
        // TODO: Don't need to check collision every time you move,
        // Rather, turn on a bool to check collision IF there was movement
        // That check should be in a time based loop
        // UPDATE: Nah, go with predicted next step model
        // ALSO: Check collision before actually moving to avoid moving twice
        // ALSO: Determine if there's a better way to prevent movement instead of this flag
        this.eventManager.addListener("moved", () => {
            // this.setPosition(this.parent.position);
            this.collider.checkCollision();
        });
        this.eventManager.addListener("moveStart", moveDirection => {
            this.moveStart(moveDirection);
        });
        this.eventManager.addListener("moveStop", moveDirection => {
            this.moveStop(moveDirection);
        });
        this.eventManager.addListener("collisionEnter", otherColliderAbstract => {
            const otherCollider = otherColliderAbstract;
            if (otherCollider.tag == "wall") {
                this._collided = true;
            }
        });
        this.eventManager.addListener("collisionExit", otherColliderAbstract => {
            const otherCollider = otherColliderAbstract;
            if (otherCollider.tag == "wall") {
                this._collided = false;
            }
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
                this.spriteRenderer.facingRight = false;
                this._movingX = -this._moveSpeed;
                break;
            case MoveDirection.Right:
                this.spriteRenderer.facingRight = true;
                this._movingX = this._moveSpeed;
                break;
        }
        if (this._movingX != 0 || this._movingY != 0) {
            this.spriteRenderer.sprite.gotoAndPlay("walk");
        }
    }
    moveStop(moveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
            case MoveDirection.Down:
                this._movingY = 0;
                break;
            case MoveDirection.Left:
                this.spriteRenderer.facingRight = false;
                this._movingX = 0;
                break;
            case MoveDirection.Right:
                this.spriteRenderer.facingRight = true;
                this._movingX = 0;
                break;
        }
        if (this._movingX == 0 && this._movingY == 0) {
            this.spriteRenderer.sprite.gotoAndPlay("idle");
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
        this.transform.parent.position = newPos;
        this.eventManager.invoke("moved");
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