const canvasSelector = document.querySelector('#draw');
const ctx = canvasSelector.getContext('2d');

canvasSelector.width = window.innerWidth;
canvasSelector.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const drawing = e => {
  if(!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();

  ctx.moveTo(lastX, lastY);

  ctx.lineTo(e.offsetX, e.offsetY);

  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];

  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if(direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--
  }

  hue++
}

canvasSelector.addEventListener('mousemove', drawing);
canvasSelector.addEventListener('mousedown', (e) => {
isDrawing = true;
[lastX, lastY] = [e.offsetX, e.offsetY];
})
canvasSelector.addEventListener('mouseup', () => isDrawing = false)
canvasSelector.addEventListener('mouseout', () => isDrawing = false)