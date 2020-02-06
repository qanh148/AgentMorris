module objects {
    export class GameObject extends createjs.Bitmap {
        protected speedX: number;
        protected speedY: number;

        public width: number;
        public height: number;
        public halfWidth: number; // Half-width; Useful for collision detection
        public halfHeight: number; // Half-height

        constructor(imageString: string) {
            super();
	    this.name = imageString;	
		
            this.Init();
        }

        // Methods
        private Init(): void {
            // initialize all the properties of my object
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;

            // registration points
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }

        public Start():void{}
        public Update():void{}
        public Reset():void{}
        public Move():void{}
        public CheckBound():void{}

    }
}