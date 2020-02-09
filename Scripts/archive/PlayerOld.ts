module objects {
	export class PlayerOld extends GameObject {
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
			this.position = new Vector2(this._bitmap.stage.mouseX, this._bitmap.stage.mouseY);
		}
		public reset(): void {
			// throw new Error("Method not implemented.");
		}
	}
}