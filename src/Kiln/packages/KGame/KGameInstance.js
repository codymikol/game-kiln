import ScreenManager from "../KScreen/ScreenManager";
import LoopManager from "./Loop/LoopManager";

export default class KGameInstance {

    constructor(kilnName, bindElement, initialScreen, parentStore) {
        this.name = kilnName;
        this.destroyed = false;
        this._parentStore = parentStore;
        this._container = bindElement;
        this._canvas = document.createElement('canvas');
        this._container.appendChild(this._canvas);
        this._loopManager = new LoopManager(this.name, this._canvas, initialScreen);
        this._screenManager = new ScreenManager(this.name);
        this._loopManager.init();
    }

    destroy() {
        if(this.destroyed) {
            console.error(`Error: Trying to destroy ${this.name}, but it has already been destroyed!`);
            return;
        }
        this._loopManager._stop();
        this._canvas.parentElement.removeChild(this._canvas);
        delete this._parentStore[this.name];
        this.destroyed = true;
    }

    setScreen(screen) {
        this._screenManager.set(screen);
    }

}