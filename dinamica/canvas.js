const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

let position = 0;
let velocity = 0;
let acceleration = 0;

addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    position = parseFloat(document.querySelector('#position').value);
    velocity = parseFloat(document.querySelector('#velocity').value);
    acceleration = parseFloat(document.querySelector('#acceleration').value);

    init();
  }
});

// Objetos
class Object {
  constructor() {
    this.x = position;
    this.y = canvas.height / 2;
    this.width = 60;
    this.height = 30;
    this.color = 'red';
  }

  update() {
    this.x += velocity;
    velocity += acceleration;

    if (velocity <= 0) {
      console.log(this.x);
    }
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
