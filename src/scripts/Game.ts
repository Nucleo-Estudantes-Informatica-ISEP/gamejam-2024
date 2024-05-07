import type { Animation } from './Animation';
import type { GameObject } from './GameObject';
import type { InputHandler } from './InputHandler';
import { InputState } from './InputState';
import { KeyboardHandler } from './KeyboardHandler';
import { LuckyBox } from './LuckyBox';
import { LuckyBoxAnimation } from './LuckyBoxAnimation';
import { Player } from './Player';

const GRAVITY = 0.005;

export class Game {
  player: Player;
  gameObjects: GameObject[] = [];
  animations: Animation[] = [];
  inputHandlers: InputHandler[] = [];
  gravity: number = GRAVITY;
  input: InputState;
  isScrolling: boolean = false; // chromium fix again
  parentElement: HTMLElement;

  private ended: boolean = false;
  private onScrollEndHandler: (e: Event) => any;

  constructor(parent: HTMLElement) {
    this.parentElement = parent;

    this.player = new Player(this, window.innerWidth / 10, 0, 96);

    this.input = new InputState();

    const luckyboxes = [
      new LuckyBox(this, window.innerWidth - window.innerWidth / 8, 240, 80),
      new LuckyBox(this, 320, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2.5, 520, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 4.5, 520, 80)
    ];
    this.gameObjects.push(...luckyboxes);

    this.onScrollEndHandler = () => (this.isScrolling = false);

    window.addEventListener('scrollend', this.onScrollEndHandler);
  }

  start() {
    [this.player, ...this.gameObjects].forEach((o) => o.start());

    this.inputHandlers.push(new KeyboardHandler(this));

    new LuckyBoxAnimation(this).start();

    let lastframe = 0;

    const gameloop = (current: number) => {
      const delta = current - lastframe;
      lastframe = current;

      if (this.ended) return;

      this.update(delta);
      this.render();
      window.requestAnimationFrame(gameloop);
    };

    window.requestAnimationFrame(gameloop);
  }

  update(delta: number) {
    [this.player, ...this.gameObjects].forEach((o) => o.update(delta));
    this.animations.forEach((o) => o._update(delta));
  }

  render() {
    [this.player, ...this.gameObjects].forEach((o) => o.render());
  }

  end(): void {
    if (this.ended) return;
    this.ended = true;

    this.inputHandlers.forEach((o) => o.unregister());
    this.animations.forEach((o) => o.stop());
    [this.player, ...this.gameObjects].forEach((o) => o.remove());
    console.log('Game ended.');
  }

  snake() {
    document.body.style.animation = 'shake 1.5s';

    setTimeout(() => {
      window.location.href = '/snake';
      // this time is a little bit shorter than the shake animation to prevent some time gap
    }, 1200);
  }
}
