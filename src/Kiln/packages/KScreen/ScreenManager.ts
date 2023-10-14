import each from "lodash/each"
import KScreen from "./KScreen";
import KEntity from "../KEntity/KEntity";

let instance = {};

export default class ScreenManager {

    private readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    private initialized: boolean;
    private readonly kiln: string;
    activeScreen: KScreen;

    constructor(kiln: string, elem?: HTMLCanvasElement, initialScreen?: KScreen) {

        if (instance[kiln]) return instance[kiln];
        instance[kiln] = this;

        this.initialized = false;
        this.kiln = kiln;
        this.canvas = elem;
        this.ctx = elem.getContext('2d');

        this.set(initialScreen);
        this.resize = this.resize.bind(this);
        Object.defineProperty(this, 'height', {get: () => this.canvas.height});
        Object.defineProperty(this, 'width', {get: () => this.canvas.width});
        window.addEventListener('resize', this.resize);
        window.addEventListener('contextmenu', () => false);
        this.resize();

    }

    getCtx() {
        return this.ctx;
    }

    getCanvas() {
        return this.canvas;
    }

    getRect() {
        return this.getCanvas().getBoundingClientRect();
    }

    resize() {
        const parent = this.canvas.parentNode
        if(parent instanceof HTMLElement) {
            this.canvas.width = parent.offsetWidth;
            this.canvas.height = parent.offsetHeight;
        } else {
            console.error("Error handling resize event, canvas parent is not of type HtmlElement", parent)
        }
        each(this.activeScreen.entities, (e) => e.onResize());
    }

    tick(delta: number) {
        each(this.activeScreen.entities, (e) => e.onTick(delta));
    }

    render() {
        each(this.activeScreen.entities, (e) => e.onRender());
    }

    set(screenInstance: KScreen) {
        this.cleanup();
        this.bootstrap(screenInstance);
    }

    bootstrap(screenInstance: KScreen) {
        this.activeScreen = screenInstance;
        this.activeScreen.setKiln(this.kiln);
        this.activeScreen.onCreate();
        this.initialized = true;
    }

    cleanup() {
        if(this.initialized) {
            each(this.activeScreen.entities, (entity: KEntity) => entity.destroy());
            this.activeScreen.onDestroy();
            delete this.activeScreen;
        }
    }

    destroy() {
        window.removeEventListener('resize', this.resize);
        this.cleanup();
        delete instance[this.kiln];
    }

}