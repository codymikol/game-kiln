import ScreenManager from "../KScreen/ScreenManager";
import EntityManager from "./EntityManager";
import noop from "lodash/noop"
import {KScreen} from "../../../index";

export default class KEntity {

    private kiln: string | null;
    public id: number;
    public x: number;
    public y: number;
    public height: number;
    public width: number;

    public onTick: (delta: number) => void;
    public onRender: () => void;
    public onResize: () => void;
    public onDestroy: () => void;
    public onCreate: () => void;

    private _screenManager: ScreenManager;
    private _parent: KScreen | KEntity;
    private _intervalList: any[];
    private _timeoutList: any[];
    private _childEntities: KEntity[];

    constructor(x: number, y: number, height: number, width: number) {
        this.kiln = null;
        this.id = new EntityManager().getNextEntityId();
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this._intervalList = [];
        this._timeoutList = [];
        this._childEntities = [];
        this.onTick = noop;
        this.onRender = noop;
        this.onResize = noop;
        this.onDestroy = noop;
        this.onCreate = noop;

    }

    setKiln(kiln: string) {
        this.kiln = kiln;
    };
    interval(fn: () => void, interval: number) {
        this._intervalList.push(setInterval(fn.bind(this), interval));
    };
    timeout(fn: () => void, timeout: number) {
        this._timeoutList.push(setTimeout(fn.bind(this), timeout))
    };
    add(child: KEntity) {
        child.setKiln(this.kiln);
        child.setParent(this);
        this._addToScreenManager(child);
        this._childEntities.push(child);
    };
    destroy() {
        this.onDestroy();
        this._childEntities.forEach((x) => x.destroy());
        this._intervalList.forEach((x) => clearInterval(x));
        this._timeoutList.forEach((x) => clearTimeout(x));
        if(this._parent && this._parent instanceof KScreen) this._parent.delete(this.id);
    };
    setParent = function(parent: KScreen | KEntity) {
        this._parent = parent;
    };
    _addToScreenManager(child) {
        this._screenManager = this._screenManager || new ScreenManager(this.kiln);
        this._screenManager.activeScreen.add(child);
    }

}