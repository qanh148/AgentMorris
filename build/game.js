import { Player } from "./objects/Player.js";
import { PlayerController } from "./controllers/PlayerController.js";
import { Wall } from "./objects/Wall.js";
import { SpriteRenderer } from "./engine/components/SpriteRenderer.js";
import { Mover } from "./engine/components/Mover.js";
class Game {
    constructor() {
        window.addEventListener("load", () => {
            this.start();
        });
        this.player = new Player();
        this.playerController = new PlayerController(this.player);
    }
    start() {
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.stage = new createjs.Stage(this.canvas);
        createjs.Ticker.framerate = 60; // fps
        createjs.Ticker.on('tick', this.update, this);
        // stage.enableMouseOver(20);
        this.main();
    }
    main() {
        var _a, _b;
        const wall = new Wall();
        wall.transform.position = { x: 200, y: 200 };
        (_a = this.stage) === null || _a === void 0 ? void 0 : _a.addChild(wall.getComponent(SpriteRenderer).sprite);
        this.player.transform.position = { x: 300, y: 200 };
        (_b = this.stage) === null || _b === void 0 ? void 0 : _b.addChild(this.player.getComponent(SpriteRenderer).sprite);
        this.playerController.initWASD();
        // Collider.debugView = true;
        // let playerCollider:Collider = new Collider("player");
        // let otherCollider:Collider = new Collider("other");
    }
    update() {
        var _a;
        (_a = this.stage) === null || _a === void 0 ? void 0 : _a.update();
        this.player.getComponent(Mover).update();
    }
}
new Game();
//# sourceMappingURL=Game.js.map