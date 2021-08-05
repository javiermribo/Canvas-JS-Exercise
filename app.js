const canvasSelector = document.querySelector('#draw');
const ctx = canvasSelector.getContext('2d');

canvasSelector.width = window.innerWidth;
canvasSelector.height = window.innerHeight;

ctx.strokeStyle = '#BADA55',
ctx.lineJoin = 'round'; //Une los segmentos según propiedad especificada
ctx.lineCap = 'round'; // Determina forma usada para dibujar los puntos finales
ctx.lineWidth = 100;

let isDrawing = false; // Se esta dibujando o no?
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = e => {
  if (!isDrawing) return; // Si no se esta dibujando, detener fn aquí. Sino, continuar

  // Se manipulan los valores hsl, para que comiencen en 0 con saturación 100% y luminosidad 50%
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  
  //Empieza en...
  ctx.moveTo(lastX, lastY);
  
  //Se mueve a...
  ctx.lineTo(e.offsetX, e.offsetY); //Hacia donde se mueve el mouse
  ctx.stroke();

  //Actualiza sus valores a medida que se va dibujando. Sino se los actualiza, empieza siempre en 0
  [lastX, lastY] = [e.offsetX, e.offsetY];
  if (hue >= 360) {
    hue = 0; //Al alcanzar el valor de 360, se reinicia en 0
  }

  hue++;

  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if(direction) {
    ctx.lineWidth++
  } else {
    ctx.lineWidth--
  }
}

canvasSelector.addEventListener('mousemove', draw);
canvasSelector.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; //Se actualiza los valores de lastX y lastY al dejar de hacer click
});
canvasSelector.addEventListener('mouseup', () => isDrawing = false);
canvasSelector.addEventListener('mouseout', () => isDrawing = false)