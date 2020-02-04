module objects {
    export class Player extends GameObject {
        constructor() {
            // super();
            super("./Assets/images/default.png", 0, 0, true);
        }

        protected _checkBounds(): void {
            // throw new Error("Method not implemented.");
        }
        public start(): void {
            // throw new Error("Method not implemented.");
            // this.isCentered = true;
        }
        public update(): void {
            this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }
        public reset(): void {
            // throw new Error("Method not implemented.");
        }
    }
}