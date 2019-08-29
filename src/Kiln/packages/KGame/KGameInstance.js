import ScreenManager from "../KScreen/ScreenManager";

export default class KGameInstance {

    constructor(kilnName, bindElement, initialScreen, gameLoop) {
        this.name = kilnName;
        this._element = bindElement;
        this._loopManager = gameLoop;
        this._screenManager = new ScreenManager(this.name);
        this._loopManager.init();
    }

    setScreen(screen) {
        this._screenManager.set(screen);
    }

}