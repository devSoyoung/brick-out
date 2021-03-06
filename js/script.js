const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: -2,
  dy: -2,
  radius: 5,
  color: "#0095DD",
  speed: 10,
}
let dx = -2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

let brick = {
  rowCount: 3,
  colCount: 5,
  width: 75,
  height: 20,
  padding: 10,
  offsetTop: 30,
  offsetLeft: 30,
}

let bricks = [];
for (let c = 0; c < brick.colCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brick.rowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

function drawBricks() {
  for (let c = 0; c < brick.colCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      const brickX = (c * (brick.width + brick.padding)) + brick.offsetLeft;
      const brickY = (r * (brick.height + brick.padding)) + brick.offsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brick.width, brick.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

let paddle = {
  height: 10,
  width: 75,
  dx: 5,
}
let paddleX = (canvas.width - paddle.width) / 2;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
  if (e.keyCode == 39) rightPressed = true;
  else if (e.keyCode == 37) leftPressed = true;
}

function keyUpHandler(e) {
  if (e.keyCode == 39) rightPressed = false;
  else if (e.keyCode == 37) leftPressed = false;
}

function generateRandom(min, max) {
  let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum
}

function changeBallColor() {
  ball.color = `rgba(${generateRandom(0, 255)}, ${generateRandom(0, 255)}, ${generateRandom(0, 255)})`;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
    changeBallColor();
  }
  if (ball.x + ball.dx < ball.radius || ball.x + ball.dx > canvas.width - ball.radius) {
    ball.dx = -ball.dx;
    changeBallColor();
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddleX && ball.x < paddleX + paddle.width) ball.dy = -ball.dy;
    else {
      // alert('Game Over!');
      document.location.reload();
    }
  }

  if (rightPressed && paddleX < canvas.width - paddle.width) { paddleX += paddle.dx; }
  else if (leftPressed && paddleX > 0) { paddleX -= 7; }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, ball.speed);