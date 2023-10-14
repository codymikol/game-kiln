"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenManager_1 = require("../KScreen/ScreenManager");
var EntityManager_1 = require("./EntityManager");
var noop_1 = require("lodash/noop");
var index_1 = require("../../../index");
var KEntity = /** @class */ (function () {
    function KEntity(x, y, height, width) {
        this.setParent = function (parent) {
            this._parent = parent;
        };
        this.kiln = null;
        this.id = new EntityManager_1.default().getNextEntityId();
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this._intervalList = [];
        this._timeoutList = [];
        this._childEntities = [];
        this.onTick = noop_1.default;
        this.onRender = noop_1.default;
        this.onResize = noop_1.default;
        this.onDestroy = noop_1.default;
        this.onCreate = noop_1.default;
    }
    KEntity.prototype.setKiln = function (kiln) {
        this.kiln = kiln;
    };
    ;
    KEntity.prototype.interval = function (fn, interval) {
        this._intervalList.push(setInterval(fn.bind(this), interval));
    };
    ;
    KEntity.prototype.timeout = function (fn, timeout) {
        this._timeoutList.push(setTimeout(fn.bind(this), timeout));
    };
    ;
    KEntity.prototype.add = function (child) {
        child.setKiln(this.kiln);
        child.setParent(this);
        this._addToScreenManager(child);
        this._childEntities.push(child);
    };
    ;
    KEntity.prototype.destroy = function () {
        this.onDestroy();
        this._childEntities.forEach(function (x) { return x.destroy(); });
        this._intervalList.forEach(function (x) { return clearInterval(x); });
        this._timeoutList.forEach(function (x) { return clearTimeout(x); });
        if (this._parent && this._parent instanceof index_1.KScreen)
            this._parent.delete(this.id);
    };
    ;
    KEntity.prototype._addToScreenManager = function (child) {
        this._screenManager = this._screenManager || new ScreenManager_1.default(this.kiln);
        this._screenManager.activeScreen.add(child);
    };
    return KEntity;
}());
exports.default = KEntity;
