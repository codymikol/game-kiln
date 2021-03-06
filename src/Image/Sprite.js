import KEntity from "../Kiln/packages/KEntity/KEntity";
import Draw from "../Kiln/packages/KDraw/KDraw";

export default class Sprite extends KEntity {

    constructor(src, x, y, h, w) {
        super();
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.loaded = false;
        this.image = new Image();
        this.image.onload = () => this.loaded = true;
        this.image.src = src;
        this.render = () => Draw.image(this.image, this.x, this.y, this.height, this.width)
    }

}