module objects {
    export class PlayerSprite {
        // Private
        private _facingRight : boolean = true;

        // Public
        public sprite:createjs.Sprite;

        // Properties
        public get facingRight() : boolean {
            return this._facingRight;
        }
        public set facingRight(value : boolean) {
            this._facingRight = value;

            this.sprite.scaleX = (value ? 1 : -1);
        }
        
        constructor() {
            // https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
            let spriteSheet = new createjs.SpriteSheet({
                images: ["./Assets/images/AgentMorris_SpriteSheet.png"],
                frames: {width: 64, height: 64},
                animations: {
                    idle: [0, 1, undefined, 0.1],
                    walk: [2, 3, undefined, 0.2],
                    run: [2, 3, undefined, 0.4],
                }
            });

            this.sprite = new createjs.Sprite(spriteSheet);
            this.sprite.gotoAndPlay("idle");

            this.sprite.regX = 32;
            this.sprite.regY = 32;
            
            this.facingRight = false;
        }
    }
}