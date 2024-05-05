import type { GameObject } from './gameobject';
import { InputState } from './inputstate';
import { KeyboardHandler } from './keyboardhandler';
import { LuckyBox } from './luckybox';
import { Player } from './player';

const GRAVITY = 0.005;

export class Game {
  player: Player;
  gameObjects: GameObject[] = [];
  gravity: number = GRAVITY;
  input: InputState;
  isScrolling: boolean = false; // chromium fix again
  parentElement: HTMLElement;
  luckyboxes: LuckyBox[] = [];

  constructor(parent: HTMLElement) {
    this.parentElement = parent;

    this.player = new Player(this, window.innerWidth / 10, 0, 96);

    this.input = new InputState();

    this.player = new Player(this, window.innerWidth / 10, 0, 96);
    this.luckyboxes = [
      new LuckyBox(this, window.innerWidth - window.innerWidth / 8, 240, 80),
      new LuckyBox(this, 320, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2.5, 520, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 4.5, 520, 80)
    ];
    this.gameObjects.push(...this.luckyboxes);

    window.addEventListener('scrollend', () => (this.isScrolling = false));
  }

  start() {
    [this.player, ...this.gameObjects].forEach((o) => {
      this.parentElement.appendChild(o.htmlelement);
    });

    new KeyboardHandler(this);

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
