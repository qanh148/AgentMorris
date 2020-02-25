import { Player } from "./objects/Player.js";
import { PlayerController } from "./controllers/PlayerController.js";
import { Wall } from "./objects/Wall.js";
import { SpriteRenderer } from "./engine/components/SpriteRenderer.js";
import { Mover } from "./engine/components/Mover.js";
(function () {
    let canvas;
    let stage;
    let player;
    let playerController;
    function main() {
        const wall = new Wall();
        wall.transform.position = { x: 200, y: 200 };
        stage.addChild(wall.getComponent(SpriteRenderer).sprite);
        player = new Player();
        player.transform.position = { x: 300, y: 200 };
        stage.addChild(player.getComponent(SpriteRenderer).sprite);
        playerController = new PlayerController(player);
        playerController.initWASD();
        // Collider.debugView = true;
        // let playerCollider:Collider = new Collider("player");
        // let otherCollider:Collider = new Collider("other");
    }
    function update() {
        stage.update();
        player.getComponent(Mover).update();
    }
    function start() {
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // fps
        createjs.Ticker.on('tick', update);
        // stage.enableMouseOver(20);
        main();
    }
    window.addEventListener("load", start);
})();
//# sourceMappingURL=game.js.map