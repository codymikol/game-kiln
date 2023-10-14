import ScreenManager from "../../KScreen/ScreenManager";

let instanceMap = {};

export default class LoopManager {
    private paused: boolean;
    private stopped: boolean;
    private name: any;
    private initialized: boolean;
    private MAX_FPS: number;
    private lastFrameTimeMs: number;
    screenManager: ScreenManager;
    private ctx: CanvasRenderingContext2D;

   constructor(kiln, elem, initialScreen) {
       if(instanceMap[kiln]) return instanceMap[kiln];
       instanceMap[kiln] = this;
       this.paused = false;
       this.stopped = false;
       this.name = kiln;
       this.initialized = false;
       this.MAX_FPS = 60;
       this.lastFrameTimeMs = 0;
       this.screenManager = new ScreenManager(kiln, elem, initialScreen);
       this.ctx = this.screenManager.getCtx();
       this.loop = this.loop.bind(this);
   }

   _togglePause() {
       this.paused = !this.paused;
   }

   _stop() {
       this.stopped = true;
       delete instanceMap[this.name];
   }

   loop(timestamp) {

       if(this.stopped) {
           return;
       }

       if(this.paused) {
           this.lastFrameTimeMs = timestamp;
           return void requestAnimationFrame(this.loop);
       }

       if (timestamp < this.lastFrameTimeMs + (1000 / this.MAX_FPS)) {
           return void requestAnimationFrame(this.loop);
       }

       let delta = timestamp - this.lastFrameTimeMs;
       this.lastFrameTimeMs = timestamp;

       this.screenManager.tick(delta);
       this.ctx.clearRect(0, 0, this.screenManager.getCanvas().width, this.screenManager.getCanvas().height);
       this.screenManager.render();
       requestAnimationFrame(this.loop);

   }

   init() {
       this.initialized = true;
       requestAnimationFrame(this.loop)
   }

}