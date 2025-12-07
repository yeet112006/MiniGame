import CanvasRenderer from './CanvasRenderer.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  public constructor() {
    this.image = new Image();
    this.posX = 0;
    this.posY = 0;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  /**
   * checks for colilision
   * @param item item
   * @returns true or false
   */
  public isCollidingItem(item: CanvasItem): boolean {
    return (item.getPosX() < this.posX + this.image.width &&
      item.getPosX() + item.getWidth() > this.posX &&
      item.getPosY() < this.posY + this.image.height &&
      item.getPosY() + item.getHeight() > this.posY);
  }

  /**
   * renders
   * @param canvas canvas
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
