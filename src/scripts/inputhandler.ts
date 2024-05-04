import type { Game } from './game';

export abstract class InputHandler {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  
  abstract unregister(): void;
}
