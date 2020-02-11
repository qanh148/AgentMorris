export class Point2D {
    constructor(x = 0, y = 0) {
        this._x = 0;
        this._y = 0;
        this.x = x;
        this.y = y;
    }
    get x() {
        return this._x;
    }
    set x(v) {
        this._x = v;
    }
    get y() {
        return this._y;
    }
    set y(v) {
        this._y = v;
    }
}
//# sourceMappingURL=Point2D.js.map