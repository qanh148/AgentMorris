"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTOR
        /**
         * Creates an instance of GameObject.
         * @param {string} [imagePath="./Assets/images/default.png"]
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [isCentered=false]
         * @memberof GameObject
         */
        function GameObject(imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = "./Assets/images/default.png"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath) || this;
            // MEMBER VARIABLES
            _this._width = 0;
            _this._height = 0;
            _this._halfWidth = 0;
            _this._halfHeight = 0;
            _this._isColliding = false;
            _this._position = new objects.Vector2(0, 0);
            _this._isCentered = false;
            _this.image.addEventListener("load", function () {
                _this.position = new objects.Vector2(x, y);
                _this.width = _this.getBounds().width;
                _this.height = _this.getBounds().height;
                _this.isCentered = isCentered;
            });
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "width", {
            // PROPERTIES
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
        Object.defineProperty(GameObject.prototype, "isColliding", {
            get: function () {
                return this._isColliding;
            },
            set: function (isColliding) {
                this._isColliding = isColliding;
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
                this.x = position.x;
                this.y = position.y;
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
                    this.regX = this._halfWidth;
                    this.regY = this._halfHeight;
                }
                else {
                    this.regX = 0;
                    this.regY = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameObject.js.map