const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

// Objetos
class Object {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.width = 60;
    this.height = 30;
    this.color = 'red';
  }

  update() {
    this.x += 1;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}

let object;

function init() {
  object = new Object();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  object.update();
  object.draw();
  requestAnimationFrame(animate);
}

init();
animate();
