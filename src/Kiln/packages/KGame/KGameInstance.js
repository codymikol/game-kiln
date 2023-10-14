"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoopManager_1 = require("./Loop/LoopManager");
var KGameInstance = /** @class */ (function () {
    function KGameInstance(kilnName, bindElement, initialScreen, parentStore) {
        this.name = kilnName;
        this.destroyed = false;
        this._parentStore = parentStore;
        this._container = bindElement;
        this._canvas = document.createElement('canvas');
        this._container.appendChild(this._canvas);
        this._loopManager = new LoopManager_1.default(this.name, this._canvas, initialScreen);
        this._screenManager = this._loopManager.screenManager;
        this._loopManager.init();
    }
    KGameInstance.prototype.destroy = function () {
        if (this.destroyed)
            return void console.error("Error: Trying to destroy ".concat(this.name, ", but it has already been destroyed!"));
        this._screenManager.destroy();
        this._loopManager._stop();
        this._canvas.parentElement.removeChild(this._canvas);
        delete this._parentStore[this.name];
        this.destroyed = true;
    };
    KGameInstance.prototype.setScreen = function (screen) {
        this._screenManager.set(screen);
    };
    return KGameInstance;
}());
exports.default = KGameInstance;
