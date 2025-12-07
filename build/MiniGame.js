import CanvasRenderer from './CanvasRenderer.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Prize from './Prize.js';
import Spider from './Spider.js';
export default class MiniGame extends Game {
    canvas;
    keyListener;
    player;
    prize;
    gameWon;
    gameStarted;
    spiders;
    timer;
    constructor(canvas) {
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
        this.timer = 2000;
    }
    processInput() {
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
    update(delta) {
        this.timer -= delta;
        if (this.timer <= 0) {
            for (let i = 0; i < 4; i++) {
                const nextSpider = new Spider(this.canvas.width, this.canvas.height);
                this.spiders.push(nextSpider);
            }
            this.timer = 2000;
        }
        this.player.update(delta);
        if (this.gameStarted) {
            this.spiders.forEach((spider) => {
                if (spider.isCollidingItem(this.player)) {
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
    render() {
        CanvasRenderer.clearCanvas(this.canvas);
        this.prize.render(this.canvas);
        this.player.render(this.canvas);
        if (!this.gameStarted) {
            CanvasRenderer.writeText(this.canvas, 'Press [SPACE] to Start', this.canvas.width / 2, this.canvas.height / 2 - 37, 'center', 'sans-serif', 36, 'white');
            CanvasRenderer.writeText(this.canvas, 'Use the arrow keys to move', this.canvas.width / 2, this.canvas.height / 2 + 12, 'center', 'sans-serif', 36, 'white');
            CanvasRenderer.writeText(this.canvas, 'Try to save Dari!!!', this.canvas.width / 2, this.canvas.height / 2 + 60, 'center', 'sans-serif', 36, 'white');
        }
        this.spiders.forEach((spider) => spider.render(this.canvas));
        if (this.gameWon) {
            CanvasRenderer.fillRectangle(this.canvas, (this.canvas.width - 650) / 2, (this.canvas.height - 120) / 2, 650, 100, 'purple');
            CanvasRenderer.writeText(this.canvas, 'Happy 4 Months Sweetheart ❤️', this.canvas.width / 2, this.canvas.height / 2, 'center', 'sans-serif', 40, 'pink');
        }
    }
}
//# sourceMappingURL=MiniGame.js.map