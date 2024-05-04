import type { GameObject } from './gameobject';

export const checkCollision = (obj: GameObject, other: GameObject) => {
  const collisionY =
    obj.pos.y + obj.height >= other.pos.y && obj.pos.y <= other.pos.y + other.height;
  const collisionX = obj.pos.x + obj.width >= other.pos.x && obj.pos.x <= other.pos.x + other.width;

  return collisionX && collisionY;
};

export const checkIsGrounded = (obj: GameObject, objs: GameObject[]) => {
  const ground = obj.pos.y === 0;

  const inGameObject =
    objs.findIndex((o) => {
      return (
        obj.pos.y === o.pos.y + o.height + 1 &&
        obj.pos.x + obj.width >= o.pos.x &&
        obj.pos.x <= o.pos.x + o.width
      );
    }) !== -1;

  return ground || inGameObject;
};

export const totalDocumentHeight = () => {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};
