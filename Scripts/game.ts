import { Player } from "./objects/Player.js";
import { PlayerController } from "./controllers/PlayerController.js";
import { Wall } from "./objects/Wall.js";

let game = (function () {
	let canvas: HTMLCanvasElement;
	let stage: createjs.Stage;

	let player: Player;
	let playerController: PlayerController;

	// REMINDER: Use EaselJS EventDispatcher

	// TODO: Make scenes

	function start(): void {
		canvas = document.getElementsByTagName('canvas')[0];
		stage = new createjs.Stage(canvas);

		createjs.Ticker.framerate = 60; // fps
		createjs.Ticker.on('tick', update);

		// stage.enableMouseOver(20);

		main();
	}

	function update(): void {
		stage.update();

		player.mover.update();
	}

	function main(): void {
		let wall = new Wall();
		wall.position = { x: 200, y: 200 };
		stage.addChild(wall.sprite);

		player = new Player();
		player.position = { x: 300, y: 200 };
		stage.addChild(player.sprite);

		playerController = new PlayerController(player);
		playerController.initWASD();

		// Collider.debugView = true;

		// let playerCollider:Collider = new Collider("player");
		// let otherCollider:Collider = new Collider("other");

	}

	window.addEventListener("load", start);
})();
