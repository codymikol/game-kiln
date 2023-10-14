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
var instance = null;
var Keyboard = /** @class */ (function () {
    function Keyboard() {
        var _this = this;
        if (instance)
            return instance;
        instance = this;
        this._currentId = 0;
        this._downEvents = {};
        this._upEvents = {};
        this.keyDown = {};
        this.bindKey = this.bindKey.bind(this);
        ['keyup', 'keydown'].forEach(function (e) {
            window.addEventListener(e, _this.bindKey);
        });
    }
    Keyboard.prototype.reset = function () {
        this._downEvents = {};
        this._upEvents = {};
        this.keyDown = {};
    };
    Keyboard.prototype.bindKey = function (e) {
        var key = e.key.toLowerCase();
        this.keyDown[key] = e.type[3] === 'd';
        if (e.type[3] === 'd') {
            if (this._downEvents[key])
                __spreadArray([], this._downEvents[key].values(), true).forEach(function (fn) {
                    fn();
                });
        }
        else {
            if (this._upEvents[key])
                __spreadArray([], this._upEvents[key].values(), true).forEach(function (fn) {
                    fn();
                });
        }
    };
    Keyboard.prototype.isDown = function (key) {
        return !!this.keyDown[key.toLowerCase()];
    };
    Keyboard.prototype.isUp = function (key) {
        return !this.isDown(key);
    };
    Keyboard.prototype.onDown = function (key, fn) {
        this._currentId++;
        if (!this._downEvents[key])
            this._downEvents[key] = new Map();
        this._downEvents[key].set(this._currentId, fn);
        return this._currentId;
    };
    Keyboard.prototype.onUp = function (key, fn) {
        this._currentId++;
        if (!this._upEvents[key])
            this._upEvents[key] = new Map();
        this._upEvents[key].set(this._currentId, fn);
        return this._currentId;
    };
    return Keyboard;
}());
exports.default = Keyboard;
