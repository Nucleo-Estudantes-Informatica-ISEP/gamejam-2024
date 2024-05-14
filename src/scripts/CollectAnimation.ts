import { Animation } from './Animation';
import { Coin } from './Coin';
import type { Game } from './Game';
import type { LuckyBox } from './LuckyBox';

const sprites = [
  '/sprites/coin/default-0.png',
  '/sprites/coin/default-1.png',
  '/sprites/coin/default-2.png',
  '/sprites/coin/default-3.png'
];

const coinAnimation = {
  duration: 750,
  jumpDistance: 256
};

const boxAnimation = {
  duration: 250,
  jumpDistance: 12
};

export class CollectAnimation extends Animation {
  target: LuckyBox;
  coin: Coin;

  constructor(game: Game, target: LuckyBox) {
    super(game);
    this.target = target;
    this.coin = new Coin(this.game, target.pos.x, target.pos.y, target.width);

    this.game.gameObjects.push(this.coin);
    this.coin.start();
  }

  update(delta: number): void {
    if (this.ticking >= coinAnimation.duration) {
      this.coin.remove();
      return this.stop();
    }

    const i = Math.floor((this.ticking / 100) % 4);
    this.coin.sprite = sprites[i];

    // coin
    const movementPercCoin = this.ticking / coinAnimation.duration;

    const yOffsetCoin =
      (movementPercCoin > 0.5 ? 1 - movementPercCoin : movementPercCoin) *
      2 *
      coinAnimation.jumpDistance;

    this.coin.pos.y = this.target.pos.y + yOffsetCoin;

    // box
    if (this.ticking > boxAnimation.duration) {
      this.target.pos.y = this.target.initialPos.y;
      return;
    }

    const movementPercBox = this.ticking / boxAnimation.duration;

    const yOffsetBox =
      (movementPercBox > 0.5 ? 1 - movementPercBox : movementPercBox) *
      2 *
      boxAnimation.jumpDistance;

    this.target.pos.y = this.target.initialPos.y + yOffsetBox;
  }
}
