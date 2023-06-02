const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let gameOver = false;

// Configuración inicial
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = canvas.width / 2 - paddleWidth / 2;
const paddleSpeed = 5;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - paddleHeight - ballRadius;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Speed Level

const radioInputs = document.querySelectorAll(
    'input[type="radio"][name="flexRadioDefault"]'
  );
  let speedLevel = 2;
  
  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        speedLevel = Number(input.value);
        ballSpeedX = speedLevel;
        ballSpeedY = -speedLevel;
      }
    });
  });

const brickRowCount = 6;
const brickColumnCount = 9;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let score = 0;

function drawPaddle() {
  context.beginPath();
  context.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  context.fillStyle = "#0d6d32";
  context.fill();
  context.closePath();
}

function drawBall() {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#0fa08a";
  context.fill();
  context.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = "#0d6d32";
        context.fill();
        context.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (
          ballX > brick.x &&
          ballX < brick.x + brickWidth &&
          ballY > brick.y &&
          ballY < brick.y + brickHeight
        ) {
          ballSpeedY = -ballSpeedY;
          brick.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            context.fillText(
              "¡Ganaste!. Presioná SPACE para jugar de nuevo",
              200,
              400
            );
            gameOver = true;
          }
        }
      }
    }
  }
}

function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "#0fa08a";
  context.fillText("Puntaje: " + score, 8, 20);
}

function draw() {
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();
  collisionDetection();
  drawScore();

  // Movimiento de la paleta
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }

  // Movimiento de la pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisiones con las paredes
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY + ballRadius > canvas.height - paddleHeight) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballSpeedY = -ballSpeedY;
    } else {
      context.fillText(
        "Juego terminado. Presioná SPACE para volver a empezar",
        200,
        400
      );
      gameOver = true;
    }
  }

  requestAnimationFrame(draw);
}

function keyDownHandler(event) {
  if (gameOver) {
    if (event.code == "Space") {
      resetGame();
      console.log("RESET");
    }
    return;
  }
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(event) {
  const relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function resetGame() {
  gameOver = false;
  draw();
  document.location.reload();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

draw();
