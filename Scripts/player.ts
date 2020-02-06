module objects {
    export class Player extends objects.GameObject {
        constructor() {
            super();
            this.Start();
        }

        // Methods
        public Start(): void {
            // set the initial position
            this.y = 700;
            this.x = 320;
        }
        public Update(): void {
            this.Move();
            this.CheckBound(); // <-- Check collisions
        }
        public Reset(): void { }
        public Move(): void {
            // We reference the stage object and get mouse position
            this.x = objects.Game.stage.mouseX;
            // this is eventually replaced with keyboard input
            
        }
        public CheckBound(): void {
            // right bound
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            // left bound
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        }
    }
}