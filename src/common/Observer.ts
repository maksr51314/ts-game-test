export class Observer {
    private static instance: Observer;

    private listeners = {};

    public on(eventName, listener) {
        if (!this.listeners[eventName]) this.listeners[eventName] = [];
        this.listeners[eventName].push(listener);
    }

    public dispatch(eventName:string) {
        console.log('event ', eventName);
        if (this.listeners[eventName]) {
            for (var i = 0; i < this.listeners[eventName].length; i++) {
                this.listeners[eventName][i](this);
            }
        }
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}