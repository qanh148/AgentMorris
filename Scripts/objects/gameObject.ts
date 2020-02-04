module objects {
    export abstract class GameObject extends createjs.Bitmap {
        // MEMBER VARIABLES

        private _width:number = 0;
        private _height:number = 0;
        private _halfWidth:number = 0;
        private _halfHeight:number = 0;
        private _isColliding:boolean = false;
        private _position:Vector2 = new Vector2(0, 0);
        private _isCentered:boolean = false;

        // PROPERTIES

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

        get isColliding():boolean {
            return this._isColliding;
        }

        set isColliding(isColliding:boolean) {
            this._isColliding = isColliding;
        }

        get position():Vector2 {
            return this._position;
        }

        set position(position:Vector2) {
            this._position = position;
            this.x = position.x;
            this.y = position.y;
        }

        get isCentered():boolean {
            return this._isCentered;
        }

        set isCentered(isCentered:boolean) {
            this._isCentered = isCentered;
            if (isCentered) {
                this.regX = this._halfWidth;
                this.regY = this._halfHeight;
            } else {
                this.regX = 0;
                this.regY = 0;
            }
        }

        // CONSTRUCTOR

        /**
         * Creates an instance of GameObject.
         * @param {string} [imagePath="./Assets/images/default.png"]
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [isCentered=false]
         * @memberof GameObject
         */
        constructor(imagePath:string = "./Assets/images/default.png", x:number=0, y:number=0, isCentered:boolean=false) {
            super(imagePath);

            this.image.addEventListener("load", ()=> {
                this.position = new Vector2(x, y);

                this.width = this.getBounds().width;
                this.height = this.getBounds().height;

                this.isCentered = isCentered;
            });
        }

        // PRIVATE METHODS

        protected abstract _checkBounds():void;

        // PUBLIC METHODS

        public abstract start():void;

        public abstract update():void;

        public abstract reset():void;
    }
}