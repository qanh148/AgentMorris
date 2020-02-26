import { Player } from "./objects/Player.js";
import { PlayerController } from "./controllers/PlayerController.js";
import { Wall } from "./objects/Wall.js";
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
        if (this.canvas == undefined) {
            throw new Error("Canvas not found");
        }
        this.stage = new createjs.Stage(this.canvas);
        createjs.Ticker.framerate = 60; // fps
        createjs.Ticker.on('tick', this.update, this);
        // stage.enableMouseOver(20);
        this.main();
    }
    main() {
        if (this.stage == undefined) {
            throw new Error("Stage is not defined");
        }
        const wall = new Wall();
        wall.transform.position = { x: 200, y: 200 };
        wall.init(this.stage);
        this.player.transform.position = { x: 300, y: 200 };
        this.player.init(this.stage);
        this.playerController.initWASD();
        // Collider.debugView = true;
        // let playerCollider:Collider = new Collider("player");
        // let otherCollider:Collider = new Collider("other");
    }
    update() {
        var _a;
        (_a = this.stage) === null || _a === void 0 ? void 0 : _a.update();
        this.player.update();
    }
}
new Game();
//# sourceMappingURL=Game.js.map