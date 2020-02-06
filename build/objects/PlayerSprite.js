"use strict";
var objects;
(function (objects) {
    var PlayerSprite = /** @class */ (function () {
        function PlayerSprite() {
            // Private
            this._facingRight = true;
            // https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
            var spriteSheet = new createjs.SpriteSheet({
                images: ["./Assets/images/AgentMorris_SpriteSheet.png"],
                frames: { width: 64, height: 64 },
                animations: {
                    idle: [0, 1, undefined, 0.1],
                    walk: [2, 3, undefined, 0.2],
                    run: [2, 3, undefined, 0.4],
                }
            });
            this.sprite = new createjs.Sprite(spriteSheet);
            this.sprite.gotoAndPlay("idle");
            this.sprite.regX = 32;
            this.sprite.regY = 32;
            this.facingRight = false;
        }
        Object.defineProperty(PlayerSprite.prototype, "facingRight", {
            // Properties
            get: function () {
                return this._facingRight;
            },
            set: function (value) {
                this._facingRight = value;
                this.sprite.scaleX = (value ? 1 : -1);
            },
            enumerable: true,
            configurable: true
        });
        return PlayerSprite;
    }());
    objects.PlayerSprite = PlayerSprite;
})(objects || (objects = {}));
//# sourceMappingURL=PlayerSprite.js.map