import type { Bullet } from "./Bullet";
import { removeEnemy } from "./main";

export class Enemy {
  dist: number;
  dirAngle: number;
  speed = 1;
  size = 30;

  constructor(dirAngle: number, initDistance: number) {
    this.dirAngle = dirAngle;
    this.dist = initDistance;
  }

  draw(ctx: CanvasRenderingContext2D, bullets: Bullet[]) {
    this.dist -= this.speed;

    if (bullets.some(b => this.isCollide(b))) removeEnemy(this)

    ctx.beginPath();
    ctx.arc(
      this.dist * Math.cos(this.dirAngle),
      this.dist * Math.sin(this.dirAngle),
      this.size, 0, Math.PI * 2
    );
    ctx.fillStyle = 'blue';
    ctx.fill();
  }

  isCollide(bullet: Bullet) {
    const d = Math.sqrt(
      this.dist ** 2 +
      bullet.dist ** 2 -
      2 * this.dist * bullet.dist * Math.cos(this.dirAngle - bullet.dirAngle)
    );
    return d <= this.size + bullet.size;
  }
}
