import { Key } from "../node_modules/ts-key-enum/Key.enum";
import { KeyboardInput } from "./objects/KeyboardInput.js";

let game = (function() {
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;

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
    }

    function main():void {
        let sprite = new objects.PlayerSprite();
        sprite.sprite.x = 50;
        sprite.sprite.y = 50;
        stage.addChild(sprite.sprite);

        let keyb = new KeyboardInput(Key.ArrowUp);

        document.addEventListener("keydown", (event) => {
            console.log(event);
        });
    }

    window.addEventListener("load", start);
})();
