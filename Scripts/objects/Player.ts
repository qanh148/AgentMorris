export enum MoveDirection {
    Up, Down, Left, Right
}

export class Player {
    // Private
    private _facingRight : boolean = true;
    private _moveSpeed : number = 5;
    private _movingX: number = 0;
    private _movingY: number = 0;

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

    public moveStart(moveDirection:MoveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
                this._movingY = -this._moveSpeed;
                break;
            case MoveDirection.Down:
                this._movingY = this._moveSpeed;
                break;
            case MoveDirection.Left:
                this.facingRight = false;
                this._movingX = -this._moveSpeed;
                break;
            case MoveDirection.Right:
                this.facingRight = true;
                this._movingX = this._moveSpeed;
                break;
        }

        if (this._movingX != 0 || this._movingY != 0) {
            this.sprite.gotoAndPlay("walk");
        }
    }

    public moveStop(moveDirection:MoveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
            case MoveDirection.Down:
                this._movingY = 0;
                break;
            case MoveDirection.Left:
                this.facingRight = false;
                this._movingX = 0;
                break;
            case MoveDirection.Right:
                this.facingRight = true;
                this._movingX = 0;
                break;
        }

        if (this._movingX == 0 && this._movingY == 0) {
            this.sprite.gotoAndPlay("idle");
        }
    }

    public update() {
        if (this._movingX != 0) {
            this.sprite.x += this._movingX;
        }
        if (this._movingY != 0) {
            this.sprite.y += this._movingY;
        }
    }
}
