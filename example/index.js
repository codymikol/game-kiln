class SpinnyEmitter extends Kiln.Entity {

    constructor(x, y) {
        super(x, y);
        this.height = 50;
        this.width = 50;
        this.xVel = 5;
        this.yVel = 5;
        this.brush = new Kiln.Draw('pong');
        this.ctx = this.brush.getCtx();
    }

    onCreate = () => {

        this.interval(function () {
            this.add(new Spinny(this.x, this.y));
        }.bind(this), 250);

        this.interval(function () {
            this.x += this.xVel;
            if (this.x < 100 || this.x > 1000) this.xVel = this.xVel * -1;
        }.bind(this));

        this.interval(function () {
            this.y += this.yVel;
            if (this.y < 100 || this.y > 1000) this.yVel = this.yVel * -1;
        }.bind(this));

    };

    render() {
        this.brush.square(this.x, this.y, this.width, this.height, 'red');
    }

}

class Spinny extends Kiln.Entity {

    constructor(x, y) {
        super(x, y);
        this.height = 25;
        this.width = 145;
        this.time = 0;
        this._startingX = x;
        this._startingY = y;
        this.wobbleRotation = 80;
        this.speed = .1;
        this.coolColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this._keyboard = new Kiln.Input.Keyboard();
    }

    onCreate = () => {

        this.interval(function () {
            if (this.wobbleRotation === 361) this.wobbleRotation = 0;
            this.wobbleRotation++;
        }.bind(this), 20);

    };

    render() {
        let brush = new Kiln.Draw('pong');
        brush.square(this.x, this.y, this.width, this.height, this.coolColor);
    }

    onTick() {

        if(this._keyboard.isDown('d')) this._startingX+=5;
        if(this._keyboard.isDown('a')) this._startingX-=5;
        if(this._keyboard.isDown('s')) this._startingY+=5;
        if(this._keyboard.isDown('w')) this._startingY-=5;

        if (this.hovered) this.coolColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

        this.time++;
        this.x = this._startingX + (this.speed * Math.cos(this.wobbleRotation * Math.PI / 180) * this.time);
        this.y = this._startingY + (this.speed * Math.sin(this.wobbleRotation * Math.PI / 180) * this.time);
    }

    onClick = () => {
        this.add(new SpinnyEmitter(this.x, this.y))
    };



}

class MenuScreen extends Kiln.Screen {

    constructor() {
        super();
    }

    onCreate() {
        this.add(new SpinnyEmitter(1000, 500));
    }

}

window.onload = function () {
    Kiln.Game('pong', document.getElementById('game'), new MenuScreen());
};

