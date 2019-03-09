import ScreenManager from "../../../KScreen/ScreenManager";

let instanceMap = {};

export default class Mouse {

    constructor(kiln) {

        if(instanceMap[kiln]) return instanceMap[kiln];
        instanceMap[kiln] = this;

        this.kiln = kiln;
        this._screenManager = new ScreenManager(this.kiln);

        this.mousePos = {
            x:0,
            y:0
        };

        window.addEventListener('mousemove', (e) => {
            let rect = this._screenManager.getRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        })

    }

    get x() {
        return this.mousePos.x;
    }

    get y() {
        return this.mousePos.y;
    }


}