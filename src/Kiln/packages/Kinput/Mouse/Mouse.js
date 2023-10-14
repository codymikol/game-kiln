"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenManager_1 = require("../../KScreen/ScreenManager");
var each_1 = require("lodash/each");
var instanceMap = {};
var Mouse = /** @class */ (function () {
    function Mouse(kiln) {
        if (instanceMap[kiln])
            return instanceMap[kiln];
        instanceMap[kiln] = this;
        this._x = 0;
        this._y = 0;
        this._currentId = 0;
        this._down = false;
        this._mouseupEvents = new Map();
        this._mousedownEvents = new Map();
        this._mousemoveEvents = new Map();
        this._rect = new ScreenManager_1.default(kiln).getRect();
        this.init();
    }
    Mouse.prototype.init = function () {
        var _this = this;
        window.addEventListener('mouseup', function (e) { return _this._triggerAllEvents('_mouseupEvents', e, false); });
        window.addEventListener('mousedown', function (e) { return _this._triggerAllEvents('_mousedownEvents', e, true); });
        window.addEventListener('mousemove', function (e) { return _this._triggerAllEvents('_mousemoveEvents', e, _this._down); });
    };
    Mouse.prototype.reset = function () {
        this._currentId = 0;
        this._x = 0;
        this._y = 0;
        this._mouseupEvents = new Map();
        this._mousedownEvents = new Map();
        this._mousemoveEvents = new Map();
        this._down = false;
    };
    Mouse.prototype._triggerAllEvents = function (eventKey, e, isDown) {
        this._down = isDown;
        this._x = e.clientX - this._rect.left;
        this._y = e.clientY - this._rect.top;
        (0, each_1.default)(__spreadArray([], this[eventKey].values(), true), function (fn) { return fn(e); });
    };
    Mouse.prototype._bindToEntity = function (entity, eventMap, fn) {
        eventMap.set(++this._currentId, fn);
        var oldDestroy = entity.onDestroy;
        entity.onDestroy = bindDestroy;
        var id = this._currentId;
        function bindDestroy() {
            oldDestroy.apply(entity);
            eventMap.delete(id);
        }
    };
    Mouse.prototype.x = function () {
        return this._x;
    };
    Mouse.prototype.y = function () {
        return this._y;
    };
    Mouse.prototype.isHovered = function (entity) {
        return this._x >= entity.x && this._x <= entity.x + entity.width && this._y >= entity.y && this._y <= entity.y + entity.height;
    };
    Mouse.prototype.whenHovered = function (entity, fn) {
        var _this = this;
        return function () { if (_this.isHovered(entity))
            fn(); };
    };
    Mouse.prototype.isDown = function () {
        return this._down;
    };
    Mouse.prototype.isUp = function () {
        return !this._down;
    };
    Mouse.prototype.onDown = function (entity, fn) {
        this._bindToEntity(entity, this._mousedownEvents, this.whenHovered(entity, fn));
    };
    Mouse.prototype.onUp = function (entity, fn) {
        this._bindToEntity(entity, this._mouseupEvents, this.whenHovered(entity, fn));
    };
    Mouse.prototype.onMove = function (entity, fn) {
        this._bindToEntity(entity, this._mousemoveEvents, fn);
    };
    return Mouse;
}());
exports.default = Mouse;
