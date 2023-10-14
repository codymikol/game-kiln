import ScreenManager from "../KScreen/ScreenManager";

let instanceMap = {};

export default class DrawUtil {

    //TODO: Find a way that you don't have to specify a kiln to get a Draw Object :/
    private _screenManager: ScreenManager;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(kiln: string) {
        if (instanceMap[kiln]) return instanceMap[kiln];
        instanceMap[kiln] = this;
        this._screenManager = new ScreenManager(kiln);
        this.ctx = this._screenManager.ctx;
    }

    getCtx() {
        return this.ctx;
    }

    resetCTX() {
        this.ctx.globalAlpha = 1;
        this.ctx.font = '30px Arial Black';
        this.ctx.textAlign = 'start';
        this.ctx.fillStyle = 'black';
    }

    square(x: number, y: number, width: number, height: number, color = 'red', alpha = 1) {
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.resetCTX();
    }

    text(text: string, x: number, y: number, color = '#208C30', fontSize = 30, alpha = 1, align: CanvasTextAlign = 'start') {
        this.ctx.globalAlpha = 0.6;
        this.ctx.font = fontSize + 'px Arial Black';
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
        this.resetCTX();
    }

    image(img: HTMLImageElement, x: number, y: number, h: number, w: number) {
        this.ctx.drawImage(img, x, y, w, h)
    }

}

