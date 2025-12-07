import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Spider extends CanvasItem {
  public constructor(maxX: number, maxY:number) {
    super();
    this.posX = maxX;
    this.posY = Math.random() * maxY;
    this.image = CanvasRenderer.loadNewImage('./assets/spider.png');
  }

  /**
     * opopopopopo
     * @param delta number
     */
  public update(delta: number): void {
    this.posX -= delta * 0.2 ;
  }
}
