"use strict";
var objects;
(function (objects) {
    var GameObject = /** @class */ (function () {
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
        function GameObject(imagePath, x, y, isCentered) {
            var _this = this;
            if (imagePath === void 0) { imagePath = "./Assets/images/default.png"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            //#region MEMBER VARIABLES
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new objects.Vector2(0, 0);
            this._isCentered = false;
            this._bitmap = new createjs.Bitmap(imagePath);
            this._bitmap.image.addEventListener("load", function () {
                _this.position = new objects.Vector2(x, y);
                _this.width = _this._bitmap.getBounds().width;
                _this.height = _this._bitmap.getBounds().height;
                _this.isCentered = isCentered;
            });
        }
        Object.defineProperty(GameObject.prototype, "width", {
            //#endregion
            //#region PROPERTIES
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
                this._halfWidth = width / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
                this._halfHeight = height / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfWidth", {
            get: function () {
                return this._halfWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfHeight", {
            get: function () {
                return this._halfHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (position) {
                this._position = position;
                this._bitmap.x = position.x;
                this._bitmap.y = position.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isCentered", {
            get: function () {
                return this._isCentered;
            },
            set: function (isCentered) {
                this._isCentered = isCentered;
                if (isCentered) {
                    this._bitmap.regX = this._halfWidth;
                    this._bitmap.regY = this._halfHeight;
                }
                else {
                    this._bitmap.regX = 0;
                    this._bitmap.regY = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        return GameObject;
    }());
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=GameObject.js.map