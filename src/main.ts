import { Bullet } from "./Bullet";
import { Dart } from "./Dart";
import { Enemy } from "./Enemy";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

const dart = new Dart();
let bullets: Bullet[] = [];
let enemies: Enemy[] = [];

export function removeEnemy(enemy: Enemy) {
  enemies = enemies.filter(e => e !== enemy);
}

let mouseX = 0, mouseY = 0;

canvas.addEventListener('mousemove', e => {
  mouseX = e.clientX - width / 2;
  mouseY = e.clientY - height / 2;
});

canvas.addEventListener('click', () => {
  bullets.push(new Bullet(Math.atan2(mouseY, mouseX)));
});

setInterval(() => {
  const angle = Math.PI * (Math.random() * 2 - 1)
  enemies.push(new Enemy(angle, width/2))
}, 1000);

ctx.translate(width / 2, height / 2)

function draw() {
  requestAnimationFrame(draw);

  ctx.fillStyle = '#000';
  ctx.fillRect(-width / 2, -height / 2, width, height);

  bullets = bullets.filter(b => b.dist < width);
  bullets.forEach(b => b.draw(ctx));
  
  enemies.forEach(e => e.draw(ctx, bullets));

  dart.setMousePos(mouseX, mouseY);
  dart.draw(ctx);
}

draw();
