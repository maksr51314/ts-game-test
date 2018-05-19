import * as PIXI from "pixi.js";
import * as TWEEN from "tween.js";

import CONFIG from "../../../config";
import {View} from "../../../common/View";
import {Observer} from "../../../common/Observer"

const CARDS = {
    yOffset: 4,
    animationTime: 2000,
    switchTime: 1000,
    container1: {
        x: 100,
        y: 100
    },
    container2: {
        x: 500,
        y: 100
    }
};

export class Cards {
    private view: View = View.Instance;
    private observer: Observer = Observer.Instance;
    private cardsStart: number = 0;
    private cardsComplete: number = 0;
    private container = new PIXI.Container();
    private container2 = new PIXI.Container();

    constructor() {
        this.observer.on("state:cards", () => { this.container["visible"] = true; });
        this.observer.on("end-state:cards", () => { this.container["visible"] = false; });

        this.view["stage"].addChild(this.container);
        this.view["stage"].addChild(this.container2);
        this.view["ticker"].add(this.ticker);

        this.createCards();
        this.update();
    }

    private ticker(time) {
        TWEEN.update();
    }

    private update() {
        if (this.cardsStart < CONFIG.cardsCount) {
            this.cardsStart++;
            this.play(this.cardsStart, () => {
                this.reversePlay(() => {
                    this.cardsStart = 0;
                })
            });
        }

        setTimeout(() => {
            this.update()
        }, CARDS.switchTime)
    }

    private createCards() {
        for (let i = 0; i < CONFIG.cardsCount; i++) {
            const sprite = PIXI.Sprite.fromImage('dist/images/card.png');
            const text = new PIXI.Text();
            text.text = i;
            text.style.fontSize = 300;
            sprite.width = 30;
            sprite.height = 30;
            sprite.position.x = CARDS.container1.x;
            sprite.position.y = i*CARDS.yOffset + CARDS.container1.y;
            sprite.addChild(text);
            this.container.addChild(sprite);
        }
    }

    private play(index, cb) {
        const sprite = this.container.children[0];
        const x = CARDS.container2.x;
        const y = index*CARDS.yOffset + CARDS.container2.y;

        const tween = new TWEEN.Tween(sprite.position)
            .to({ x: x, y: y }, CARDS.animationTime)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                if (tween.fired) {
                    return;
                }

                if (sprite.position.x > x / 2) {
                    tween.fired = true;
                    this.removeEl(this.container.children, sprite);
                    this.container2.children.unshift(sprite);
                }
            })
            .onComplete(() => {

                this.cardsComplete++;
                if (this.cardsComplete === CONFIG.cardsCount) {
                    this.cardsComplete = 0;
                    cb()
                }
            })
            .start();

    }

    private reversePlay(cb) {

        this.container2.children.forEach((sprite, i) => {
            const x = CARDS.container1.x;
            const y = (this.container.children.length - 1 - i)*CARDS.yOffset
                + this.container2.children.length * CARDS.yOffset + CARDS.container2.y;

            const tween = new TWEEN.Tween(sprite.position)
                .to({ x: x, y: y }, 1000 + i * 4)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    if (tween.fired) {
                        return;
                    }

                    if (sprite.position.x < 250) {
                        tween.fired = true;
                        this.removeEl(this.container2.children, sprite);
                        this.container.children.unshift(sprite);
                    }
                })
                .start();

            if (i === this.container2.children.length - 1) {
                tween.onComplete(() => {
                    cb()
                })
            }
        });
    }

    private removeEl(arr, el) {
        const index = arr.indexOf(el);
        return arr.splice(index, 1);
    }
}