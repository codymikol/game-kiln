"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenManager_1 = require("../KScreen/ScreenManager");
var instanceMap = {};
var DrawUtil = /** @class */ (function () {
    function DrawUtil(kiln) {
        if (instanceMap[kiln])
            return instanceMap[kiln];
        instanceMap[kiln] = this;
        this._screenManager = new ScreenManager_1.default(kiln);
        this.ctx = this._screenManager.ctx;
    }
    DrawUtil.prototype.getCtx = function () {
        return this.ctx;
    };
    DrawUtil.prototype.resetCTX = function () {
        this.ctx.globalAlpha = 1;
        this.ctx.font = '30px Arial Black';
        this.ctx.textAlign = 'start';
        this.ctx.fillStyle = 'black';
    };
    DrawUtil.prototype.square = function (x, y, width, height, color, alpha) {
        if (color === void 0) { color = 'red'; }
        if (alpha === void 0) { alpha = 1; }
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.resetCTX();
    };
    DrawUtil.prototype.text = function (text, x, y, color, fontSize, alpha, align) {
        if (color === void 0) { color = '#208C30'; }
        if (fontSize === void 0) { fontSize = 30; }
        if (alpha === void 0) { alpha = 1; }
        if (align === void 0) { align = 'start'; }
        this.ctx.globalAlpha = 0.6;
        this.ctx.font = fontSize + 'px Arial Black';
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
        this.resetCTX();
    };
    DrawUtil.prototype.image = function (img, x, y, h, w) {
        this.ctx.drawImage(img, x, y, w, h);
    };
    return DrawUtil;
}());
exports.default = DrawUtil;
