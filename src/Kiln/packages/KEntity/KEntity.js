import Mouse from "./Input/Mouse/Mouse";
import ScreenManager from "../KScreen/ScreenManager";
import EntityManager from "./EntityManager";
import noop from "lodash/noop"

//TODO: This really does not belong here... :/
function mouseInBounds(x, y, height, width, mouseX, mouseY) {
    return mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height;
}

export default class KEntity {
    constructor(x, y, height, width) {
        this.kiln = null;
        this.id = new EntityManager().getNextEntityId();
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.hovered = false;
        this._intervalList = [];
        this._timeoutList = [];
        this._childEntities = [];
        this.onTick = noop;
        this.onRender = noop;
        this.onResize = noop;
        this.onDestroy = noop;
        this.onCreate = noop;
        this.setKiln = function (kiln) {
            this.kiln = kiln;
            this.mouse = new Mouse(kiln);
        };
        this._anyclick = function () {
            if (this.onAnyClick) this.onAnyClick();
        };
        this._click = function () {
            if (this.hovered && this.onClick) this.onClick();
        };
        this._mousemove = function () {
            if (this.onMouseMove) this.onMouseMove();
        };
       this.interval = function (fn, interval) {
            this._intervalList.push(setInterval(fn.bind(this), interval));
        };
        this.timeout = function (fn, timeout) {
            this._timeoutList.push(setTimeout(fn.bind(this), timeout))
        };
        this.add = function (child) {
            //TODO: Children are linked before the root is added to the screen :(
            //TODO: I want to add one way binding to child entities :)
            this._screenManager = this._screenManager || new ScreenManager(this.kiln);
            this._screenManager.activeScreen.add(child);
            this._childEntities.push(child);
        };
        this.destroy = function () {
            this.onDestroy();
            this._childEntities.forEach((x) => x.destroy());
            this._intervalList.forEach((x) => clearInterval(x));
            this._timeoutList.forEach((x) => clearTimeout(x));
            window.removeEventListener('click', this.handleClick);
            window.removeEventListener('mousemove', this.handleMouseMove);
            if(this._parent) this._parent.delete(this.id);
        };
        this.setParent = function(parent) {
            this._parent = parent;
        };

        let self = this;

        this.handleClick = function () {
            self._anyclick();
            self._click();
        };

        window.addEventListener('click', this.handleClick.bind(this));

        this.handleMouseMove = function () {
            self.hovered = mouseInBounds(self.x, self.y, self.height, self.width, this.mouse.x, this.mouse.y);
            self._mousemove();
        };

        window.addEventListener('mousemove', this.handleMouseMove.bind(this));

    }

}