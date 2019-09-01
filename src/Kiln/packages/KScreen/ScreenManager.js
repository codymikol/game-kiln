import each from "lodash/each"

let instance = {};

export default class ScreenManager {

    constructor(kiln, elem, initialScreen) {

        if (instance[kiln]) return instance[kiln];
        instance[kiln] = this;

        this.initialized = false;
        this.kiln = kiln;
        this.canvas = elem;
        this.ctx = elem.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.set(initialScreen);

        Object.defineProperty(this, 'height', {get: () => this.canvas.height});
        Object.defineProperty(this, 'width', {get: () => this.canvas.width});

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.resize();
        });

        window.addEventListener('contextmenu', () => false);

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
        each(this.activeScreen.entities, (e) => e.onResize());
    }

    tick(delta) {
        each(this.activeScreen.entities, (e) => e.onTick(delta));
    }

    render() {
        each(this.activeScreen.entities, (e) => e.onRender());
    }

    set(screenInstance) {
        this.cleanup();
        this.bootstrap(screenInstance);
    }

    bootstrap(screenInstance) {
        this.activeScreen = screenInstance;
        this.activeScreen.setKiln(this.kiln);
        this.activeScreen.onCreate();
        this.initialized = true;
    }

    cleanup() {
        if(this.initialized) {
            each(this.activeScreen.entities, (entity) => entity.destroy());
            this.activeScreen.onDestroy();
            delete this.activeScreen;
        }
    }

}