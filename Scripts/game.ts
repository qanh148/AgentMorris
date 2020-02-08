import { Player } from "./objects/Player.js";
import { PlayerController } from "./objects/PlayerController.js";
import { Collider } from "./objects/Collider.js";

let game = (function() {
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;

    let player:Player;
    let playerController:PlayerController;

    // TODO: Use EaselJS EventDispatcher

    function start():void {
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);

        createjs.Ticker.framerate = 60; // fps
        createjs.Ticker.on('tick', update);

        // stage.enableMouseOver(20);

        main();
    }

    function update():void {
        stage.update();

        player.update();

        Collider.update();
    }

    function main():void {
        player =  new Player();

        player.sprite.x = 100;
        player.sprite.y = 100;
        stage.addChild(player.sprite);

        playerController = new PlayerController(player);
        playerController.initWASD();
    }

    window.addEventListener("load", start);
})();
