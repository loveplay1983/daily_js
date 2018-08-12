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

//bricks init
/*
Here we've defined the number of rows and columns of bricks , their width and height, the padding between the bricks so they won't touch each other and a top and left offset so they won't start being drawn right from the edge of the Canvas.
 */
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;




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

  // if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
  //   dy = -dy;
  // }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // check whether the ball center x coordinate is in between the length of paddle
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert('Game Over!');
      document.location.reload();
    }
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
