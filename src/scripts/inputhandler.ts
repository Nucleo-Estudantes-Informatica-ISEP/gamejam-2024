export class InputHandler {
  up: boolean = false;
  down: boolean = false;
  left: boolean = false;
  right: boolean = false;
  dev1: boolean = false;

  constructor() {
    const handleInput = (event: KeyboardEvent, state: boolean) => {
      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
        case 'KeyH':
          event.preventDefault();
          this.left = state;
          break;

        case 'ArrowRight':
        case 'KeyD':
        case 'KeyL':
          event.preventDefault();
          this.right = state;
          break;

        case 'ArrowUp':
        case 'KeyW':
        case 'KeyK':
        case 'Space':
          event.preventDefault();
          this.up = state;
          break;

        case 'ArrowDown':
        case 'KeyS':
        case 'KeyJ':
          event.preventDefault();
          this.down = state;
          break;

        case 'KeyP':
          event.preventDefault();
          this.dev1 = state;
          break;
      }
    };

    document.addEventListener('keydown', (e) => handleInput(e, true));
    document.addEventListener('keyup', (e) => handleInput(e, false));
  }
}
