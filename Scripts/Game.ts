import { Player } from "./objects/Player.js";
import { PlayerController } from "./controllers/PlayerController.js";
import { Wall } from "./objects/Wall.js";

class Game {
	private canvas?: HTMLCanvasElement;
	private stage?: createjs.Stage;

	private player: Player;
	private playerController: PlayerController;

	constructor() {
		window.addEventListener("load", () => {
			this.start();
		});
		
		this.player = new Player();
		this.playerController = new PlayerController(this.player);
	}
	
	start(): void {
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

	main(): void {
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
	
	update(): void {
		this.stage?.update();
		this.player.update();
	}
}

new Game();
