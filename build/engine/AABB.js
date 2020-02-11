import { Point2D } from "./Point2D.js";
export class AABB {
    constructor(positionRelative = new Point2D(), width = 0, height = 0) {
        this._positionRelative = new Point2D();
        this._width = 0;
        this._height = 0;
        this.positionRelative = positionRelative;
        this.width = width;
        this.height = height;
    }
    get positionRelative() {
        return this._positionRelative;
    }
    set positionRelative(v) {
        this._positionRelative = v;
    }
    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
    }
    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
    }
}
AABB.debugView = false;
//# sourceMappingURL=AABB.js.map