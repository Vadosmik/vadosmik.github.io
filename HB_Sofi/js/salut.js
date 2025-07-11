const canvas = document.getElementById("magicCanvas");
const ctx = canvas.getContext("2d");
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor(x, y, vx, vy, size, color, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.life = life;
    this.opacity = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.opacity = this.life / 100;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

function createExplosion(x, y) {
  for (let i = 0; i < 80; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 4 + 1;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const size = Math.random() * 4 + 1;
    const color = `255, ${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(
      Math.random() * 200 + 55
    )}`;
    particles.push(new Particle(x, y, vx, vy, size, color, 100));
  }
}

setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  createExplosion(x, y);
}, 1000);

function animate() {
  ctx.fillStyle = "rgba(232, 233, 252, 0.3)";
  ctx.fillRect(0, 0, width, height);

  particles = particles.filter((p) => p.life > 0);
  particles.forEach((p) => {
    p.update();
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
}
animate();