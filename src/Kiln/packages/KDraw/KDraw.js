import ScreenManager from "../KScreen/ScreenManager";

let instanceMap = {};

export default class DrawUtil {

    //TODO: Find a way that you don't have to specify a kiln to get a Draw Object :/
    constructor(kiln) {
        if(instanceMap[kiln]) return instanceMap[kiln];
        instanceMap[kiln] = this;
        this._screenManager = new ScreenManager(kiln);
        this.ctx = this._screenManager.ctx;
    }

    getCtx(){
        return this.ctx;
    }

    resetCTX() {
        this.ctx.globalAlpha = 1;
        this.ctx.font = '30px Arial Black';
        this.ctx.textAlign = 'start';
        this.ctx.fillStyle = 'black';
    }

    square(x, y, width, height, color = 'red', alpha = 1) {
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.resetCTX();
    }

    text(text, x, y, color = '#208C30', fontSize = 30, alpha = 1, align = 'start')  {
        this.ctx.globalAlpha = 0.6;
        this.ctx.font = fontSize + 'px Arial Black';
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
        this.resetCTX();
    }

    image(img, x, y, h, w) {
        this.ctx.drawImage(img, x, y, w, h)
    }

}

