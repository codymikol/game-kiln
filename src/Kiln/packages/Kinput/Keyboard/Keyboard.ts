let instance = null;

export default class Keyboard {

    private _currentId: number;
    private _downEvents: {};
    private _upEvents: {};
    private keyDown: {};

    constructor() {
        if (instance) return instance;
        instance = this;
        this._currentId = 0;
        this._downEvents = {};
        this._upEvents = {};
        this.keyDown = {};
        this.bindKey = this.bindKey.bind(this);
        ['keyup', 'keydown'].forEach((e) => {
            window.addEventListener(e, this.bindKey)
        });
    }

    reset() {
        this._downEvents = {};
        this._upEvents = {};
        this.keyDown = {};
    }

    bindKey(e) {
        var key = e.key.toLowerCase();
        this.keyDown[key] = e.type[3] === 'd';

        if(e.type[3] === 'd') {
            if (this._downEvents[key]) [...this._downEvents[key].values()].forEach((fn) => {
                fn()
            });
        } else {
            if (this._upEvents[key]) [...this._upEvents[key].values()].forEach((fn) => {
                fn()
            });
        }

    }

    isDown(key: string) {
        return !!this.keyDown[key.toLowerCase()];
    }

    isUp(key: string) {
        return !this.isDown(key);
    }

    onDown(key: string, fn: () => void) {
        this._currentId++;
        if (!this._downEvents[key]) this._downEvents[key] = new Map();
        this._downEvents[key].set(this._currentId, fn);
        return this._currentId;
    }

    onUp(key: string, fn: () => void) {
        this._currentId++;
        if (!this._upEvents[key]) this._upEvents[key] = new Map();
        this._upEvents[key].set(this._currentId, fn);
        return this._currentId;
    }


}




