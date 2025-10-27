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
let isRunning = true;

export function kill(enemy: Enemy, bullet: Bullet) {
  enemies = enemies.filter(e => e !== enemy);
  bullets = bullets.filter(b => b !== bullet);

  const pointsEl = document.getElementById('points') as HTMLElement;
  const points = Number.parseInt(pointsEl.innerHTML.match(/\d+/)?.[0]!);
  pointsEl.innerHTML = "Puntos: " + (points + 1);
}

export function lose() {
  isRunning = false;
  alert('You lost');
  window.location.reload();
}

let mouseX = 0, mouseY = 0;

canvas.addEventListener('mousemove', e => {
  if (!isRunning) return
  mouseX = e.clientX - width / 2;
  mouseY = e.clientY - height / 2;
});

canvas.addEventListener('click', () => {
  if (!isRunning) return
  bullets.push(new Bullet(Math.atan2(mouseY, mouseX)));
});

window.addEventListener('resize', () => window.location.reload());

document.addEventListener('visibilitychange', () => {
  isRunning = !document.hidden;
});

const pauseplay = document.getElementById('pauseplay')!;
pauseplay.addEventListener('click', () => {
  pauseplay.innerText = pauseplay.innerText === 'Pausa' ? 'Continuar' : 'Pausa';
  isRunning = !isRunning;
})

const rainbowColors = ["#FF0000", "#FF7F00", "#00FF00", "#8B00FF", "#FF69B4", "#1E90FF", "#6495ED"];

ctx.translate(width / 2, height / 2)

let lastTime = 0;
let enemyTimer = 0;
let enemyInterval = 1; // seconds

function animate(timestamp: number) {
  requestAnimationFrame(animate);

  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  ctx.fillStyle = '#000';
  ctx.fillRect(-width / 2, -height / 2, width, height);

  if (isRunning) {
    // Update bullets and enemies
    bullets = bullets.filter(b => b.dist < width);
    bullets.forEach(b => b.update(deltaTime));
    enemies.forEach(e => e.update(bullets, deltaTime));

    // Spawn enemies
    enemyTimer += deltaTime;
    if (enemyTimer >= enemyInterval) {
      const angle = Math.PI * (Math.random() * 2 - 1);
      enemies.push(
        new Enemy(angle, width / 2, rainbowColors[Math.floor(Math.random() * rainbowColors.length)])
      );
      enemyTimer = 0;
      enemyInterval *= 0.98; // speed up gradually
    }
  }

  // Draw everything
  bullets.forEach(b => b.draw(ctx));
  enemies.forEach(e => e.draw(ctx));

  dart.setMousePos(mouseX, mouseY);
  dart.draw(ctx);
}

requestAnimationFrame(animate);