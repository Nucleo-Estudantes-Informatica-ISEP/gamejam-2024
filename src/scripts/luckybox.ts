import { Coin } from './coin';
import type { Game } from './game';
import { GameObject } from './gameobject';

const sprites = {
  default: [
    '/sprites/luckybox/default-0.png',
    '/sprites/luckybox/default-1.png',
    '/sprites/luckybox/default-2.png',
    '/sprites/luckybox/default-3.png'
  ],
  collected: '/sprites/luckybox/collected.png'
};

export class LuckyBox extends GameObject {
  isCollected: boolean = false;

  constructor(game: Game, x: number, y: number, size: number) {
    super(game, x, y, size, size, sprites.default[0]);

    if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
    else this.htmlelement.style.display = 'block';

    window.addEventListener('resize', () => {
      // TODO move luckybox if out of view

      if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
      else this.htmlelement.style.display = 'block';
    });
  }

  update(delta: number): void {
    if (this.isCollected) {
      this.sprite = sprites.collected;
    } else {
      const now = performance.now();
      const prob = Math.floor((now / 150) % 6);
      const i = prob < 3 ? 0 : prob === 5 ? 1 : prob - 2;
      this.sprite = sprites.default[i];
    }
  }

  render(): void {
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
    if (this.htmlelement.src !== this.sprite) this.htmlelement.src = this.sprite;
  }

  collect(): void {
    if (this.isCollected) return;

    const coin = new Coin(this.game, this.pos.x, this.pos.y + 60, 80);
    this.game.gameObjects.push(coin);
    this.isCollected = true;
  }
}
