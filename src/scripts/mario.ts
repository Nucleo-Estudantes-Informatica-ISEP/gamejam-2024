import { Game } from './game';

const parent = document.getElementById("footer");
if (!parent) return;

const game = new Game(parent);

game.start();
