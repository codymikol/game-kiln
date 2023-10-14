import ScreenManager from "../KScreen/ScreenManager";
import LoopManager from "./Loop/LoopManager";
import {KScreen} from "../../../index";

export default class KGameInstance {
    private readonly name: string;
    private readonly _parentStore: any; // todo(mikol): What is dis
    private readonly _canvas: HTMLCanvasElement;
    private destroyed: boolean;
    private _container: HTMLElement;
    private _loopManager: LoopManager;
    private _screenManager: ScreenManager;

    constructor(kilnName: string, bindElement: HTMLElement, initialScreen: KScreen, parentStore) {
        this.name = kilnName;
        this.destroyed = false;
        this._parentStore = parentStore;
        this._container = bindElement;
        this._canvas = document.createElement('canvas');
        this._container.appendChild(this._canvas);
        this._loopManager = new LoopManager(this.name, this._canvas, initialScreen);
        this._screenManager = this._loopManager.screenManager;
        this._loopManager.init();
    }

    destroy() {
        if(this.destroyed) return void console.error(`Error: Trying to destroy ${this.name}, but it has already been destroyed!`);
        this._screenManager.destroy();
        this._loopManager._stop();
        this._canvas.parentElement.removeChild(this._canvas);
        delete this._parentStore[this.name];
        this.destroyed = true;
    }

    setScreen(screen) {
        this._screenManager.set(screen);
    }

}