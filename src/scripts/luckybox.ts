import type { Game } from './game';
import { GameObject } from './gameobject';

export class LuckyBox extends GameObject {
  constructor(game: Game, x: number, y: number, size: number) {
    super(game, x, y, size, size, '/luckybox.gif');

    window.addEventListener('resize', () => {
      // TODO move player if out of view
      // TODO move luckybox if out of view

      if (window.innerWidth < 768) this.htmlelement.style.visibility = 'hidden';
      else this.htmlelement.style.visibility = 'visible';
    });
  }

  update(delta: number): void {}

  render(): void {
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
  }
}
