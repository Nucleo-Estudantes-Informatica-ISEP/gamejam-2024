import type { Game } from './game';
import { GameObject } from './gameobject';
import { LuckyBox } from './luckybox';
import type { Point } from './point';
import { checkCollision, checkIsGrounded } from './utils';

const sprites = {
  still: '/mario.png',
  jumping: '/mario-jumping.png',
  running: ['/mario-running-0.png', '/mario-running-1.png', '/mario-running-2.png']
};

const widthOffset = Object.hasOwn(window, 'chrome') ? 15 : 0;

export class Player extends GameObject {
  direction: number;
  velocity: Point = { x: 0, y: 0 };
  isDucking: boolean = false;
  isOnGround: boolean = true;
  isMoving: boolean = false;
  speed: number = 0.4;
  jumpPower: number = 1.9;

  constructor(game: Game, x: number, y: number, size: number) {
    super(game, x, y, size, size, sprites.still);
    this.direction = 1;

    this.htmlelement.style.cursor = 'pointer';

    this.htmlelement.addEventListener('click', () => this.jump());
  }

  update(delta: number): void {
    this.isMoving = false;

    const inputState = this.game.input;

    if (inputState.left) {
      let posX = this.game.player.pos.x - this.game.player.speed * delta;
      if (posX < 0) posX = 0;

      this.game.player.pos.x = posX;
      this.game.player.direction = -1;
      this.game.player.isMoving = true;

      this.game.gameObjects.forEach((o) => {
        if (checkCollision(this, o)) {
          this.game.player.pos.x = o.pos.x + o.width + 1;
        }
      });
    }

    if (inputState.right) {
      const maxX = window.innerWidth - this.game.player.width - widthOffset;
      let posX = this.game.player.pos.x + this.game.player.speed * delta;
      if (posX > maxX) posX = maxX;

      this.game.player.pos.x = posX;
      this.game.player.direction = 1;
      this.game.player.isMoving = true;

      this.game.gameObjects.forEach((o) => {
        if (checkCollision(this, o)) {
          this.game.player.pos.x = o.pos.x - this.game.player.width - 1;
        }
      });
    }

    if (inputState.left && inputState.right) {
      this.game.player.isMoving = false;
    }

    if (inputState.up) this.jump();

    if (!this.isOnGround) {
      this.velocity.y -= this.game.gravity * delta;
      this.pos.y +=
        this.velocity.y * delta + (delta * (this.game.gravity + this.game.gravity * delta)) / 2;

      this.game.gameObjects.forEach((o) => {
        if (checkCollision(this, o)) {
          if (this.velocity.y > 0) {
            this.velocity.y = 0;
            this.pos.y = o.pos.y - this.height - 4;
            if (o instanceof LuckyBox)
              if (o.collectedElement) o.collectedElement.style.display = 'block';
          } else {
            this.isOnGround = true;
            this.pos.y = o.pos.y + o.height + 1;
          }
        }
      });
    } else {
      if (!checkIsGrounded(this, this.game.gameObjects)) this.isOnGround = false;
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.isOnGround = true;
    }

    this.isDucking = inputState.down;

    if (inputState.dev1) this.isOnGround = true;

    if (!this.isOnGround) {
      this.sprite = sprites.jumping;
    } else if (this.isMoving) {
      const now = performance.now();
      const i = Math.floor((now / 100) % 3);
      this.sprite = sprites.running[i];
    } else {
      this.sprite = sprites.still;
    }
  }

  render(): void {
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
    this.htmlelement.style.transform = `scale(${this.direction}, 1)`;
    if (this.htmlelement.src !== this.sprite) this.htmlelement.src = this.sprite;
  }

  jump() {
    if (this.isOnGround) {
      this.isOnGround = false;
      this.velocity.y = this.jumpPower;
    }
  }
}
