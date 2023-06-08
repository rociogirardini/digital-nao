var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var isDrawing = false;

document.addEventListener('DOMContentLoaded', function() {
    var colorPicker = document.getElementById('colorPicker');
  
    colorPicker.addEventListener('input', function() {
      var selectedColor = colorPicker.value;
      ctx.strokeStyle = selectedColor;
    });
  });

function startDrawing(event) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}

function draw(event) {
  if (isDrawing) {
    ctx.lineTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    ctx.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("contextmenu", (event) => event.preventDefault()); // Evita que aparezca el menú contextual al hacer clic derecho

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyC" && event.ctrlKey) {
    clearCanvas();
  }
});

canvas.addEventListener("mouseup", function () {
  var dataURL = canvas.toDataURL();
  // Enviar los datos del dibujo al backend mediante una solicitud AJAX
  fetch("/draw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ drawing: dataURL }),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});