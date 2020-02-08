import { Player } from "./objects/Player.js";
import { PlayerController } from "./objects/PlayerController.js";

let game = (function() {
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;

    let player:Player;
    let playerController:PlayerController;

    function start():void {
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);

        createjs.Ticker.framerate = 30; // fps
        createjs.Ticker.on('tick', update);

        // stage.enableMouseOver(20);

        main();
    }

    function update():void {
        stage.update();

        player.update();
    }

    function main():void {
        player =  new Player();

        player.sprite.x = 100;
        player.sprite.y = 100;
        stage.addChild(player.sprite);

        playerController = new PlayerController(player);
    }

    window.addEventListener("load", start);
})();
