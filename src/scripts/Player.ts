import type { Game } from './Game';
import { GameObject } from './GameObject';
import { InactiveJumpAnimation } from './InactiveJumpAnimation';
import type { InputHandler } from './InputHandler';
import { InputState } from './InputState';
import { LuckyBox } from './LuckyBox';
import type { Point } from './Point';
import { checkCollision, checkIsGrounded, totalDocumentHeight } from './utils';

const sprites = {
  still: '/sprites/mario/still.png',
  jumping: '/sprites/mario/jumping.png',
  running: [
    '/sprites/mario/running-0.png',
    '/sprites/mario/running-1.png',
    '/sprites/mario/running-2.png'
  ]
};

const viewThreshold = 50;
const speed = 0.4;
const jumpPower = 1.9;

export class Player extends GameObject {
  direction: number;
  velocity: Point = { x: 0, y: 0 };
  isDucking: boolean = false;
  isOnGround: boolean = true;
  isMoving: boolean = false;
  speed: number = speed;
  jumpPower: number = jumpPower;
  hasMoved: boolean;
  input: InputState;
  inputHandlers: InputHandler[] = [];

  private onClickHandler: (e: Event) => any;
  private onResizeHandler: (e: Event) => any;

  constructor(game: Game, x: number, y: number, size: number, inputHandler: InputHandler) {
    super(game, x, y, size, size, sprites.still, true, 50);
    this.direction = 1;

    this.htmlelement.style.cursor = 'pointer';

    this.input = new InputState();
    this.inputHandlers.push(inputHandler);

    this.onClickHandler = () => {
      this.jump();
      this.hasMoved = true;
    };

    this.onResizeHandler = () => {
      const screenWidth = document.documentElement.clientWidth;
      if (this.pos.x + this.width >= screenWidth) {
        this.pos = this.initialPos;
      }
    };
  }

  update(delta: number): void {
    this.isMoving = false;

    if (this.input.left) {
      let posX = this.pos.x - this.speed * delta;
      if (posX < 0) posX = 0;

      this.pos.x = posX;
      this.direction = -1;
      this.isMoving = true;

      this.game.gameObjects.forEach((o) => {
        if (checkCollision(this, o)) {
          this.pos.x = o.pos.x + o.width + 1;
        }
      });

      this.hasMoved = true;
    }

    if (this.input.right) {
      const screenWidth = document.documentElement.clientWidth;
      const maxX = screenWidth - this.width;
      let posX = this.pos.x + this.speed * delta;
      if (posX > maxX) posX = maxX;

      this.pos.x = posX;
      this.direction = 1;
      this.isMoving = true;

      this.game.gameObjects.forEach((o) => {
        if (checkCollision(this, o)) {
          this.pos.x = o.pos.x - this.width - 1;
        }
      });

      this.hasMoved = true;
    }

    if (this.input.left && this.input.right) {
      this.isMoving = false;
    }

    if (this.input.up) {
      this.jump();
      this.hasMoved = true;
    }

    if (!this.isOnGround) {
      this.velocity.y -= this.game.gravity * delta;
      this.pos.y +=
        this.velocity.y * delta + (delta * (this.game.gravity + this.game.gravity * delta)) / 2;

      this.game.gameObjects.forEach((o) => {
        if (checkCollision(this, o)) {
          if (this.velocity.y > 0) {
            this.velocity.y = 0;
            this.pos.y = o.pos.y - this.height - 4;

            if (o instanceof LuckyBox) {
              o.collect();

              if (
                this.game.gameObjects
                  .filter((o) => o instanceof LuckyBox)
                  .every((o) => (o as LuckyBox).isCollected)
              ) {
                this.game.snake();
              }
            }
          } else {
            this.isOnGround = true;
            this.pos.y = o.pos.y + o.height + 1;
          }
        }
      });
    } else {
      this.velocity.y = 0;
      if (!checkIsGrounded(this, this.game.gameObjects)) this.isOnGround = false;
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.isOnGround = true;
    }

    this.isDucking = this.input.down;

    if (this.input.dev1) this.isOnGround = true;

    if (!this.isOnGround) {
      this.sprite = sprites.jumping;
    } else if (this.isMoving) {
      const now = performance.now();
      const i = Math.floor((now / 100) % 3);
      this.sprite = sprites.running[i];
    } else {
      this.sprite = sprites.still;
    }

    const documentHeight = totalDocumentHeight();
    const upperScrollOffset = documentHeight - window.scrollY - viewThreshold;
    const lowerScrollOffset = documentHeight - window.scrollY - window.innerHeight + viewThreshold;

    if (!this.game.isScrolling && (this.isMoving || !this.isOnGround)) {
      const currentLowerBound = window.scrollY + window.innerHeight;
      if (
        (this.pos.y < lowerScrollOffset && currentLowerBound !== documentHeight) ||
        this.pos.y + this.height > upperScrollOffset
      ) {
        this.game.isScrolling = true;
        this.htmlelement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  render(): void {
    this.htmlelement.style.left = `${this.pos.x}px`;
    this.htmlelement.style.bottom = `${this.pos.y}px`;
    this.htmlelement.style.transform = `scale(${this.direction}, 1)`;
    if (this.htmlelement.src !== this.sprite) this.htmlelement.src = this.sprite;
  }

  register(): void {
    this.inputHandlers.forEach((o) => o.register(this));
    //new InactiveJumpAnimation(this.game, this).start();

    this.htmlelement.addEventListener('click', this.onClickHandler);
    window.addEventListener('resize', this.onResizeHandler);
  }

  unregister(): void {
    this.inputHandlers.forEach((o) => o.unregister());
    this.htmlelement.removeEventListener('click', this.onClickHandler);
    window.removeEventListener('resize', this.onResizeHandler);
  }

  jump() {
    if (this.isOnGround) {
      this.isOnGround = false;
      this.velocity.y = this.jumpPower;
    }
  }

  addInputHandler(inputHandler: InputHandler): void {
    this.inputHandlers.push(inputHandler);
    inputHandler.register(this);
  }
}
