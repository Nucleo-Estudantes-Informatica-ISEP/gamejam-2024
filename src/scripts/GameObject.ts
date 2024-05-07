import type { Point } from 'framer-motion';
import type { Game } from './Game';

export abstract class GameObject {
  game: Game;
  width: number;
  height: number;
  pos: Point;
  readonly initialPos: Point;
  sprite: string;
  isSolid: boolean;
  zIndex: number;
  htmlelement: HTMLImageElement;

  constructor(
    game: Game,
    x: number,
    y: number,
    width: number,
    height: number,
    sprite: string,
    isSolid: boolean,
    zIndex?: number
  ) {
    this.game = game;
    this.pos = { x, y };
    this.initialPos = { x, y };
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.isSolid = isSolid;
    this.zIndex = zIndex ?? 40;
    this.htmlelement = document.createElement('img');

    this.htmlelement.src = this.sprite;
    this.htmlelement.alt = 'sprite';
    this.htmlelement.style.position = 'absolute';
    this.htmlelement.style.width = `${this.width}px`;
    this.htmlelement.style.height = `${this.height}px`;
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
    this.htmlelement.style.zIndex = `${this.zIndex}`;
  }

  getSize() {
    return {
      width: this.width,
      height: this.height
    };
  }

  start(): void {
    this.game.parentElement.appendChild(this.htmlelement);
  }

  remove(): void {
    this.unregister();
    this.game.parentElement.removeChild(this.htmlelement);
    this.game.gameObjects = this.game.gameObjects.filter((o) => o !== this);
  }

  abstract update(delta: number): void;
  abstract render(): void;
  abstract unregister(): void;
}
