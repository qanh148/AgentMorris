import { GameComponent } from "../GameComponent.js";
export var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["Up"] = 0] = "Up";
    MoveDirection[MoveDirection["Down"] = 1] = "Down";
    MoveDirection[MoveDirection["Left"] = 2] = "Left";
    MoveDirection[MoveDirection["Right"] = 3] = "Right";
})(MoveDirection || (MoveDirection = {}));
export class Mover extends GameComponent {
}
//# sourceMappingURL=Mover.js.map