import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player extends CanvasItem {
  private speed: number;

  private moovingLeft: boolean;

  private moovingRight: boolean;

  private moovingUp: boolean;

  private moovingDown: boolean;

  private maxX: number;

  private maxY: number;

  public constructor(maxX: number, maxY: number) {
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

  /**
    * Sets a flag if moving left
    */
  public moveLeft(): void {
    this.moovingLeft = true;
  }

  /**
   * Sets a flag if moving right
   */
  public moveRight(): void {
    this.moovingRight = true;
  }

  /**
   * Sets a flag if moving right
   */
  public moveUp(): void {
    this.moovingUp = true;
  }

  /**
   * Sets a flag if moving right
   */
  public moveDown(): void {
    this.moovingDown = true;
  }

  /**
   * updates
   * @param delta ms
   */
  public update(delta: number): void {
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
