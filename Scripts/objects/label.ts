module objects {
    export class Label extends createjs.Text {
        constructor(text:string,
             fontSize:string, fontFamily:string, fontColor:string,
             x:number, y:number, isCentered:boolean) {
            super(text, `${fontSize} ${fontFamily}`, fontColor);
            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
            this.x = x;
            this.y = y;
        }
    }
}