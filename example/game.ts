import KEntity from "../src/Kiln/packages/KEntity/KEntity";
import KDraw from "../src/Kiln/packages/KDraw/KDraw";
import KInput from "../src/Kiln/packages/Kinput/KInput";
import KScreen from "../src/Kiln/packages/KScreen/KScreen";
import {createKGame} from "../src/Kiln/packages/KGame/KGame";
import DrawUtil from "../src/Kiln/packages/KDraw/KDraw";
import Keyboard from "../src/Kiln/packages/Kinput/Keyboard/Keyboard";
import Mouse from "../src/Kiln/packages/Kinput/Mouse/Mouse";

class SpinnyEmitter extends KEntity {

    private xVel: number;
    private yVel: number;
    private brush: DrawUtil;

    constructor(x: number, y: number) {
        super(x, y, 50, 50);
        this.xVel = 5;
        this.yVel = 5;
        this.brush = new KDraw('pong');
    }

    onCreate = () => {

        this.interval(() => this.add(new Spinny(this.x, this.y, this)), 30);

        this.interval(() => {
            this.x += this.xVel;
            if (this.x < 100 || this.x > 1000) this.xVel = this.xVel * -1;
        }, 1);

        this.interval(() => {
            this.y += this.yVel;
            if (this.y < 100 || this.y > 1000) this.yVel = this.yVel * -1;
        }, 1);

    };

    onRender = () => {
        this.brush.square(this.x, this.y, this.width, this.height, 'red');
    };

}

class Spinny extends KEntity {

    private parentEmitter: SpinnyEmitter;
    private time: number;
    private _startingX: number;
    private _startingY: number;
    private wobbleRotation: number;
    private readonly speed: number;
    private coolColor: string;
    private _keyboard: Keyboard;
    private _mouse: Mouse;

    constructor(x: number, y: number, parentEmitter: SpinnyEmitter) {
        super(x, y, 35, 145);
        this.parentEmitter = parentEmitter;
        this.time = 0;
        this._startingX = x;
        this._startingY = y;
        this.wobbleRotation = 80;
        this.speed = .1;
        this.coolColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this._keyboard = new KInput.Keyboard();

        this._mouse = new KInput.Mouse('pong');

        this._keyboard.onDown('e', () => {
            this.coolColor = 'grey';
        });

        this._keyboard.onUp('e', () => {
            this.coolColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        });

        this._mouse.onDown(this, () => this.parentEmitter.add(new SpinnyEmitter(this.x, this.y)));
    }

    onCreate = () => {

        this.interval(() => {
            if (this.wobbleRotation === 36001) this.wobbleRotation = 0;
            this.wobbleRotation++;
        }, 20);

    };

    onRender = () => {
        let brush = new KDraw('pong');
        brush.square(this.x, this.y, this.width, this.height, this.coolColor);
    };

    onTick = () => {

        this.time++;

        if (this.time > 300) {
            this.destroy();
        }

        if (this._keyboard.isDown('d')) this._startingX += 5;
        if (this._keyboard.isDown('a')) this._startingX -= 5;
        if (this._keyboard.isDown('s')) this._startingY += 5;
        if (this._keyboard.isDown('w')) this._startingY -= 5;

        if (this._mouse.isHovered(this)) this.coolColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

        this.time++;
        this.x = this._startingX + (this.speed * Math.cos(this.wobbleRotation * Math.PI / 180) * this.time);
        this.y = this._startingY + (this.speed * Math.sin(this.wobbleRotation * Math.PI / 180) * this.time);
    };

}

class Button extends KEntity {
    private mouse: Mouse;
    private keyboard: Keyboard;

    constructor(x: number, y: number) {
        super(x, y, 100, 100);
        this.mouse = new KInput.Mouse('pong');
        this.keyboard = new KInput.Keyboard();
        this.mouse.onDown(this, () => {
            alert('hit me');
        });
        this.keyboard.onDown('d', () => this.x += 5);
        this.keyboard.onDown('w', () => this.y += 5);
    }

    onRender = () => {
        let brush = new KDraw('pong');
        brush.square(this.x, this.y, this.width, this.height, this.mouse.isHovered(this) ? 'green' : 'purple');
    }

}

class MenuScreen extends KScreen {

    constructor() {
        super();
    }

    onCreate() {
        this.add(new Button(200, 200));
        this.add(new SpinnyEmitter(1000, 500));
    }

}


window.onload = function () {
    const container = document.getElementById('game')
    if(container) {
        createKGame('pong', container, new MenuScreen());
    }
};

