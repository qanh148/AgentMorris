"use strict";
var objects;
(function (objects) {
    class GameObject {
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
        constructor(imagePath = "./Assets/images/default.png", x = 0, y = 0, isCentered = false) {
            //#region MEMBER VARIABLES
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new objects.Vector2(0, 0);
            this._isCentered = false;
            this._bitmap = new createjs.Bitmap(imagePath);
            this._bitmap.image.addEventListener("load", () => {
                this.position = new objects.Vector2(x, y);
                this.width = this._bitmap.getBounds().width;
                this.height = this._bitmap.getBounds().height;
                this.isCentered = isCentered;
            });
        }
        //#endregion
        //#region PROPERTIES
        get width() {
            return this._width;
        }
        set width(width) {
            this._width = width;
            this._halfWidth = width / 2;
        }
        get height() {
            return this._height;
        }
        set height(height) {
            this._height = height;
            this._halfHeight = height / 2;
        }
        get halfWidth() {
            return this._halfWidth;
        }
        get halfHeight() {
            return this._halfHeight;
        }
        get position() {
            return this._position;
        }
        set position(position) {
            this._position.x = position.x;
            this._position.y = position.y;
            this._bitmap.x = position.x;
            this._bitmap.y = position.y;
        }
        get isCentered() {
            return this._isCentered;
        }
        set isCentered(isCentered) {
            this._isCentered = isCentered;
            if (isCentered) {
                this._bitmap.regX = this._halfWidth;
                this._bitmap.regY = this._halfHeight;
            }
            else {
                this._bitmap.regX = 0;
                this._bitmap.regY = 0;
            }
        }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=GameObject.js.map