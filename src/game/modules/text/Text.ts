import * as PIXI from "pixi.js";

import {View} from "../../../common/View";
import {Observer} from "../../../common/Observer"
import {TextImage} from "./TextImage";

const TEXT = ["foo", "dist/images/button.png"];

export class Text {
    private view: View = View.Instance;
    private observer: Observer = Observer.Instance;
    private container = new PIXI.Container();
    private text: TextImage = new TextImage();

    constructor() {
        this.observer.on("state:text", () => {
            this.container["visible"] = true;
        });
        this.observer.on("end-state:text", () => {
            this.container["visible"] = false;
        });

        this.container.position.set(250, 250);
        this.container.addChild(this.text);
        this.view["stage"].addChild(this.container);
        this.container["visible"] = false;

        this.updateText();
    }

    private updateText() {
        let text:Array<string> = [];

        for (let i = 0; i < 3; i++) {
            text.push(this.getRandomImageText())
        }

        this.text.setText(text, this.getRandomInt(10, 100));

        setTimeout(() => {
            this.updateText()
        }, 2000)
    }

    private getRandomImageText():string {
        return TEXT[Math.floor(Math.random() * TEXT.length)]
    }

    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}