import { GameComponent } from "../GameComponent.js";
import { MovingGameObject } from "../MovingGameObject.js";
export class Collider extends GameComponent {
    //#endregion
    //#region object functions
    constructor(parent, tag) {
        super(parent);
        this._tag = tag;
        this._aabb = {
            position: { x: 0, y: 0 },
            offset: { x: 0, y: 0 },
            width: 0,
            height: 0
        };
        this._currentColliders = [];
        Collider.colliders.push(this);
        // TODO: Don't need to check collision every time you move,
        // Rather, turn on a bool to check collision IF there was movement
        // That check should be in a time based loop
        if (this.parent instanceof MovingGameObject) {
            this.parent.eventManager.addListener("moved", () => {
                // this.setPosition(this.parent.position);
                this.checkCollision();
            });
        }
    }
    //#endregion
    //#region Property getters/setters
    get tag() {
        return this._tag;
    }
    set tag(v) {
        this._tag = v;
    }
    get aabb() {
        return this._aabb;
    }
    get currentColliders() {
        return this._currentColliders;
    }
    setOffset(offset) {
        this.aabb.offset = Object.assign({}, offset);
        this.setPosition(this.aabb.position);
    }
    setPosition(position) {
        this.aabb.position = Object.assign({}, position);
        this.aabb.position.x += this.aabb.offset.x;
        this.aabb.position.y += this.aabb.offset.y;
    }
    delete() {
        let index = Collider.colliders.indexOf(this);
        Collider.colliders.splice(index, 1);
    }
    //#endregion
    //#region static functions
    static initialize() {
        if (!this._initialized) {
            Collider.colliders = [];
            // Collider.timePerCheck = 1000 / Collider.checksPerSecond;
            this._initialized = true;
        }
    }
    // TODO: Make debug view for AABB
    // var graphics = new createjs.Graphics().beginStroke("#ff0000").drawRect(0, 0, 100, 100);
    // var shape = new createjs.Shape(graphics);
    checkCollision() {
        Collider.colliders.forEach(otherCollider => {
            if (this !== otherCollider) { // If not self
                // Check if exists in currentColliders
                let index = this.currentColliders.indexOf(otherCollider);
                let otherColliderWasColliding = (index != -1);
                if (Collider.AABB(this.aabb, otherCollider.aabb)) { // Has collision
                    if (!otherColliderWasColliding) { // Wasn't colliding before
                        // Send collision enter events
                        this.parent.eventManager.invoke("collisionEnter", otherCollider);
                        otherCollider.parent.eventManager.invoke("collisionEnter", this);
                        // Save to arrays
                        this.currentColliders.push(otherCollider);
                        otherCollider.currentColliders.push(this);
                    }
                }
                else { // No collision
                    if (otherColliderWasColliding) { // Was colliding before
                        // Send collision exut events
                        this.parent.eventManager.invoke("collisionExit", otherCollider);
                        otherCollider.parent.eventManager.invoke("collisionExit", this);
                        // Remove from arrays
                        this.currentColliders.splice(index, 1);
                        let otherIndex = otherCollider.currentColliders.indexOf(this);
                        otherCollider.currentColliders.splice(otherIndex, 1);
                    }
                }
            }
        });
    }
    static AABB(aabb1, aabb2) {
        if (aabb1.position.x < aabb2.position.x + aabb2.width &&
            aabb1.position.x + aabb1.width > aabb2.position.x &&
            aabb1.position.y < aabb2.position.y + aabb2.height &&
            aabb1.position.y + aabb1.height > aabb2.position.y) {
            return true;
        }
        else {
            return false;
        }
    }
}
//#region static vars
Collider.debugView = false;
Collider._initialized = false;
Collider.initialize();
//# sourceMappingURL=Collider.js.map