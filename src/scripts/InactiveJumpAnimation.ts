import { Animation } from './Animation';
import type { Game } from './Game';
import type { Player } from './Player';

const frequency = 10 * 1000;
const offset = 5 * 1000;

export class InactiveJumpAnimation extends Animation {
  target: Player;
  lastJumpTicking: number = offset - frequency;

  constructor(game: Game, target: Player) {
    super(game);
    this.target = target;
  }

  update(delta: number): void {
    if (this.target.hasMoved) return this.stop();

    const elapsed = this.ticking - this.lastJumpTicking;

    if (elapsed >= frequency) {
      this.lastJumpTicking = this.ticking;
      this.target.jump();
    }
  }
}
