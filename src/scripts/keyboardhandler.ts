import type { Game } from './game';
import { InputHandler } from './inputhandler';

export class KeyboardHandler extends InputHandler {
  private handleInput: (event: KeyboardEvent, state: boolean) => any;

  constructor(game: Game) {
    super(game);

    this.handleInput = (event: KeyboardEvent, state: boolean) => {
      const inputState = this.game.input;
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
      }
    };

    document.addEventListener('keydown', (e) => this.handleInput(e, true));
    document.addEventListener('keyup', (e) => this.handleInput(e, false));
  }

  unregister(): void {
    document.removeEventListener('keydown', (e) => this.handleInput(e, true));
    document.removeEventListener('keyup', (e) => this.handleInput(e, false));
  }
}
