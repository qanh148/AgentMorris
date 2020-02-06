"use strict";


let __extends = (this && this.__extends) || (function () {
    let extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (let p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
let objects;
(function (objects) {
    let Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            // super();
            return _super.call(this, "./Assets/images/default.png", 0, 0, true) || this;
        }
        Player.prototype._checkBounds = function () {
            // throw new Error("Method not implemented.");
        };
        Player.prototype.start = function () {
            // throw new Error("Method not implemented.");
            // this.isCentered = true;
        };
        Player.prototype.update = function () {
            this.position = new objects.Vector2(this.stage.mouseX, this.stage.mouseY);
        };
        Player.prototype.reset = function () {
            // throw new Error("Method not implemented.");
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));

function tick(event){
  
    switch(xKeyHeld){
      case "LEFT":
        Player.x -= 3;//player object's x value is subtracted by 3 every tick left is held
          break;
      case "RIGHT":
    if(Player.x < npc.x - 85)
        Player.x += 3;//see above
          break;
  }

  switch(yKeyHeld){
      case "UP":
        Player.y -= 3;//same as above, using y values
          break;
      case "DOWN":
        Player.y += 3;//^^^
          break;
  }

stage.update(event);
}

    var KEYCODE_W = 87;	//js keycodes for wasd		
	var KEYCODE_A = 65;	
	var KEYCODE_D = 68;		
    var KEYCODE_S = 83;
    
//Animations can fit here

//# sourceMappingURL=Player.js.map