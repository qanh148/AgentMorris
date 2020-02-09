import { Collider } from "./Collider.js";
import { Point2D } from "./Point2D.js";

export enum MoveDirection {
    Up, Down, Left, Right
}

export abstract class GameObject {
    // Private
    private _moveSpeed : number = 5;
    private _movingX: number = 0;
    private _movingY: number = 0;

    // Public
    public sprite:createjs.Sprite;
    public collider:Collider;

    // TODO: Add AABB either here or in collider
    // Probably in collider

    // Properties
    
    private _position : Point2D = new Point2D();
    public get position() : Point2D {
        return this._position;
    }
    public set position(v : Point2D) {
        this._position = v;
        this.sprite.x = v.x;
        this.sprite.y = v.y;
    }
    
    private _facingRight : boolean = true;
    public get facingRight() : boolean {
        return this._facingRight;
    }
    public set facingRight(value : boolean) {
        this._facingRight = value;
        this.sprite.scaleX = (value ? 1 : -1);
    }
    
    constructor(spriteSheetData:Object, colliderTag:string) {
        // https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
        let spriteSheet = new createjs.SpriteSheet(spriteSheetData);

        this.sprite = new createjs.Sprite(spriteSheet);
        this.sprite.gotoAndPlay("idle");

        this.sprite.regX = 32;
        this.sprite.regY = 32;

        this.collider = new Collider(colliderTag);
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