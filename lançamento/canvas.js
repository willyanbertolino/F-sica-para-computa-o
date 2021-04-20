const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

// Variáveis
let velocity = 0;
let angle = 0;

let v0x = 0;
let v0y = 0;
let g = 0;
let frame = 0;
let cannonPosition = { x: canvas.width / 2, y: (3 * canvas.height) / 4 };

let canvasPosition = canvas.getBoundingClientRect();
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Eventos
addEventListener('click', (event) => {
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

addEventListener('keydown', (event) => {
  if (event.key == 'ArrowDown' && angle > 0) {
    angle = Math.round(angle * 10) / 10 - 0.1 * Math.PI;
  }
  if (event.key == 'ArrowUp' && angle < Math.PI / 0.2 - 0.2) {
    angle = Math.round(angle * 10) / 10 + 0.1 * Math.PI;
  }

  angle = Math.round(angle * 10) / 10;

  document.querySelector('#angle').value = ((angle * 18) / Math.PI).toFixed(1);
});

// Objetos
addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    velocity = parseFloat(document.querySelector('#velocity').value);
    v0x = velocity * Math.cos(angle / 10);
    v0y = velocity * Math.sin(angle / 10);
    g = 1;
  }
});

//Objects;
class Cannon {
  constructor() {
    this.x = canvas.width / 2;
    this.y = (3 * canvas.height) / 4;
    this.radius = 15;
    this.length = 30;
    this.width = 8;
    this.angle = 0;
  }

  update() {
    if (this.x != mouse.x || this.y != mouse.y) {
      if (
        mouse.x > 0 &&
        mouse.x < canvas.width / 2 &&
        mouse.y < canvas.height &&
        mouse.y > canvas.height / 2
      ) {
        this.x = mouse.x + this.radius;
        this.y = mouse.y - this.radius;
      }
    }
    this.angle = -angle / 10;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, (1 / 2) * Math.PI, (3 / 2) * Math.PI);
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(this.length, -this.width);
    ctx.moveTo(0, this.radius);
    ctx.lineTo(this.length, this.width);
    ctx.moveTo(this.length, this.width);
    ctx.lineTo(this.length, -this.width);
    ctx.rotate(-this.angle);
    ctx.moveTo(this.length, this.radius);
    ctx.lineTo(this.length, this.y);
    ctx.moveTo(this.length, this.radius);
    ctx.lineTo(-this.x, this.radius);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

class Ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = (3 * canvas.height) / 4;
    this.radius = 7;
  }
  update() {
    if (this.x != mouse.x || this.y != mouse.y) {
      if (
        mouse.x > 0 &&
        mouse.x < canvas.width / 2 &&
        mouse.y < canvas.height &&
        mouse.y > canvas.height / 2
      ) {
        this.x = mouse.x + 15;
        this.y = mouse.y - 15;
        cannonPosition = { x: mouse.x + 15, y: mouse.y - 15 };
      }
    }
    let dx = this.x - cannonPosition.x;
    let dy = this.y - cannonPosition.y;
    let ds = Math.sqrt(dx * dx + dy * dy);
    if (ds > 37) {
      v0y -= g / 10;
    }
    this.x += v0x;
    this.y -= v0y;
    if (v0x != 0) {
      frame++;
      if (frame > 240) {
        this.x = cannonPosition.x;
        this.y = cannonPosition.y;
        v0x = 0;
        v0y = 0;
        g = 0;
        frame = 0;
      }
    }
  }

  draw() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

let cannon;
let ball;

function initDraw() {
  cannon = new Cannon();
  ball = new Ball();
}

// Animação
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cannon.update();
  cannon.draw();
  ball.update();
  ball.draw();

  requestAnimationFrame(animate);
}

initDraw();
animate();
