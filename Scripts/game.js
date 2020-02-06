"use strict";
// IIFE -- Immediately invoked function expression
var game = (function () {
    var canvas;
    var stage;
    // let helloLabel:objects.Label;
    // let byeLabel:objects.Label;
    // let clickButton:createjs.Bitmap;
    // let title:objects.Label;
    // let startButton:objects.Button;
    // let player:objects.Player;
    function start() {
        // console.log(`%c Game Started`, "color: teal; font-size:20px;");
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 30; // fps
        createjs.Ticker.on('tick', update);
        // stage.enableMouseOver(20);
        main();
    }
    function update() {
        // console.log("ok");
        // helloLabel.rotation += 5;
        // player.update();
        // let sqrDistance = objects.Vector2.sqrDistance(player.position, startButton.position);
        // let radii = player.halfWidth + startButton.halfWidth;
        // if (sqrDistance <= (radii*radii)) {
        //     console.log("collision");
        // }
        stage.update();
    }
    function main() {
        // helloWorld();
        // mousePlayer();
        var sprite = new objects.PlayerSprite();
        stage.addChild(sprite.sprite);
    }
    function mousePlayer() {
        // title = new objects.Label("The Game", "40px", "Consolas", "#000000", 320, 240, true);
        // stage.addChild(title);
        // startButton = new objects.Button("./Assets/images/startButton.png", 350, 300, true);
        // stage.addChild(startButton);        
        // startButton.on("click", function() {
        // });
        // player = new objects.Player();
        // stage.addChild(player);
    }
    function helloWorld() {
        // console.log(`%c Main Started`, "color: teal; font-size:16px;");
        // helloLabel = new createjs.Text("Hello World", "40px Consolas", "#000000");
        // // sets pivot point to center of label
        // helloLabel.regX = helloLabel.getBounds().width * 0.5;
        // helloLabel.regY = helloLabel.getMeasuredLineHeight() * 0.5;
        // helloLabel.x = 320;
        // helloLabel.y = 240;
        // helloLabel = new objects.Label("Hello!", "40px", "Consolas", "#000000", 320, 240, true);
        // stage.addChild(helloLabel);
        // byeLabel = new objects.Label("Bye!", "40px", "Consolas", "#000000", 320, 400, true);
        // stage.addChild(byeLabel);
        // clickButton = new createjs.Bitmap("./Assets/images/clickButton.png");
        // clickButton.regX = clickButton.getBounds().width * 0.5;
        // clickButton.regY = clickButton.getBounds().height * 0.5;
        // clickButton.x = 500;
        // clickButton.y = 400;
        // clickButton = new objects.Button("./Assets/images/clickButton.png", 500, 400, true);
        // stage.addChild(clickButton);
        // clickButton.on("click", function() {
        //     helloLabel.text = "Clicked!";
        // });
        // clickButton.on("mouseover", function() {
        //     clickButton.alpha = 0.7;
        // });
        // clickButton.on("mouseout", function() {
        //     clickButton.alpha = 1;
        // });
    }
    window.addEventListener("load", start);
})();
//# sourceMappingURL=game.js.map