export class Dart {
  mouseX = 0;
  mouseY = 0;

  size = 50;

  image: HTMLImageElement;
  angle: number = 0;

  constructor() {
    this.image = new Image();
    this.image.src = '/dart.svg';
  }

  setMousePos(mouseX: number, mouseY: number) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.angle = Math.atan2(this.mouseX, -this.mouseY);

    ctx.save();
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      -this.size / 2,
      -this.size / 2,
      this.size,
      this.size
    );
    ctx.restore();
  }
}
