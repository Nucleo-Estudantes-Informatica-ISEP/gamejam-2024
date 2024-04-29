const mario = document.getElementById('mario') as HTMLImageElement;

const player = {
  size: {
    width: mario.clientWidth,
    height: mario.clientHeight
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
  jumpPower: 1.5,
  sprite: '/mario.png'
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

mario.addEventListener('click', () => {
  if (player.isOnGround) {
    player.isOnGround = false;
    player.velocity.y = player.jumpPower;
  }
});

const update = (delta: number) => {
  player.isMoving = false;

  if (inputState.left) {
    let posX = player.pos.x - player.speed * delta;
    if (posX < 0) posX = 0;

    player.pos.x = posX;
    player.direction = -1;
    player.isMoving = true;
  }

  if (inputState.right) {
    const maxX = window.innerWidth - player.size.width - widthOffset;
    let posX = player.pos.x + player.speed * delta;
    if (posX > maxX) posX = maxX;

    player.pos.x = posX;
    player.direction = 1;
    player.isMoving = true;
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
  mario.style.left = `${player.pos.x}px`;
  mario.style.bottom = `${player.pos.y}px`;
  mario.style.transform = `scale(${player.direction}, 1)`;
  if (mario.src !== player.sprite) mario.src = player.sprite;
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
