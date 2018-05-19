import * as PIXI from "pixi.js";

import CONFIG from "../../config";
import {View} from "../../common/View";
import {StateMachine} from "../../common/StateMachine"


export class Menu {
    private view: View = View.Instance;
    private stateMachine: StateMachine = StateMachine.Instance;
    private fps = new PIXI.Text();
    private container = new PIXI.Container();

    constructor() {
        this.fps.position.x = 600;
        this.container.addChild(this.fps);
        this.view["stage"].addChild(this.container);
        this.view["ticker"].add(this.showFPS.bind(this));
        this.createButtons();
    }

    private showFPS() {
        this.fps.text = this.view["ticker"].FPS;
    }

    private createButtons() {
        CONFIG.buttons.forEach((name, index) => {
            // const sprite = PIXI.Sprite.fromImage('dist/images/button.png');
            const text = new PIXI.Text();
            text.text = name;
            text.position.x = index * 100;
            text.interactive = true;
            text.buttonMode = true;

            // sprite.interactive = true;
            // sprite.position.x = index * 100;

            text.on('pointerdown', this.click.bind(this, name));
            this.container.addChild(text);
            // this.container.addChild(sprite);
        })
    }

    private click(name) {
        this.stateMachine.changeMode(name)
    }
}