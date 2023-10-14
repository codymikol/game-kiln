import KEntity from "../Kiln/packages/KEntity/KEntity";
import Draw from "../Kiln/packages/KDraw/KDraw";

export default class Sprite extends KEntity {
    private h: number;
    private w: number;
    private loaded: boolean;
    private readonly image: HTMLImageElement;
    private render: () => void;

    constructor(src: string, x: number, y:number, h: number, w: number) {
        super(x, y, h, w);
        this.loaded = false;
        this.image = new Image();
        this.image.onload = () => this.loaded = true;
        this.image.src = src;
        // todo(mikol): This would never actually work...
        // this.render = () => Draw.image(this.image, this.x, this.y, this.height, this.width)
    }

}