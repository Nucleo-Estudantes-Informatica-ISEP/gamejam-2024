import { LuckyBox } from './luckybox';
import type { GameObject } from './gameobject';
import { Player } from './player';
import { InputHandler } from './inputhandler';

const GRAVITY = 0.005;

export class Game {
  player: Player;
  gameObjects: GameObject[] = [];
  gravity: number = GRAVITY;
  input: InputHandler;

  constructor() {
    this.player = new Player(this, window.innerWidth / 10, 0, 96);
    const luckybox = new LuckyBox(this, window.innerWidth - window.innerWidth / 8, 240, 80);

    this.gameObjects.push(luckybox);

    this.input = new InputHandler();
  }

  start() {
    const footer = document.getElementById('footer');
    [this.player, ...this.gameObjects].forEach((o) => {
      footer!.appendChild(o.htmlelement);
    });

    let lastframe = 0;

    const gameloop = (current: number) => {
      const delta = current - lastframe;
      lastframe = current;

      this.update(delta);
      this.render();
      window.requestAnimationFrame(gameloop);
    };

    window.requestAnimationFrame(gameloop);
  }

  update(delta: number) {
    [this.player, ...this.gameObjects].forEach((o) => o.update(delta));
  }

  render() {
    [this.player, ...this.gameObjects].forEach((o) => o.render());
  }
}
