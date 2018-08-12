var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width / 2;
var y = canvas.height - 30;
// log
console.log(canvas.width, canvas.height, x, y)

var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
//log
console.log(paddleX);

var leftPressed = false;
var rightPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  // ctx.fillStyle = "#0095DD";
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  // ctx.fillStyle = '#0095DD';
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // clear ball moving trace
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw the ball and paddle on canvas
  drawBall();
  drawPaddle();

  // ball move logic
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  // paddle move logic
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

}

setInterval(draw, 10);
