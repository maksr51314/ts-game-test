import * as PIXI from "pixi.js";

export class TextImage extends PIXI.Container {

    constructor() {
        super();
    }

    setText(texts:Array<string>, fontSize:number) {
        this["removeChildren"]();

        texts.forEach((text) => {
            const w = this["width"];
            const h = this["height"];
            if (text.indexOf('.png') !== -1) {
                const sprite = PIXI.Sprite.fromImage('dist/images/button.png');
                sprite.position.set(w, 0);
                sprite.height = fontSize;
                sprite.width = fontSize;
                this["addChild"](sprite);
            } else {
                const textItem = new PIXI.Text();
                textItem.text = text;
                textItem.style.fontSize = fontSize;
                textItem.position.set(w, 0);
                this["addChild"](textItem);
            }


        })


    }
}