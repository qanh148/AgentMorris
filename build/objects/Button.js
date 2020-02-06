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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(imgPath, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imgPath, x, y, isCentered) || this;
            _this.on("mouseover", _this.mouseover);
            _this.on("mouseout", _this.mouseout);
            return _this;
        }
        // method
        Button.prototype.mouseover = function () {
            this.alpha = 0.7;
        };
        Button.prototype.mouseout = function () {
            this.alpha = 1;
        };
        // PROTECTED METHODS
        Button.prototype._checkBounds = function () {
            // throw new Error("Method not implemented.");
        };
        // PUBLIC METHODS
        Button.prototype.start = function () {
            // throw new Error("Method not implemented.");
        };
        Button.prototype.update = function () {
            // throw new Error("Method not implemented.");
        };
        Button.prototype.reset = function () {
            // throw new Error("Method not implemented.");
        };
        return Button;
    }(objects.GameObject));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map