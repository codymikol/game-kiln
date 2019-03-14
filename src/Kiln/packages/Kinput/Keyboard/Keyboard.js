let instance = null;

export default class Keyboard {

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

    isDown(key) {
        return !!this.keyDown[key.toLowerCase()];
    }

    isUp(key) {
        return !this.isDown(key);
    }

    onDown(key, fn) {
        this._currentId++;
        if (!this._downEvents[key]) this._downEvents[key] = new Map();
        this._downEvents[key].set(this._currentId, fn);
        return this._currentId;
    }

    onUp(key, fn) {
        this._currentId++;
        if (!this._upEvents[key]) this._upEvents[key] = new Map();
        this._upEvents[key].set(this._currentId, fn);
        return this._currentId;
    }


}




