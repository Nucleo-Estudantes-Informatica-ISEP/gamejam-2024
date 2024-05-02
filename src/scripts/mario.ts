const marioElem = document.getElementById('mario') as HTMLImageElement;
const luckyboxElem = document.getElementById('luckybox') as HTMLImageElement;

const player = {
  size: {
    width: marioElem.clientWidth,
    height: marioElem.clientHeight
  },
  pos: {
    x: window.innerWidth / 10,
    y: 0
  },
  direction: 1,
  velocity: {
    x: 0,
    y: 0
  },
  isDucking: false,
  isOnGround: true,
  isMoving: false,
  speed: 0.4,
  jumpPower: 1.9,
  sprite: '/mario.png'
};

const luckybox = {
  size: {
    width: luckyboxElem.clientWidth,
    height: luckyboxElem.clientHeight
  },
  pos: {
    x: window.innerWidth - window.innerWidth / 8,
    y: 240
  }
};

const gravity = 0.005;

const inputState = {
  up: false,
  down: false,
  left: false,
  right: false,
  dev1: false
};

const sprites = {
  still: '/mario.png',
  jumping: '/mario-jumping.png',
  running: ['/mario-running-0.png', '/mario-running-1.png', '/mario-running-2.png']
};

const widthOffset = Object.hasOwn(window, 'chrome') ? 15 : 0;

const handleInput = (event: KeyboardEvent, state: boolean) => {
  switch (event.code) {
    case 'ArrowLeft':
    case 'KeyA':
    case 'KeyH':
      event.preventDefault();
      inputState.left = state;
      break;

    case 'ArrowRight':
    case 'KeyD':
    case 'KeyL':
      event.preventDefault();
      inputState.right = state;
      break;

    case 'ArrowUp':
    case 'KeyW':
    case 'KeyK':
    case 'Space':
      event.preventDefault();
      inputState.up = state;
      break;

    case 'ArrowDown':
    case 'KeyS':
    case 'KeyJ':
      event.preventDefault();
      inputState.down = state;
      break;

    case 'KeyP':
      event.preventDefault();
      inputState.dev1 = state;
      break;
  }
};

document.addEventListener('keydown', (e) => handleInput(e, true));
document.addEventListener('keyup', (e) => handleInput(e, false));

marioElem.addEventListener('click', () => {
  if (player.isOnGround) {
    player.isOnGround = false;
    player.velocity.y = player.jumpPower;
  }
});

document.addEventListener('resize', () => {
  // move player if out of view
  // move luckybox if out of view
  console.log('HEY');

  luckybox.pos.x = window.innerWidth - window.innerWidth / 8;
});

const checkCollision = () => {
  const collisionY =
    player.pos.y + player.size.height >= luckybox.pos.y &&
    player.pos.y <= luckybox.pos.y + luckybox.size.height;

  const collisionX =
    player.pos.x + player.size.width >= luckybox.pos.x &&
    player.pos.x <= luckybox.pos.x + luckybox.size.width;

  return collisionX && collisionY;
};

const checkIsGrounded = () => {
  return (
    player.pos.y === 0 ||
    (player.pos.y === luckybox.pos.y + luckybox.size.height + 1 &&
      player.pos.x + player.size.width >= luckybox.pos.x &&
      player.pos.x <= luckybox.pos.x + luckybox.size.width)
  );
};

const update = (delta: number) => {
  player.isMoving = false;

  if (inputState.left) {
    let posX = player.pos.x - player.speed * delta;
    if (posX < 0) posX = 0;

    player.pos.x = posX;
    player.direction = -1;
    player.isMoving = true;

    if (checkCollision()) {
      player.pos.x = luckybox.pos.x + luckybox.size.width + 1;
    }
  }

  if (inputState.right) {
    const maxX = window.innerWidth - player.size.width - widthOffset;
    let posX = player.pos.x + player.speed * delta;
    if (posX > maxX) posX = maxX;

    player.pos.x = posX;
    player.direction = 1;
    player.isMoving = true;

    if (checkCollision()) {
      player.pos.x = luckybox.pos.x - player.size.width - 1;
    }
  }

  if (inputState.left && inputState.right) {
    player.isMoving = false;
  }

  if (inputState.up && player.isOnGround) {
    player.isOnGround = false;
    player.velocity.y = player.jumpPower;
  }

  if (!player.isOnGround) {
    player.velocity.y -= gravity * delta;
    player.pos.y += player.velocity.y * delta + (delta * (gravity + gravity * delta)) / 2;

    if (checkCollision()) {
      if (player.velocity.y > 0) {
        player.velocity.y = 0;
        player.pos.y = luckybox.pos.y - player.size.height - 4;
      } else {
        player.isOnGround = true;
        player.pos.y = luckybox.pos.y + luckybox.size.height + 1;
      }
    }
  } else {
    if (!checkIsGrounded()) player.isOnGround = false;
  }

  if (player.pos.y < 0) {
    player.pos.y = 0;
    player.isOnGround = true;
  }

  player.isDucking = inputState.down;

  if (inputState.dev1) player.isOnGround = true;

  if (!player.isOnGround) {
    player.sprite = sprites.jumping;
  } else if (player.isMoving) {
    const now = performance.now();
    const i = Math.floor((now / 100) % 3);
    player.sprite = sprites.running[i];
  } else {
    player.sprite = sprites.still;
  }
};

const render = () => {
  marioElem.style.left = `${player.pos.x}px`;
  marioElem.style.bottom = `${player.pos.y}px`;
  marioElem.style.transform = `scale(${player.direction}, 1)`;
  if (marioElem.src !== player.sprite) marioElem.src = player.sprite;

  luckyboxElem.style.left = `${luckybox.pos.x}px`;
  luckyboxElem.style.bottom = `${luckybox.pos.y}px`;
};

let lastframe = 0;

const gameloop = (current: number) => {
  const delta = current - lastframe;
  lastframe = current;

  update(delta);
  render();
  window.requestAnimationFrame(gameloop);
};

window.requestAnimationFrame(gameloop);
