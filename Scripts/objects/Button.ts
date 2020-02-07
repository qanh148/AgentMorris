module objects {
    export class Button extends objects.GameObject {
        constructor(imgPath:string, x:number=0, y:number=0, isCentered:boolean=true) {
            super(imgPath, x, y, isCentered);

            this._bitmap.on("mouseover", this.mouseover);
            this._bitmap.on("mouseout", this.mouseout);
        }

        // method
        mouseover():void {
            this._bitmap.alpha = 0.7;
        }

        mouseout():void {
            this._bitmap.alpha = 1;
        }
        
        // PROTECTED METHODS

        protected _checkBounds(): void {
            // throw new Error("Method not implemented.");
        }

        // PUBLIC METHODS

        public start(): void {
            // throw new Error("Method not implemented.");
        }
        public update(): void {
            // throw new Error("Method not implemented.");
        }
        public reset(): void {
            // throw new Error("Method not implemented.");
        }
    }
}