"use strict";
var objects;
(function (objects) {
    class Button extends objects.GameObject {
        constructor(imgPath, x = 0, y = 0, isCentered = true) {
            super(imgPath, x, y, isCentered);
            this._bitmap.on("mouseover", this.mouseover);
            this._bitmap.on("mouseout", this.mouseout);
        }
        // method
        mouseover() {
            this._bitmap.alpha = 0.7;
        }
        mouseout() {
            this._bitmap.alpha = 1;
        }
        // PROTECTED METHODS
        _checkBounds() {
            // throw new Error("Method not implemented.");
        }
        // PUBLIC METHODS
        start() {
            // throw new Error("Method not implemented.");
        }
        update() {
            // throw new Error("Method not implemented.");
        }
        reset() {
            // throw new Error("Method not implemented.");
        }
    }
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map