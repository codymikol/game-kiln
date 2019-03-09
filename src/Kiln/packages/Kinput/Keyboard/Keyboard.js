
let instance = null;

export default class Keyboard {

    constructor() {
        if(instance) return instance;
        instance = this;
        this.keyDown = {};
        this.bindKey = this.bindKey.bind(this);
        ['keyup', 'keydown'].forEach((e) => {window.addEventListener(e, this.bindKey)});
    }

    bindKey(e) {
        this.keyDown[e.key.toLowerCase()] = e.type[3] === 'd';
    }

    isDown(key) {
        return !!this.keyDown[key.toLowerCase()];
    }

    isUp(key) {
        return !this.isDown(key);
    }

}




