"use strict";
var objects;
(function (objects) {
    var Vector2 = /** @class */ (function () {
        // CONSTRUCTOR
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            // PRIVATE INSTANCE
            this._x = 0;
            this._y = 0;
            this._magnitude = 0;
            this._sqrMagnitude = 0;
            this.x = x;
            this.y = y;
            this.sqrMagnitude = this.x * this.x + this.y * this.y;
            this.magnitude = Math.sqrt(this.sqrMagnitude);
        }
        Object.defineProperty(Vector2.prototype, "x", {
            // PUBLIC PROP
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._y = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "magnitude", {
            get: function () {
                return this._magnitude;
            },
            set: function (magnitude) {
                this._magnitude = magnitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "sqrMagnitude", {
            get: function () {
                return this._sqrMagnitude;
            },
            set: function (sqrMagnitude) {
                this._sqrMagnitude = sqrMagnitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "normalized", {
            get: function () {
                var vector2 = new Vector2(this.x, this.y);
                vector2.normalize();
                return vector2;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        // PUBLIC METHODS
        Vector2.prototype.add = function (addVector) {
            this.x += addVector.x;
            this.y += addVector.y;
        };
        Vector2.prototype.subtract = function (subtractVector) {
            this.x -= subtractVector.x;
            this.y -= subtractVector.y;
        };
        Vector2.prototype.scale = function (scalar) {
            this.x *= scalar;
            this.y *= scalar;
        };
        Vector2.zero = function () {
            return new Vector2(0, 0);
        };
        Vector2.one = function () {
            return new Vector2(1, 1);
        };
        Vector2.up = function () {
            return new Vector2(0, 1);
        };
        Vector2.down = function () {
            return new Vector2(0, -1);
        };
        Vector2.right = function () {
            return new Vector2(1, 0);
        };
        Vector2.left = function () {
            return new Vector2(-1, 0);
        };
        Vector2.prototype.normalize = function () {
            var magnitude = this.magnitude;
            if (magnitude > 9.99999974737875E-06) {
                this.x = this.x / magnitude;
                this.y = this.y / magnitude;
            }
            else {
                return Vector2.zero();
            }
        };
        Vector2.dot = function (lhs, rhs) {
            return lhs.x * rhs.x + lhs.y * rhs.y;
        };
        /**
         * Returns distance between p1 and p2
         *
         * @static
         * @param {Vector2} p1
         * @param {Vector2} p2
         * @returns {number}
         * @memberof Vector2
         */
        Vector2.distance = function (p1, p2) {
            return Math.sqrt(this.sqrDistance(p1, p2));
            // let xDiff = (p2.x - p1.x);
            // let yDiff = (p2.y - p1.y);
            // return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        };
        /**
         * Return square distance between p1 and p2
         *
         * @static
         * @param {Vector2} p1
         * @param {Vector2} p2
         * @returns {number}
         * @memberof Vector2
         */
        Vector2.sqrDistance = function (p1, p2) {
            var xDiff = (p2.x - p1.x);
            var yDiff = (p2.y - p1.y);
            return xDiff * xDiff + yDiff * yDiff;
        };
        return Vector2;
    }());
    objects.Vector2 = Vector2;
})(objects || (objects = {}));
//# sourceMappingURL=Vector2.js.map