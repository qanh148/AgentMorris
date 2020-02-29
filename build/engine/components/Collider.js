import { GameComponent } from "../GameComponent.js";
import { EventName } from "./EventName.js";
export class Collider extends GameComponent {
    //#endregion
    //#region object functions
    constructor(gameObject, data) {
        super(gameObject);
        this._tag = data.tag;
        this._isTrigger = data.isTrigger;
        this._aabb = {
            position: { x: 0, y: 0 },
            width: data.width,
            height: data.height
        };
        this._aabbOffset = Object.assign({}, data.offset);
        this._moveRequested = false;
        this._requestedPos = { x: 0, y: 0 };
        this._requestedAABB = Object.assign({}, this._aabb);
        this._currentTriggerOverlaps = [];
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
    get isTrigger() {
        return this._isTrigger;
    }
    set isTrigger(v) {
        this._isTrigger = v;
    }
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
        let moveRestricted = false;
        // For all colliders
        for (let i = 0; i < Collider.colliders.length; i++) {
            // Get collider
            const otherCollider = Collider.colliders[i];
            // Skip self
            if (otherCollider == this) {
                continue;
            }
            // If movement is already restricted by previous check,
            if (moveRestricted) {
                // and this new collider isn't a trigger,
                if (!otherCollider.isTrigger) {
                    // Skip
                    continue;
                }
            }
            // Get other collider's aabb
            const otherColliderAABB = Collider.ResolveAABB(otherCollider);
            // Check for collision
            const hasCollision = Collider.AABB(this._requestedAABB, otherColliderAABB);
            // If there is a collision
            if (hasCollision) {
                // If both colliders are solid (non-triggers),
                if (!this.isTrigger && !otherCollider.isTrigger) {
                    // Can't move
                    // If not already restricted by a previous collision, resovle and then restrict
                    if (!moveRestricted) {
                        this._resolveSolidCollision(otherCollider);
                        moveRestricted = true;
                    }
                }
                else { // At least one of the colliders is a trigger
                    if (this.isTrigger) {
                        this._addTriggerOverlap(otherCollider);
                    }
                    if (otherCollider.isTrigger) {
                        otherCollider._addTriggerOverlap(this);
                    }
                }
            }
            else { // Not colliding
                if (this.isTrigger) {
                    this._removeTriggerOverlap(otherCollider);
                }
                if (otherCollider.isTrigger) {
                    otherCollider._removeTriggerOverlap(this);
                }
            }
        } // end for all colliders
        // If no collisions, accept movement request
        if (!moveRestricted) {
            this._acceptMoveRequest();
        }
    }
    _resolveSolidCollision(otherCollider) {
        // Deny move request
        this._denyMoveRequest();
        // Deny other collider's movement too
        if (otherCollider._moveRequested) {
            otherCollider._denyMoveRequest();
        }
        // Call collision event
        this.gameObject.eventManager.invoke(EventName.Collider_Collided, otherCollider);
        otherCollider.gameObject.eventManager.invoke(EventName.Collider_Collided, this);
    }
    _addTriggerOverlap(otherCollider) {
        const index = this._currentTriggerOverlaps.indexOf(otherCollider);
        if (index == -1) {
            this._currentTriggerOverlaps.push(otherCollider);
            this.gameObject.eventManager.invoke(EventName.Collider_TriggerEnter, otherCollider);
        }
    }
    _removeTriggerOverlap(otherCollider) {
        const index = this._currentTriggerOverlaps.indexOf(otherCollider);
        if (index != -1) {
            this._currentTriggerOverlaps.splice(index, 1);
            this.gameObject.eventManager.invoke(EventName.Collider_TriggerExit, otherCollider);
        }
    }
    _acceptMoveRequest() {
        this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestAccepted, this._requestedPos);
    }
    _denyMoveRequest() {
        this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestDenied, this._requestedPos);
        this._moveRequested = false;
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
    static ResolveAABB(collider) {
        let aabb;
        // If other collider also has a move requested,
        if (collider._moveRequested) {
            // Use other collider's requested aabb
            aabb = collider._requestedAABB;
        }
        else {
            // Otherwise use other collider's original aabb
            aabb = collider._aabb;
        }
        return aabb;
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