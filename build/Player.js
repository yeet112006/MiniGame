import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
export default class Player extends CanvasItem {
    speed;
    moovingLeft;
    moovingRight;
    moovingUp;
    moovingDown;
    maxX;
    maxY;
    constructor(maxX, maxY) {
        super();
        this.image = CanvasRenderer.loadNewImage('./assets/az.png');
        this.posX = 0 + this.image.width / 2;
        this.posY = 0 + this.image.height / 2;
        this.speed = 0.3;
        this.moovingLeft = false;
        this.moovingRight = false;
        this.moovingUp = false;
        this.moovingDown = false;
        this.maxX = maxX;
        this.maxY = maxY;
    }
    moveLeft() {
        this.moovingLeft = true;
    }
    moveRight() {
        this.moovingRight = true;
    }
    moveUp() {
        this.moovingUp = true;
    }
    moveDown() {
        this.moovingDown = true;
    }
    update(delta) {
        if (this.moovingLeft && (this.posX - this.speed) > 0) {
            this.posX -= delta * this.speed;
        }
        if (this.moovingRight && (this.posX + this.image.width + this.speed) < this.maxX) {
            this.posX += delta * this.speed;
        }
        if (this.moovingDown && (this.posY + this.image.height + this.speed) < this.maxY) {
            this.posY += delta * this.speed;
        }
        if (this.moovingUp && (this.posY - this.speed) > 0) {
            this.posY -= delta * this.speed;
        }
        this.moovingLeft = false;
        this.moovingRight = false;
        this.moovingDown = false;
        this.moovingUp = false;
    }
}
//# sourceMappingURL=Player.js.map