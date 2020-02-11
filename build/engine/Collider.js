// https://stackoverflow.com/questions/14638990/are-strongly-typed-functions-as-parameters-possible-in-typescript
export class Collider {
    //#endregion
    //#region object functions
    constructor(tag) {
        //#endregion
        //#region object vars
        this._tag = "";
        this._onCollisionEnter = [];
        this._onCollisionExit = [];
        this.tag = tag;
        Collider.colliders.push(this);
    }
    get tag() {
        return this._tag;
    }
    set tag(v) {
        this._tag = v;
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
            Collider.timePerCheck = 1000 / Collider.checksPerSecond;
            this._initialized = true;
        }
    }
    static update() {
        let timeNow = createjs.Ticker.getTime();
        let timeDiff = timeNow - Collider.timeAtLastCheck;
        if (timeDiff >= Collider.timePerCheck) {
            this.checkCollisions();
            Collider.timeAtLastCheck = timeNow;
        }
    }
    static checkCollisions() {
        Collider.colliders.forEach(collider1 => {
            Collider.colliders.forEach(collider2 => {
                if (collider1 !== collider2) { // All except self
                    let collision = Collider.AABB(collider1, collider2);
                    if (collision) {
                        // collider1.callback(collider2);
                        // collider2.callback(collider1);
                    }
                }
            });
        });
    }
    static AABB(collider1, collider2) {
        return false;
    }
}
Collider._initialized = false;
Collider.checksPerSecond = 4;
Collider.timePerCheck = 0; // milliseconds
Collider.timeAtLastCheck = 0;
Collider.defaultCallback = (collider) => { };
Collider.initialize();
//# sourceMappingURL=Collider.js.map