"use strict";
var objects;
(function (objects) {
    class PlayerOld extends objects.GameObject {
        constructor() {
            // super();
            super("./Assets/images/default.png", 0, 0, true);
        }
        _checkBounds() {
            // throw new Error("Method not implemented.");
        }
        start() {
            // throw new Error("Method not implemented.");
            // this.isCentered = true;
        }
        update() {
            this.position = new objects.Vector2(this._bitmap.stage.mouseX, this._bitmap.stage.mouseY);
        }
        reset() {
            // throw new Error("Method not implemented.");
        }
    }
    objects.PlayerOld = PlayerOld;
})(objects || (objects = {}));
//# sourceMappingURL=PlayerOld.js.map