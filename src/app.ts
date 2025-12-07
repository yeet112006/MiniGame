import MiniGame from './MiniGame.js';

const game: MiniGame = new MiniGame(document.getElementById('game') as HTMLCanvasElement);

window.addEventListener('load', () => {
  game.start();
});
