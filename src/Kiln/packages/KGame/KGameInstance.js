import ScreenManager from "../KScreen/ScreenManager";
import LoopManager from "./Loop/LoopManager";

export default class KGameInstance {

    constructor(kilnName, bindElement, initialScreen) {
        this.name = kilnName;
        this._container = bindElement;
        this._canvas = document.createElement('canvas');
        this._container.appendChild(this._canvas);
        this._loopManager = new LoopManager(this.name, this._canvas, initialScreen);
        this._screenManager = new ScreenManager(this.name);
        this._loopManager.init();
    }

    setScreen(screen) {
        this._screenManager.set(screen);
    }

}