"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenManager_1 = require("../../KScreen/ScreenManager");
var instanceMap = {};
var LoopManager = /** @class */ (function () {
    function LoopManager(kiln, elem, initialScreen) {
        if (instanceMap[kiln])
            return instanceMap[kiln];
        instanceMap[kiln] = this;
        this.paused = false;
        this.stopped = false;
        this.name = kiln;
        this.initialized = false;
        this.MAX_FPS = 60;
        this.lastFrameTimeMs = 0;
        this.screenManager = new ScreenManager_1.default(kiln, elem, initialScreen);
        this.ctx = this.screenManager.getCtx();
        this.loop = this.loop.bind(this);
    }
    LoopManager.prototype._togglePause = function () {
        this.paused = !this.paused;
    };
    LoopManager.prototype._stop = function () {
        this.stopped = true;
        delete instanceMap[this.name];
    };
    LoopManager.prototype.loop = function (timestamp) {
        if (this.stopped) {
            return;
        }
        if (this.paused) {
            this.lastFrameTimeMs = timestamp;
            return void requestAnimationFrame(this.loop);
        }
        if (timestamp < this.lastFrameTimeMs + (1000 / this.MAX_FPS)) {
            return void requestAnimationFrame(this.loop);
        }
        var delta = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;
        this.screenManager.tick(delta);
        this.ctx.clearRect(0, 0, this.screenManager.getCanvas().width, this.screenManager.getCanvas().height);
        this.screenManager.render();
        requestAnimationFrame(this.loop);
    };
    LoopManager.prototype.init = function () {
        this.initialized = true;
        requestAnimationFrame(this.loop);
    };
    return LoopManager;
}());
exports.default = LoopManager;
