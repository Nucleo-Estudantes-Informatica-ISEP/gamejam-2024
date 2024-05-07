import type { Player } from './Player';

export abstract class InputHandler {
  target: Player;

  constructor(target: Player) {
    this.target = target;
  }

  abstract unregister(): void;
}
