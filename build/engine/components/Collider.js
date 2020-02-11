import { GameComponent } from "../GameComponent.js";
export class Collider extends GameComponent {
    //#endregion
    //#region object functions
    constructor(parent, data) {
        super(parent);
        this._tag = data.tag;
        this._aabb = {
            position: { x: 0, y: 0 },
            width: data.width,
            height: data.height
        };
        this._aabbOffset = Object.assign({}, data.offset);
        this._currentColliders = [];
        Collider.colliders.push(this);
        let graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 100, 100);
        this._debugShape = new createjs.Shape(graphics);
    }
    //#endregion
    //#region Property getters/setters
    get tag() {
        return this._tag;
    }
    set tag(v) {
        this._tag = v;
    }
    get currentColliders() {
        return this._currentColliders;
    }
    setPosition(position) {
        this._aabb.position = Object.assign({}, position);
        this._aabb.position.x += this._aabbOffset.x;
        this._aabb.position.y += this._aabbOffset.y;
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
                if (Collider.AABB(this._aabb, otherCollider._aabb)) { // Has collision
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
    predictCollision() {
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
    static toggleDebugView(toggle) {
        this.debugView = toggle;
        this.colliders.forEach;
    }
}
//#region static vars
Collider.debugView = false;
Collider._initialized = false;
Collider.initialize();
//# sourceMappingURL=Collider.js.map