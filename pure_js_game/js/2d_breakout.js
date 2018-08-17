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

// score
var score = 0

// define brick body list
/*
The code above will loop through the rows and columns and create the new bricks. NOTE that the brick objects will also be used for collision detection purposes later.
 */
 // bricks list will hold the brichs position as well as their status 0 or 1
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      // set bricks position and status to 1
      x: 0,
      y: 0,
      status: 1
    }; // loop through all the [brickX description]bricks and set default values "ZERO"
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

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

function mouseMoveHandler(e){
  // e.clientX returns the x position of current mouse location and canvas.offsetLeft is the distance between the page left edge to the canvas left edge, in another words, it represents the mouse pointer starts from the exactly left edge of the canvas
  //
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;
  }
}

// ball bricks collision detection
// If the center of the ball is inside the coordinates of one of our bricks, we'll change the direction of the ball. For the center of the ball to be inside the brick, all four of the following statements need to be true
//
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      // define the b variable for storing the brick object
      // in every loop of the collision detection
      var b = bricks[c][r];
      // b.x and b.y stands for each ball with corresponding coordinate
      // if ball x and y coordinate greater than the center coordinate of ball
      // or less than the brick width or height
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          // ball goes down
          dy = -dy;
          // switch brick position status to 0
          b.status = 0;
          // each time the brick is hit, score will be added 1
          score++;
          // if all the bricks are hit, notify player the winning message and restart game
          if(score === brickRowCount * brickColumnCount) {
            alert('You Win, Nice Work!!!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// draw the score
function drawScore(){
  ctx.font = '16px Arial';
  ctx.fillStyle = '#FFBB33';
  ctx.fillText('Score: ' + score, 8, 20)
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

// brick drawing logic
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      /*

      vivid expression of x and y position calculation logic

      c-> column index 0, 1, 2, 3, ...etc
      r-> row index 0, 1, 2, 3, ...etc
      with each column and each row, for example col starts from0 and row starts from 0 too,

      0*(brickWidth+brickPadding) + brickOffsetLeft -> the offset distance between left wall the first brickObject,
      0*(brickHeight+brickPadding) + brickOffsetTop -> the offset distance between top wall and the first brickObject,

      1*(brickWidth+brickPadding) + brickOffsetLeft -> the offset distance between padding + first brick width + left offset to the second brickObject along X axis,
      1*(brickHeight+brickPadding) + brickOffsetTop -> the offset distance between padding + first brick height + top offset to the secnd brickObject along Y axis,

                      _____1stbrickWidth_____brickPadding  + brickOffsetLeft 2ndbrickWidth
      |1stbrickHeight|
      |              |
      |brickPadding  |
            +
      brickOffsetTop
      2ndbrickHeight
      .....
      .
      .
      .
      .
       */
      if (bricks[c][r].status === 1) { // draw the bricks if status is 1 , don't draw otherwise.
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX; // set x and y coordinate to 0
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095AA';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  // clear ball moving trace
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw the ball and paddle on canvas
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

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
