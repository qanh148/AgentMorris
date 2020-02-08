module objects {
    export abstract class GameObject {
        //#region MEMBER VARIABLES

        private _width:number = 0;
        private _height:number = 0;
        private _halfWidth:number = 0;
        private _halfHeight:number = 0;

        private _position:Vector2 = new Vector2(0, 0);

        private _isCentered:boolean = false;

        protected _bitmap:createjs.Bitmap;

        //#endregion

        //#region PROPERTIES

        get width():number {
            return this._width;
        }
        set width(width: number) {
            this._width = width;
            this._halfWidth = width/2;
        }
        
        get height():number {
            return this._height;
        }
        set height(height: number) {
            this._height = height;
            this._halfHeight = height/2;
        }
        
        get halfWidth():number {
            return this._halfWidth;
        }
        
        get halfHeight():number {
            return this._halfHeight;
        }

        get position():Vector2 {
            return this._position;
        }

        set position(position:Vector2) {
            this._position = position;
            this._bitmap.x = position.x;
            this._bitmap.y = position.y;
        }

        get isCentered():boolean {
            return this._isCentered;
        }

        set isCentered(isCentered:boolean) {
            this._isCentered = isCentered;
            if (isCentered) {
                this._bitmap.regX = this._halfWidth;
                this._bitmap.regY = this._halfHeight;
            } else {
                this._bitmap.regX = 0;
                this._bitmap.regY = 0;
            }
        }

        //#endregion

        //#region CONSTRUCTOR

        /**
         * Creates an instance of GameObject.
         * @param {string} [imagePath="./Assets/images/default.png"]
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [isCentered=false]
         * @memberof GameObject
         */
        constructor(imagePath:string = "./Assets/images/default.png", x:number=0, y:number=0, isCentered:boolean=false) {
            this._bitmap = new createjs.Bitmap(imagePath);
            
            this._bitmap.image.addEventListener("load", ()=> {
                this.position = new Vector2(x, y);

                this.width = this._bitmap.getBounds().width;
                this.height = this._bitmap.getBounds().height;

                this.isCentered = isCentered;
            });
        }
        
        //#endregion

        //#region PRIVATE METHODS

        protected abstract _checkBounds():void;

        //#endregion

        //#region PUBLIC METHODS

        public abstract start():void;

        public abstract update():void;

        public abstract reset():void;

        //#endregion
    }
}