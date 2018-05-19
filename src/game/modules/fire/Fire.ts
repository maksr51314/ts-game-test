import * as PIXI from "pixi.js";
declare function require(name: string);
require('pixi-particles/dist/pixi-particles');

import {View} from "../../../common/View";
import {Observer} from "../../../common/Observer"

import flameConfig from "./flameConfig"

export class Fire {
    private view: View = View.Instance;
    private observer: Observer = Observer.Instance;
    private container = new PIXI.Container();
    private emitter;
    private elapsed = Date.now();

    constructor() {
        this.observer.on("state:fire", () => {
            this.container["visible"] = true;
        });
        this.observer.on("end-state:fire", () => {
            this.container["visible"] = false;
        });

        this.view["stage"].addChild(this.container);
        this.view["ticker"].add(this.ticker.bind(this));

        this.emitter = new PIXI.particles.Emitter(
            this.container,
            [
                PIXI.Texture.fromImage('dist/images/particle.png'),
                PIXI.Texture.fromImage('dist/images/Fire.png')
            ],
            flameConfig
        );

        this.container.position.set(400, 400);
        this.container.visible = false;
        this.emitter.emit = true;
    }

    private ticker(time) {
        const now = Date.now();

        this.emitter.update((now - this.elapsed) * 0.001);
        this.elapsed = now;
    }

}