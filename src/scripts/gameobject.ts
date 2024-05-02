import type { Point } from 'framer-motion';
import type { Game } from './game';

export abstract class GameObject {
  game: Game;
  width: number;
  height: number;
  pos: Point;
  readonly initialPos: Point;
  sprite: string;
  htmlelement: HTMLImageElement;

  constructor(game: Game, x: number, y: number, width: number, height: number, sprite: string) {
    this.game = game;
    this.pos = { x, y };
    this.initialPos = { x, y };
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.htmlelement = document.createElement('img');

    this.htmlelement.src = this.sprite;
    this.htmlelement.style.position = 'absolute';
    this.htmlelement.style.width = `${this.width}px`;
    this.htmlelement.style.height = `${this.height}px`;
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
  }

  getSize() {
    return {
      width: this.width,
      height: this.height
    };
  }

  abstract update(delta: number): void;
  abstract render(): void;
}
