import type { Bullet } from "./Bullet";
import { lose, kill } from "./main";

export class Enemy {
  dist: number;
  dirAngle: number;
  speed = 100;
  size = 30;
  color: string;

  constructor(dirAngle: number, initDistance: number, color: string) {
    this.dirAngle = dirAngle;
    this.dist = initDistance;
    this.color = color;
  }

  update(bullets: Bullet[], deltaTime: number) {
    this.dist -= this.speed * deltaTime;

    if (bullets.some(b => this.isCollide(b))) kill(this, bullets.find(b => this.isCollide(b))!)
    if (this.dist < this.size * 2) lose();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.dist * Math.cos(this.dirAngle),
      this.dist * Math.sin(this.dirAngle),
      this.size, 0, Math.PI * 2
    );
    ctx.fillStyle = this.color;
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
