export class GameComponent {
    // public set gameObject(v : GameObject) {
    // 	this._gameObject = v;
    // }
    constructor(gameObject) {
        this._gameObject = gameObject;
    }
    get gameObject() {
        return this._gameObject;
    }
    update() { }
}
// Reference:
// https://www.html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180372
// https://dev.to/krumpet/generic-type-guard-in-typescript-258l
//# sourceMappingURL=GameComponent.js.map