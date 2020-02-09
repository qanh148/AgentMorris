import { Point2D } from "./Point2D";

export class AABB {
	private _positionRelative : Point2D = new Point2D();
	public get positionRelative() : Point2D {
		return this._positionRelative;
	}
	public set positionRelative(v : Point2D) {
		this._positionRelative = v;
	}
	
	private _width : number = 0;
	public get width() : number {
		return this._width;
	}
	public set width(v : number) {
		this._width = v;
	}
	
	private _height : number = 0;
	public get height() : number {
		return this._height;
	}
	public set height(v : number) {
		this._height = v;
	}
	
	constructor(position:Point2D=new Point2D(), width:number=0, height:number=0) {
		this.positionRelative = position;
		this.width = width;
		this.height = height;
	}

	// TODO: Make debug view for AABB
	// var graphics = new createjs.Graphics().beginStroke("#ff0000").drawRect(0, 0, 100, 100);
	// var shape = new createjs.Shape(graphics);
}