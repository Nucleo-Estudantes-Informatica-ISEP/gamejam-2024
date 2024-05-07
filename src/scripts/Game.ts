import type { Animation } from './Animation';
import type { GameObject } from './GameObject';
import { KeyboardHandler } from './KeyboardHandler';
import { LuckyBox } from './LuckyBox';
import { LuckyBoxAnimation } from './LuckyBoxAnimation';
import { Player } from './Player';

const GRAVITY = 0.005;

export class Game {
  players: Player[] = [];
  gameObjects: GameObject[] = [];
  animations: Animation[] = [];
  gravity: number = GRAVITY;
  isScrolling: boolean = false; // chromium fix again
  parentElement: HTMLElement;

  private ended: boolean = false;
  private onScrollEndHandler: (e: Event) => any;

  constructor(parent: HTMLElement) {
    this.parentElement = parent;

    this.players = [new Player(this, window.innerWidth / 10, 0, 96, new KeyboardHandler())];

    this.gameObjects = [
      new LuckyBox(this, window.innerWidth - window.innerWidth / 8, 240, 80),
      new LuckyBox(this, 320, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2, 240, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 2.5, 520, 80),
      new LuckyBox(this, window.innerWidth - window.innerWidth / 4.5, 520, 80)
    ];

    this.onScrollEndHandler = () => (this.isScrolling = false);
  }

  start() {
    [...this.players, ...this.gameObjects].forEach((o) => o.start());

    new LuckyBoxAnimation(this).start();

    window.addEventListener('scrollend', this.onScrollEndHandler);

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
    [...this.players, ...this.gameObjects].forEach((o) => o.update(delta));
    this.animations.forEach((o) => o._update(delta));
  }

  render() {
    [...this.players, ...this.gameObjects].forEach((o) => o.render());
  }

  end(): void {
    if (this.ended) return;
    this.ended = true;

    this.animations.forEach((o) => o.stop());
    [...this.players, ...this.gameObjects].forEach((o) => o.remove());
    window.removeEventListener('scrollend', this.onScrollEndHandler);
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
