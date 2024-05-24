import type { Player } from './Player';

export abstract class InputHandler {
  abstract register(target: Player): void;
  abstract unregister(): void;
}
