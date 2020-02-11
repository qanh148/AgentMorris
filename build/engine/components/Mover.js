import { GameComponent } from "../GameComponent.js";
export var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["Up"] = 0] = "Up";
    MoveDirection[MoveDirection["Down"] = 1] = "Down";
    MoveDirection[MoveDirection["Left"] = 2] = "Left";
    MoveDirection[MoveDirection["Right"] = 3] = "Right";
})(MoveDirection || (MoveDirection = {}));
export class Mover extends GameComponent {
    constructor(parent) {
        super(parent);
        // Private
        this._moveSpeed = 5;
        this._movingX = 0;
        this._movingY = 0;
        this._collided = false;
        this._lastUncollidedPos = { x: 0, y: 0 };
        // TODO: Don't need to check collision every time you move,
        // Rather, turn on a bool to check collision IF there was movement
        // That check should be in a time based loop
        // UPDATE: Nah, go with predicted next step model
        this.parent.eventManager.addListener("moved", () => {
            // this.setPosition(this.parent.position);
            this.parent.collider.checkCollision();
        });
        this.parent.eventManager.addListener("moveStart", moveDirection => {
            this.moveStart(moveDirection);
        });
        this.parent.eventManager.addListener("moveStop", moveDirection => {
            this.moveStop(moveDirection);
        });
        this.parent.eventManager.addListener("collisionEnter", otherColliderAbstract => {
            let otherCollider = otherColliderAbstract;
            if (otherCollider.tag == "wall") {
                this._collided = true;
            }
        });
        this.parent.eventManager.addListener("collisionExit", otherColliderAbstract => {
            let otherCollider = otherColliderAbstract;
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
                this.parent.facingRight = false;
                this._movingX = -this._moveSpeed;
                break;
            case MoveDirection.Right:
                this.parent.facingRight = true;
                this._movingX = this._moveSpeed;
                break;
        }
        if (this._movingX != 0 || this._movingY != 0) {
            this.parent.sprite.gotoAndPlay("walk");
        }
    }
    moveStop(moveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
            case MoveDirection.Down:
                this._movingY = 0;
                break;
            case MoveDirection.Left:
                this.parent.facingRight = false;
                this._movingX = 0;
                break;
            case MoveDirection.Right:
                this.parent.facingRight = true;
                this._movingX = 0;
                break;
        }
        if (this._movingX == 0 && this._movingY == 0) {
            this.parent.sprite.gotoAndPlay("idle");
        }
    }
    update() {
        if (this._movingX != 0 || this._movingY != 0) {
            this.updateMove();
        }
    }
    updateMove() {
        let newPos = Object.assign({}, this.parent.position);
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
        // TODO: Check collision before actually moving to avoid moving twice
        // Set new pos, which also sets collision etc
        this.parent.position = newPos;
        this.parent.eventManager.invoke("moved");
        // TODO: Determine if there's a better way to prevent movement instead of this flag
        // Move back based on collision
        if (this._collided) {
            this.parent.position = Object.assign({}, this._lastUncollidedPos);
        }
        else {
            this._lastUncollidedPos = Object.assign(this.parent.position);
        }
    }
}
//# sourceMappingURL=Mover.js.map