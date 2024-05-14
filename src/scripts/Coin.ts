import type { Game } from './Game';
import { GameObject } from './GameObject';

const sprite = '/sprites/coin/default-1.png';

export class Coin extends GameObject {
  private onResizeHandler: (event: Event) => any;

  constructor(game: Game, x: number, y: number, size: number) {
    super(game, x, y, size, size, sprite, false, 35);

    if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
    else this.htmlelement.style.display = 'block';

    this.onResizeHandler = () => {
      if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
      else this.htmlelement.style.display = 'block';
    };
  }

  update(delta: number): void {}

  render(): void {
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
    if (this.htmlelement.src !== this.sprite) this.htmlelement.src = this.sprite;
  }

  register(): void {
    window.addEventListener('resize', this.onResizeHandler);
  }

  unregister(): void {
    window.removeEventListener('resize', this.onResizeHandler);
  }
}
