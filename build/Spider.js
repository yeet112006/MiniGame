import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
export default class Spider extends CanvasItem {
    constructor(maxX, maxY) {
        super();
        this.posX = maxX;
        this.posY = Math.random() * maxY;
        this.image = CanvasRenderer.loadNewImage('./assets/spider.png');
    }
    update(delta) {
        this.posX -= delta * 0.2;
    }
}
//# sourceMappingURL=Spider.js.map