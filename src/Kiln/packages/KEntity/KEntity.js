import ScreenManager from "../KScreen/ScreenManager";
import EntityManager from "./EntityManager";
import noop from "lodash/noop"

export default class KEntity {
    constructor(x, y, height, width) {
        this.kiln = null;
        this.id = new EntityManager().getNextEntityId();
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this._intervalList = [];
        this._timeoutList = [];
        this._childEntities = [];
        this.onTick = noop;
        this.onRender = noop;
        this.onResize = noop;
        this.onDestroy = noop;
        this.onCreate = noop;
        this.setKiln = function (kiln) {
            this.kiln = kiln;
        };
       this.interval = function (fn, interval) {
            this._intervalList.push(setInterval(fn.bind(this), interval));
        };
        this.timeout = function (fn, timeout) {
            this._timeoutList.push(setTimeout(fn.bind(this), timeout))
        };
        this.add = function (child) {
            child.setKiln(this.kiln);
            child.setParent(this);
            this._addToScreenManager(child);
            this._childEntities.push(child);
        };
        this.destroy = function () {
            this.onDestroy();
            this._childEntities.forEach((x) => x.destroy());
            this._intervalList.forEach((x) => clearInterval(x));
            this._timeoutList.forEach((x) => clearTimeout(x));
            if(this._parent) this._parent.delete(this.id);
        };
        this.setParent = function(parent) {
            this._parent = parent;
        };
        this._addToScreenManager = function (child) {
            this._screenManager = this._screenManager || new ScreenManager(this.kiln);
            this._screenManager.activeScreen.add(child);
        }

    }

}