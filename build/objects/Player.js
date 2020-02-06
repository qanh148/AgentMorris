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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            // super();
            return _super.call(this, "./Assets/images/default.png", 0, 0, true) || this;
        }
        Player.prototype._checkBounds = function () {
            // throw new Error("Method not implemented.");
        };
        Player.prototype.start = function () {
            // throw new Error("Method not implemented.");
            // this.isCentered = true;
        };
        Player.prototype.update = function () {
            this.position = new objects.Vector2(this.stage.mouseX, this.stage.mouseY);
        };
        Player.prototype.reset = function () {
            // throw new Error("Method not implemented.");
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map