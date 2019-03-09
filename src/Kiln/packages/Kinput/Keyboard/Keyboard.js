
let instance = null;

export default class Keyboard {

    constructor() {
        if(instance) return instance;
        instance = this;
        this.keyDown = {};
        ['keyup', 'keydown'].forEach((e) => {window.addEventListener(e, this.bindKey.bind(this))});
    }

    bindKey(e) {
        this.keyDown[e.key.toLowerCase()] = e.type[3] === 'd';
    }

    isDown(key) {
        return this.keyDown[key.toLowerCase()];
    }

    isUp(key) {
        return !this.isDown(key);
    }

}




