import CanvasRenderer from './CanvasRenderer.js';
export default class CanvasItem {
    image;
    posX;
    posY;
    constructor() {
        this.image = new Image();
        this.posX = 0;
        this.posY = 0;
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getWidth() {
        return this.image.width;
    }
    getHeight() {
        return this.image.height;
    }
    isCollidingItem(item) {
        return (item.getPosX() < this.posX + this.image.width &&
            item.getPosX() + item.getWidth() > this.posX &&
            item.getPosY() < this.posY + this.image.height &&
            item.getPosY() + item.getHeight() > this.posY);
    }
    render(canvas) {
        CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
    }
}
//# sourceMappingURL=CanvasItem.js.map