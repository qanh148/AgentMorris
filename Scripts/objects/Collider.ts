export class Collider {
    //#region static vars
    public static checksPerSecond = 30;

    private static colliders:Collider[];
    private static _initialized = false;

    private static timePerCheck:number = 0; // milliseconds
    private static timeAtLastTick:number = 0;

    //#endregion

    //#region object vars
    private _tag : string = "";
    public get tag() : string {
        return this._tag;
    }
    public set tag(v : string) {
        this._tag = v;
    }

    //#endregion

    //#region object functions
    
    constructor(tag:string) {
        this.tag = tag;

        Collider.colliders.push(this);
    }

    //#endregion

    //#region static functions

    public static initialize():void {
        if (!this._initialized) {
            Collider.colliders = [];
            Collider.timePerCheck = 1000/Collider.checksPerSecond;
            console.log(Collider.timePerCheck, Collider.timePerCheck/1000);
            this._initialized = true;
        }
    }

    public static update():void {
        let timeNow = createjs.Ticker.getTime();
        let timeDiff = timeNow - Collider.timeAtLastTick;

        if (timeDiff >= Collider.timePerCheck) {
            this.checkCollisions();
        }

        Collider.timeAtLastTick = timeNow;
    }

    public static checkCollisions():void {
        Collider.colliders.forEach(collider1 => {
            Collider.colliders.forEach(collider2 => {

            });
        });
    }

    //#endregion
}

Collider.initialize();