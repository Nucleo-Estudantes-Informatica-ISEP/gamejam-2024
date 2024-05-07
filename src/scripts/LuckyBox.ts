import { CollectAnimation } from './CollectAnimation';
import type { Game } from './Game';
import { GameObject } from './GameObject';

const sprites = {
  default: '/sprites/luckybox/default-0.png',
  collected: '/sprites/luckybox/collected.webp'
};

export class LuckyBox extends GameObject {
  isCollected: boolean = false;

  private onResizeHandler: (event: Event) => any;

  constructor(game: Game, x: number, y: number, size: number) {
    super(game, x, y, size, size, sprites.default, true);

    if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
    else this.htmlelement.style.display = 'block';

    this.onResizeHandler = () => {
      // TODO move luckybox if out of view

      if (window.innerWidth < 768) this.htmlelement.style.display = 'none';
      else this.htmlelement.style.display = 'block';
    };

    window.addEventListener('resize', this.onResizeHandler);
  }

  update(delta: number): void {
    if (this.isCollected) {
      this.sprite = sprites.collected;
    } else {
      this.sprite = sprites.default; // animations are processed after game objects
    }
  }

  render(): void {
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
    if (this.htmlelement.src !== this.sprite) this.htmlelement.src = this.sprite;
  }

  unregister(): void {
    window.removeEventListener('resize', this.onResizeHandler);
  }

  collect(): void {
    if (this.isCollected) return;
    this.isCollected = true;

    new CollectAnimation(this.game, this).start();
  }
}
