import {Observer} from "./Observer";
import STATES from "./../states";

export class StateMachine {
    private _currentState = STATES.Cards;
    private observer: Observer = Observer.Instance;
    private static _instance: StateMachine;

    public changeMode(mode) {
        this.observer.dispatch('end-state:' + this._currentState);

        switch (mode) {
            case 'cards':
                this._currentState = STATES.Cards;
                break;
            case 'text':
                this._currentState = STATES.Text;
                break;
            case 'fire':
                this._currentState = STATES.Fire;
                break;
        }

        this.observer.dispatch('state:' + this._currentState);
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}