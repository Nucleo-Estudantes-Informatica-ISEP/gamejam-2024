import { Game } from './Game';

function main() {
  const parent = document.getElementById('footer');
  if (!parent) return;

  const game = new Game(parent);

  game.start();
}

main();
