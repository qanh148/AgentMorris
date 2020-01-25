"use strict";
// IIFE -- Immediately invoked function expression
var game = (function () {
    var canvas;
    var stage;
    var helloLabel;
    var byeLabel;
    function Start() {
        console.log("%c Game Started", "color: teal; font-size:20px;");
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 fps
        createjs.Ticker.on('tick', Update);
        Main();
    }
    function Update() {
        // console.log("ok");
        stage.update();
        helloLabel.rotation += 5;
    }
    function Main() {
        console.log("%c Main Started", "color: teal; font-size:16px;");
        // helloLabel = new createjs.Text("Hello World", "40px Consolas", "#000000");
        // // sets pivot point to center of label
        // helloLabel.regX = helloLabel.getBounds().width * 0.5;
        // helloLabel.regY = helloLabel.getMeasuredLineHeight() * 0.5;
        // helloLabel.x = 320;
        // helloLabel.y = 240;
        helloLabel = new objects.Label("Hello!", "40px", "Consolas", "#000000", 320, 240, true);
        stage.addChild(helloLabel);
        byeLabel = new objects.Label("Bye!", "40px", "Consolas", "#000000", 320, 400, true);
        stage.addChild(byeLabel);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map