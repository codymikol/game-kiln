import Draw from "../Draw/Draw";
import ScreenManager from "../Screen/ScreenManager";

let instance = null;

export default class Loop {

   constructor(){
       if(instance) return instance;
       instance = this;
       this.MAX_FPS = 60;
       this.ctx = Draw.getCtx();
       this.lastFrameTimeMs = 0;
       this.screenManager = new ScreenManager()
   }

   loop(timestamp) {
       if (timestamp < this.lastFrameTimeMs + (1000 / this.MAX_FPS)) {
           requestAnimationFrame(this.loop.bind(this));
           return;
       }

       let delta = timestamp - this.lastFrameTimeMs;
       this.lastFrameTimeMs = timestamp;

       this.screenManager.tick(delta);
       this.ctx.clearRect(0, 0, ScreenManager.width, ScreenManager.height);
       this.screenManager.render();
       requestAnimationFrame(this.loop.bind(this));

   }

   init() {
       requestAnimationFrame(this.loop.bind(this))
   }

}