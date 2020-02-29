import { GameComponent } from "../GameComponent.js";
import { EventName } from "./EventName.js";
export class Collider extends GameComponent {
    //#endregion
    //#region object functions
    constructor(gameObject, data) {
        super(gameObject);
        this._tag = data.tag;
        this._aabb = {
            position: { x: 0, y: 0 },
            width: data.width,
            height: data.height
        };
        this._aabbOffset = Object.assign({}, data.offset);
        this._moveRequested = false;
        this._requestedPos = { x: 0, y: 0 };
        this._requestedAABB = Object.assign({}, this._aabb);
        const graphics = new createjs.Graphics().beginStroke("#ff0000").drawRect(0, 0, data.width, data.height);
        this._debugShape = new createjs.Shape(graphics);
        // REMINDER: Don't hard-code regXY values
        this._debugShape.regX = 32;
        this._debugShape.regY = 32;
        this._debugShape.visible = false;
        this.gameObject.container.addChild(this._debugShape);
        this._initEvents();
        // Add to list of all colliders
        Collider.colliders.push(this);
    }
    //#endregion
    //#region Property getters/setters
    get tag() {
        return this._tag;
    }
    set tag(v) {
        this._tag = v;
    }
    _initEvents() {
        this.gameObject.eventManager.addListener(EventName.GameObject_Update, () => {
            this.update();
        });
        this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
            this.destroy();
        });
        this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, position => {
            this.setPosition(position);
        });
        this.gameObject.eventManager.addListener(EventName.Mover_RequestMove, position => {
            this._moveRequested = true;
            this._requestedPos = position;
            this._setRequestedPosition(position);
        });
    }
    update() {
        if (this._moveRequested) {
            this._attemptMoveRequest();
            this._moveRequested = false;
        }
    }
    destroy() {
        const index = Collider.colliders.indexOf(this);
        Collider.colliders.splice(index, 1);
    }
    setPosition(position) {
        // this._aabb.position = Object.assign({}, position);
        this._aabb.position.x = position.x + this._aabbOffset.x;
        this._aabb.position.y = position.y + this._aabbOffset.y;
        this._debugShape.x = this._aabb.position.x;
        this._debugShape.y = this._aabb.position.y;
    }
    _attemptMoveRequest() {
        let anyCollision = false;
        // For all colliders
        for (let i = 0; i < Collider.colliders.length; i++) {
            // Get collider
            const otherCollider = Collider.colliders[i];
            // Skip self
            if (otherCollider == this) {
                continue;
            }
            let otherColliderAABB;
            // If move requested,
            if (otherCollider._moveRequested) {
                // Use other collider's requested aabb
                otherColliderAABB = otherCollider._requestedAABB;
            }
            else {
                // Otherwise use other collider's original aabb
                otherColliderAABB = otherCollider._aabb;
            }
            // Check for collision
            const hasCollision = Collider.AABB(this._requestedAABB, otherColliderAABB);
            // If there is a collision
            if (hasCollision) {
                // Deny move request
                anyCollision = true;
                this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestDenied, this._requestedPos);
                // Call collision event
                this.gameObject.eventManager.invoke(EventName.Collider_CollisionEnter, otherCollider);
                // Cancel other collider's movement too
                if (otherCollider._moveRequested) {
                    otherCollider._moveRequested = false;
                }
                // No need to check remaining colliders
                // REMINDER: This might allow a glitch where you can avoid a collision (bullet) by triggering a different collision (wall)
                break;
            }
        } // end for all colliders
        // If no collisions, accept movement request
        if (!anyCollision) {
            this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestAccepted, this._requestedPos);
        }
    }
    _setRequestedPosition(position) {
        this._requestedAABB.position.x = position.x + this._aabbOffset.x;
        this._requestedAABB.position.y = position.y + this._aabbOffset.y;
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
        this.colliders.forEach(collider => {
            collider._debugShape.visible = toggle;
        });
    }
}
Collider._initialized = false;
Collider.initialize();
//# sourceMappingURL=Collider.js.map