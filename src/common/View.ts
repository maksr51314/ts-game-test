import * as PIXI from "pixi.js";
import CONFIG from "../config";

export class View extends PIXI.Application {
    private static instance: View;
    private ratio = 1280 / 720;

    constructor() {
        super(CONFIG.WIDTH, CONFIG.HEIGHT, CONFIG.applicationOptions);
        document.body.appendChild(this["view"]);
        window.onresize = this.resize.bind(this);
        this.resize();
    }

    private resize() {
        let w, h;

        if (window.innerWidth / window.innerHeight >= this.ratio) {
            w = window.innerHeight * this.ratio;
            h = window.innerHeight;
        } else {
            w = window.innerWidth;
            h = window.innerWidth / this.ratio;
        }

        this["view"].style.width = w + 'px';
        this["view"].style.height = h + 'px';
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}