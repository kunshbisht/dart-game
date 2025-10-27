export class Bullet {
  dist = 0;
  dirAngle: number;
  speed = 10;
  size = 10;

  constructor(dirAngle: number) {
    this.dirAngle = dirAngle;
  }

  update() {
    this.dist += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.dist * Math.cos(this.dirAngle),
      this.dist * Math.sin(this.dirAngle),
      this.size, 0, Math.PI * 2
    );
    ctx.fillStyle = 'yellow';
    ctx.fill();
  }
}
