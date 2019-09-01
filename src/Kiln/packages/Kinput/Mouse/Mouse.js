import ScreenManager from "../../KScreen/ScreenManager";

let instanceMap = {};

export default class Mouse {
    constructor(kiln) {
        if (instanceMap[kiln]) return instanceMap[kiln];
        instanceMap[kiln] = this;
        this._x = 0;
        this._y = 0;
        this._currentId = 0;
        this._down = false;
        this._rect = new ScreenManager(kiln).getRect();
        [['mouseup', false], ['mousedown', true], ['mousemove', this._down]].forEach((ev) => {
            this['_' + ev[0] + 'Events'] = new Map();
            window.addEventListener(ev[0], (e) => this._triggerAllEvents('_' + ev[0] + 'Events', e, ev[1]))
        });
    }

    reset() {
        this._currentId = 0;
        this._x = 0;
        this._y = 0;
        this._mouseupEvents = new Map();
        this._mousedownEvents = new Map();
        this._mousemoveEvents = new Map();
        this._down = false;
    }

    _triggerAllEvents(eventKey, e, isDown) {
        this._down = isDown;
        this._x = e.clientX - this._rect.left;
        this._y = e.clientY - this._rect.top;
        [...this[eventKey].values()].forEach((fn) => fn(e));
    }

    _bindToEntity(entity, eventMap, fn) {
        eventMap.set(++this._currentId, fn);
        let oldDestroy = entity.onDestroy;
        entity.onDestroy = bindDestroy;
        let id = this._currentId;
        function bindDestroy() {
            oldDestroy.apply(entity);
            eventMap.delete(id);
        }
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

    whenHovered(entity, fn) {
        return () => {if (this.isHovered(entity)) fn()}
    }

    isDown() {
        return this._down;
    }

    isUp() {
        return !this._down;
    }

    onDown(entity, fn) {
        this._bindToEntity(entity, this._mousedownEvents, this.whenHovered(entity, fn));
    }

    onUp(entity, fn) {
        this._bindToEntity(entity, this._mouseupEvents, this.whenHovered(entity, fn));
    }

    onMove(entity, fn) {
        this._bindToEntity(entity, this._mousemoveEvents, fn);
    }

}

