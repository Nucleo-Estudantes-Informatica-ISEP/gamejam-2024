import type { GameObject } from './gameobject';
import { KeyboardHandler } from './keyboardhandler';
import { InputState } from './inputstate';
import { LuckyBox } from './luckybox';
import { Player } from './player';

const GRAVITY = 0.005;

export class Game {
  player: Player;
  gameObjects: GameObject[] = [];
  gravity: number = GRAVITY;
  input: InputState;
  isScrolling: boolean = false; // chromium fix again

  constructor() {
    this.player = new Player(this, window.innerWidth / 10, 0, 96);

    // TODO: update
    const luckyboxes = [
      new LuckyBox(this, window.innerWidth - window.innerWidth / 8, 240, 80),
      new LuckyBox(this, 320, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2.5, 520, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 4, 520, 80)
    ];

    this.gameObjects.push(...luckyboxes);

    this.input = new InputState();

    new KeyboardHandler(this);

    window.addEventListener('scrollend', () => (this.isScrolling = false));
  }

  start() {
    const footer = document.getElementById('footer');
    [this.player, ...this.gameObjects].forEach((o) => {
      footer!.appendChild(o.htmlelement);
    });

    let lastframe = 0;

    const gameloop = (current: number) => {
      const delta = current - lastframe;
      lastframe = current;

      this.update(delta);
      this.render();
      window.requestAnimationFrame(gameloop);
    };

    window.requestAnimationFrame(gameloop);
  }

  update(delta: number) {
    [this.player, ...this.gameObjects].forEach((o) => o.update(delta));
  }

  render() {
    [this.player, ...this.gameObjects].forEach((o) => o.render());
  }
}
