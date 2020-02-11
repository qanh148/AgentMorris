"use strict";
var objects;
(function (objects) {
    class Label extends createjs.Text {
        /**
         *Creates an instance of Label.
         * @param {string} text
         * @param {string} fontSize
         * @param {string} fontFamily
         * @param {string} fontColor
         * @param {number} x
         * @param {number} y
         * @param {boolean} isCentered
         * @memberof Label
         */
        constructor(text, fontSize, fontFamily, fontColor, x, y, isCentered) {
            super(text, `${fontSize} ${fontFamily}`, fontColor);
            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
            this.x = x;
            this.y = y;
        }
    }
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=Label.js.map