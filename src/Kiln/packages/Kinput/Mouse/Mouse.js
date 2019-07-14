let instance = null;

export default class Mouse {
    constructor() {
        if (instance) return instance;
        instance = this;
        this._x = 0;
        this._y = 0;
        this._currentId = 0;
        this._upEvents = new Map();
        this._downEvents = new Map();
        this._moveEvents = new Map();
        this._down = false;

        window.addEventListener('mouseup', (e) => {
            this._x = e.clientX;
            this._y = e.clientY;
            this._down = false;
            [...this._upEvents.values()].forEach((fn) => fn(e))
        });

        window.addEventListener('mousedown', (e) => {
            this._x = e.clientX;
            this._y = e.clientY;
            this._down = true;
            [...this._downEvents.values()].forEach((fn) => fn(e))
        });

        window.addEventListener('mousemove', (e) => {
            this._x = e.clientX;
            this._y = e.clientY;
            [...this._moveEvents.values()].forEach((fn) => fn(e))
        });

    }

    reset() {
        this._currentId = 0;
        this._x = 0;
        this._y = 0;
        this._upEvents = new Map();
        this._downEvents = new Map();
        this._moveEvents = new Map();
        this._down = false;
    }

    x() {
        return this._x;
    }

    y() {
        return this._y;
    }

    isHovered(entity) {
        return this._x >= entity.x && this._x <= entity.x + entity.width && this._y >= entity.y && this._y <= entity.y + entity.height;
    }

    isDown() {
        return this._down;
    }

    isUp() {
        return !this._down;
    }

    onDown(entity, fn) {
        this._currentId++;
        this._downEvents.set(this._currentId, () => { if(this.isHovered(entity)) fn() });
        return this._currentId;
    }

    onUp(entity, fn) {
        this._currentId++;
        this._upEvents.set(this._currentId, ()=> { if(this.isHovered(entity)) fn() });
        return this._currentId;
    }

    onMove(fn) {
        this._currentId++;
        this._moveEvents.set(this._currentId, fn);
        return this._currentId;
    }

}

