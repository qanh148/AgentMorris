"use strict";
// IIFE -- Immediately invoked function expression
var game = (function () {
    var canvas;
    var stage;
    var title;
    var startButton;
    var player;
    function start() {
        console.log("%c Game Started", "color: teal; font-size:20px;");
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 fps
        createjs.Ticker.on('tick', update);
        stage.enableMouseOver(20);
        main();
    }
    function update() {
        player.update();
        var sqrDistance = objects.Vector2.sqrDistance(player.position, startButton.position);
        var radii = player.halfWidth + startButton.halfWidth;
        if (sqrDistance <= (radii * radii)) {
            console.log("collision");
        }
        stage.update();
    }
    function main() {
        console.log("%c Main Started", "color: teal; font-size:16px;");
        // this.helloWorld();
        title = new objects.Label("The Game", "40px", "Consolas", "#000000", 320, 240, true);
        stage.addChild(title);
        startButton = new objects.Button("./Assets/images/startButton.png", 350, 300, true);
        stage.addChild(startButton);
        startButton.on("click", function () {
        });
        player = new objects.Player();
        stage.addChild(player);
        console.log(player.regX);
    }
    function helloWorld() {
    }
    window.addEventListener("load", start);
})();
//# sourceMappingURL=game.js.map