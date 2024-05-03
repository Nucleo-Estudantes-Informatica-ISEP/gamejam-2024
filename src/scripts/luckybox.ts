import type { Game } from './game';
import { GameObject } from './gameobject';

export class LuckyBox extends GameObject {
  collectedElement: HTMLElement | null = null;

  constructor(game: Game, x: number, y: number, size: number) {
    super(game, x, y, size, size, '/luckybox.gif');
    const collectedElement = document.getElementById('lucky-box-collected');
    if (collectedElement) {
      // add a hash to make this id unique
      collectedElement.id = `${collectedElement.id}-${Math.random().toString(36).substring(4)}`;
      collectedElement.style.left = `${x}px`;
      collectedElement.style.bottom = `${y}px`;
      this.collectedElement = collectedElement;
    }

    if (window.innerWidth < 768) this.htmlelement.style.visibility = 'hidden';
    else this.htmlelement.style.visibility = 'visible';

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
