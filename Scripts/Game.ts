// IIFE - Immediately Invoked Function Expression
(function(){

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage:createjs.Stage;
  let btnStart:objects.Button;

  function Init():void {
    console.log("Initialization Started...");

    Start();
  }

  function Start():void {
    console.log("Starting Application...")

    stage = new createjs.Stage(canvas);
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);
    Main();
  }

  function Update():void {
    stage.update(); // redraws the stage
    
  }

  function Main():void {
    console.log("Game Started...");

    
    stage.addChild(helloLabel);

    btnStart = new objects.Button("../Assets/sprites/StartButton.png", 320, 480);
    stage.addChild();
  }

  window.onload = Init;

})();