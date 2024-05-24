import { Animation } from './Animation';
import type { Game } from './Game';
import { LuckyBox } from './LuckyBox';

const sprites = [
  '/sprites/luckybox/default-0.png',
  '/sprites/luckybox/default-1.png',
  '/sprites/luckybox/default-2.png',
  '/sprites/luckybox/default-3.png'
];

export class LuckyBoxAnimation extends Animation {
  constructor(game: Game) {
    super(game);
  }

  update(delta: number): void {
    const curr = Math.floor((this.ticking / 150) % 6);
    const i = curr < 3 ? 0 : curr === 5 ? 1 : curr - 2;

    this.game.gameObjects
      .filter((o) => o instanceof LuckyBox && !o.isCollected)
      .forEach((o) => (o.sprite = sprites[i]));
  }
}
