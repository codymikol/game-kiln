import ScreenManager from "../../KScreen/ScreenManager";

let instanceMap = {};

export default class LoopManager {

   constructor(kiln, elem, initialScreen) {
       if(instanceMap[kiln]) return instanceMap[kiln];
       instanceMap[kiln] = this;
       this.name = kiln;
       this.initialized = false;
       this.MAX_FPS = 60;
       this.lastFrameTimeMs = 0;
       this.screenManager = new ScreenManager(kiln, elem, initialScreen);
       this.ctx = this.screenManager.getCtx();
   }

   loop(timestamp) {

       if (timestamp < this.lastFrameTimeMs + (1000 / this.MAX_FPS)) {
           requestAnimationFrame(this.loop.bind(this));
           return;
       }

       let delta = timestamp - this.lastFrameTimeMs;
       this.lastFrameTimeMs = timestamp;

       this.screenManager.tick(delta);
       this.ctx.clearRect(0, 0, this.screenManager.width, this.screenManager.height);
       this.screenManager.render();
       requestAnimationFrame(this.loop.bind(this));

   }

   init() {
       this.initialized = true;
       requestAnimationFrame(this.loop.bind(this))
   }

}