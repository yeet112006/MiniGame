import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
export default class Prize extends CanvasItem {
    constructor(maxX, maxY) {
        super();
        this.image = CanvasRenderer.loadNewImage('./assets/dari.png');
        this.posX = maxX - this.image.width * 2;
        this.posY = maxY / 2 - this.image.height / 2;
    }
}
//# sourceMappingURL=Prize.js.map