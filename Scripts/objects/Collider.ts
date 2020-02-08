export type CollideCallback = (collider:Collider) => any;
// https://stackoverflow.com/questions/14638990/are-strongly-typed-functions-as-parameters-possible-in-typescript

export class Collider {
    //#region static vars
    public static checksPerSecond = 4;

    private static colliders:Collider[];
    private static _initialized = false;

    private static timePerCheck:number = 0; // milliseconds
    private static timeAtLastCheck:number = 0;

    //#endregion

    //#region object vars

    private _tag : string = "";
    public get tag() : string {
        return this._tag;
    }
    public set tag(v : string) {
        this._tag = v;
    }

    // TODO: Should have onEnter and onExit
    
    private _callback : CollideCallback = () => {};
    public get callback() : CollideCallback {
        return this._callback;
    }
    public set callback(v : CollideCallback) {
        this._callback = v;
    }
    

    //#endregion

    //#region object functions
    
    constructor(tag:string, callback:CollideCallback = () => {}) {
        this.tag = tag;
        this.callback = callback;

        Collider.colliders.push(this);
    }

    public delete() {
        let index = Collider.colliders.indexOf(this);
        Collider.colliders.splice(index, 1);
    }

    //#endregion

    //#region static functions

    public static initialize():void {
        if (!this._initialized) {
            Collider.colliders = [];
            Collider.timePerCheck = 1000/Collider.checksPerSecond;
            this._initialized = true;
        }
    }

    public static update():void {
        let timeNow = createjs.Ticker.getTime();
        let timeDiff = timeNow - Collider.timeAtLastCheck;

        if (timeDiff >= Collider.timePerCheck) {
            this.checkCollisions();
            Collider.timeAtLastCheck = timeNow;
        }
    }

    public static checkCollisions():void {
        Collider.colliders.forEach(collider1 => {
            Collider.colliders.forEach(collider2 => {
                if (collider1 !== collider2) {
                    collider1.callback(collider2);
                    collider2.callback(collider1);
                }
            });
        });
    }

    //#endregion
}

Collider.initialize();