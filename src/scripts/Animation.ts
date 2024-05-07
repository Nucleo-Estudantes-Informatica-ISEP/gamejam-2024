import type { Game } from './Game';

export abstract class Animation {
  game: Game;
  ticking: number = 0;

  constructor(game: Game) {
    this.game = game;
  }

  abstract update(delta: number): void;

  start(): void {
    this.game.animations.push(this);
  }

  stop(): void {
    this.game.animations = this.game.animations.filter((o) => o !== this);
  }

  _update(delta: number): void {
    this.ticking += delta;
    this.update(delta);
  }
}
