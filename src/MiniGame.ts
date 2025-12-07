import CanvasRenderer from './CanvasRenderer.js';
import Game from './Game.js';

import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Prize from './Prize.js';
import Spider from './Spider.js';

export default class MiniGame extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private prize: Prize;

  private gameWon: boolean;

  private gameStarted: boolean;

  private spiders: Spider[];

  private timer: number;

  //private walls: Wall[];

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(canvas.width, canvas.height);
    this.prize = new Prize(canvas.width, canvas.height);
    this.gameWon = false;
    this.gameStarted = false;
    this.spiders = [];
    this.timer = 1500;
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
      this.gameStarted = true;
    }
    if (!this.gameStarted) {
      return;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param delta time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(delta: number): boolean {
    this.timer -= delta;
    if (this.timer <= 0) {
      for (let i: number = 0; i < 5; i++) {
        const nextSpider: Spider = new Spider(this.canvas.width, this.canvas.height);
        this.spiders.push(nextSpider);
      }
      this.timer = 1500;
    }
    this.player.update(delta);

    if (this.gameStarted) {
      this.spiders.forEach((spider: Spider) => {
        if(spider.isCollidingItem(this.player)){
          this.player = new Player(this.canvas.width, this.canvas.height);
        }
        spider.update(delta);
      });
    }
    if (this.player.isCollidingItem(this.prize)) {
      this.gameWon = true;
      return false;
    }
    return true;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.prize.render(this.canvas);
    this.player.render(this.canvas);
    if (!this.gameStarted) {
      CanvasRenderer.writeText(this.canvas, 'Press [SPACE] to Start', this.canvas.width / 2, this.canvas.height / 2 - 37, 'center', 'sans-serif', 36, 'white');
      CanvasRenderer.writeText(this.canvas, 'Use the arrow keys to move', this.canvas.width / 2, this.canvas.height / 2 + 12, 'center', 'sans-serif', 36, 'white');
      CanvasRenderer.writeText(this.canvas, 'Try to save Dari!!!', this.canvas.width / 2, this.canvas.height / 2 + 60, 'center', 'sans-serif', 36, 'white');
    }
    this.spiders.forEach((spider: Spider) => spider.render(this.canvas));
    if (this.gameWon) {
      CanvasRenderer.fillRectangle(this.canvas, (this.canvas.width - 650) / 2, (this.canvas.height - 120) / 2, 650, 100, 'purple');
      CanvasRenderer.writeText(this.canvas, 'Happy 4 Months Sweetheart ❤️', this.canvas.width / 2, this.canvas.height / 2, 'center', 'sans-serif', 40, 'pink');
    }
  }
}
