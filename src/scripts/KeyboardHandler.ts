import { InputHandler } from './InputHandler';
import { LuckyBox } from './LuckyBox';
import type { Player } from './Player';

export class KeyboardHandler extends InputHandler {
  private onKeyUpHandle: (e: KeyboardEvent) => any;
  private onKeyDownHandle: (e: KeyboardEvent) => any;

  constructor(target: Player) {
    super(target);

    const handleInput = (event: KeyboardEvent, state: boolean) => {
      const inputState = this.target.input;
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
        case 'KeyH':
          event.preventDefault();
          inputState.left = state;
          break;

        case 'ArrowRight':
        case 'KeyD':
        case 'KeyL':
          event.preventDefault();
          inputState.right = state;
          break;

        case 'ArrowUp':
        case 'KeyW':
        case 'KeyK':
        case 'Space':
          event.preventDefault();
          inputState.up = state;
          break;

        case 'ArrowDown':
        case 'KeyS':
        case 'KeyJ':
          event.preventDefault();
          inputState.down = state;
          break;

        case 'KeyP':
          event.preventDefault();
          inputState.dev1 = state;
          break;

        case 'Equal':
          event.preventDefault();
          this.target.game.end();
          break;

        case 'KeyR':
          event.preventDefault();
          this.target.game.gameObjects
            .filter((o) => o instanceof LuckyBox)
            .forEach((o) => ((o as LuckyBox).isCollected = false));
          break;
      }
    };

    this.onKeyDownHandle = (e) => handleInput(e, true);
    this.onKeyUpHandle = (e) => handleInput(e, false);

    document.addEventListener('keydown', this.onKeyDownHandle);
    document.addEventListener('keyup', this.onKeyUpHandle);
  }

  unregister(): void {
    document.removeEventListener('keydown', this.onKeyDownHandle);
    document.removeEventListener('keyup', this.onKeyUpHandle);
  }
}
