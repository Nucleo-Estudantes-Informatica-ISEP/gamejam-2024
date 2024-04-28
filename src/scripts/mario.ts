const mario = document.getElementById('mario');

const player = {
  size: {
    width: mario!.clientWidth,
    height: mario!.clientHeight
  },
  pos: {
    x: 0,
    y: window.innerHeight - mario!.clientHeight
  },
  direction: 1,
  jumping: false,
  duck: false,
  speed: 0.4
};

const inputState = {
  up: false,
  down: false,
  left: false,
  right: false
};

const handleInput = (event: KeyboardEvent, state: boolean) => {
  switch (event.code) {
    case 'ArrowLeft':
    case 'KeyA':
      event.preventDefault();
      inputState.left = state;
      break;

    case 'ArrowRight':
    case 'KeyD':
      event.preventDefault();
      inputState.right = state;
      break;

    case 'ArrowUp':
    case 'KeyW':
    case 'Space':
      event.preventDefault();
      inputState.up = state;
      break;

    case 'ArrowDown':
    case 'KeyS':
      event.preventDefault();
      inputState.down = state;
      break;
  }
};

document.addEventListener('keydown', (e) => handleInput(e, true));
document.addEventListener('keyup', (e) => handleInput(e, false));

const update = (delta: number) => {
  if (inputState.left) {
    let posX = player.pos.x - player.speed * delta;
    if (posX < 0) posX = 0;

    player.pos.x = posX;
    player.direction = -1;
  }

  if (inputState.right) {
    const maxX = window.innerWidth - player.size.width;
    let posX = player.pos.x + player.speed * delta;
    if (posX > maxX) posX = maxX;

    player.pos.x = posX;
    player.direction = 1;
  }

  if (inputState.up) {
    if (!player.jumping) {
    }
    player.jumping = true;
    // player.pos.y -= player.speed * delta;
  } else {
    player.jumping = false;
  }
};

const render = () => {
  mario!.style.left = `${player.pos.x}px`;
  mario!.style.top = `${player.pos.y}px`;
  mario!.style.transform = `scale(${player.direction}, 1)`;
};

const gameloop = (lastframe?: number) => {
  const now = performance.now();
  const delta = lastframe ? now - lastframe : 0;

  update(delta);
  render();
  setTimeout(() => gameloop(now), 10);
};

gameloop();
