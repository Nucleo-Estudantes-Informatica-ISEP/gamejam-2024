import type { Game } from './game';
import { GameObject } from './gameobject';

const sprites = [
  '/sprites/coin/default-0.png',
  '/sprites/coin/default-1.png',
  '/sprites/coin/default-2.png',
  '/sprites/coin/default-3.png'
];

export class Coin extends GameObject {
  constructor(game: Game, x: number, y: number, size: number) {
    super(game, x, y, size, size, sprites[1]);

    if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
    else this.htmlelement.style.display = 'block';

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
      else this.htmlelement.style.display = 'block';
    });
  }

  update(delta: number): void {
    const now = performance.now();
    const i = Math.floor((now / 150) % 4);
    this.sprite = sprites[i];

    const duration = 750;
    const distance = 150;

    this.pos.y = this.initialPos.y + Math.abs(Math.sin((now / duration) * Math.PI)) * distance;
    this.htmlelement.style.opacity = `${Math.abs(Math.sin((now / duration) * Math.PI))}`;
    if (parseFloat(this.htmlelement.style.opacity) < 0.04) this.htmlelement.style.display = 'none';
  }

  render(): void {
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
    if (this.htmlelement.src !== this.sprite) this.htmlelement.src = this.sprite;
  }
}
