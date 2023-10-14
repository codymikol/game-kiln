"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var each_1 = require("lodash/each");
var instance = {};
var ScreenManager = /** @class */ (function () {
    function ScreenManager(kiln, elem, initialScreen) {
        var _this = this;
        if (instance[kiln])
            return instance[kiln];
        instance[kiln] = this;
        this.initialized = false;
        this.kiln = kiln;
        this.canvas = elem;
        this.ctx = elem.getContext('2d');
        this.set(initialScreen);
        this.resize = this.resize.bind(this);
        Object.defineProperty(this, 'height', { get: function () { return _this.canvas.height; } });
        Object.defineProperty(this, 'width', { get: function () { return _this.canvas.width; } });
        window.addEventListener('resize', this.resize);
        window.addEventListener('contextmenu', function () { return false; });
        this.resize();
    }
    ScreenManager.prototype.getCtx = function () {
        return this.ctx;
    };
    ScreenManager.prototype.getCanvas = function () {
        return this.canvas;
    };
    ScreenManager.prototype.getRect = function () {
        return this.getCanvas().getBoundingClientRect();
    };
    ScreenManager.prototype.resize = function () {
        var parent = this.canvas.parentNode;
        if (parent instanceof HTMLElement) {
            this.canvas.width = parent.offsetWidth;
            this.canvas.height = parent.offsetHeight;
        }
        else {
            console.error("Error handling resize event, canvas parent is not of type HtmlElement", parent);
        }
        (0, each_1.default)(this.activeScreen.entities, function (e) { return e.onResize(); });
    };
    ScreenManager.prototype.tick = function (delta) {
        (0, each_1.default)(this.activeScreen.entities, function (e) { return e.onTick(delta); });
    };
    ScreenManager.prototype.render = function () {
        (0, each_1.default)(this.activeScreen.entities, function (e) { return e.onRender(); });
    };
    ScreenManager.prototype.set = function (screenInstance) {
        this.cleanup();
        this.bootstrap(screenInstance);
    };
    ScreenManager.prototype.bootstrap = function (screenInstance) {
        this.activeScreen = screenInstance;
        this.activeScreen.setKiln(this.kiln);
        this.activeScreen.onCreate();
        this.initialized = true;
    };
    ScreenManager.prototype.cleanup = function () {
        if (this.initialized) {
            (0, each_1.default)(this.activeScreen.entities, function (entity) { return entity.destroy(); });
            this.activeScreen.onDestroy();
            delete this.activeScreen;
        }
    };
    ScreenManager.prototype.destroy = function () {
        window.removeEventListener('resize', this.resize);
        this.cleanup();
        delete instance[this.kiln];
    };
    return ScreenManager;
}());
exports.default = ScreenManager;
