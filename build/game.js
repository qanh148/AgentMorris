"use strict";
// IIFE -- Immediately invoked function expression
var game = (function () {
    var canvas;
    var stage;
    function start() {
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 30; // fps
        createjs.Ticker.on('tick', update);
        // stage.enableMouseOver(20);
        main();
    }
    function update() {
        stage.update();
    }
    function main() {
        var sprite = new objects.PlayerSprite();
        sprite.sprite.x = 50;
        sprite.sprite.y = 50;
        stage.addChild(sprite.sprite);
    }
    window.addEventListener("load", start);
})();
//# sourceMappingURL=game.js.map