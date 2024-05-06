import type { Game } from './Game';

export abstract class InputHandler {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  abstract unregister(): void;
}
