// JavaScript code goes here
//
// Initialize the canvas
//
var canvas = document.getElementById('myCanvas');
// The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

// daraw the ball
function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// clear the ball trace while drawing the ball
function draw(){
  // The CanvasRenderingContext2D.clearRect() method of the Canvas 2D API sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black, erasing any previously drawn content.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawing ball
  drawBall();
  // add or sub x and y 2 pixel each time the draw() is done
  x += dx;
  y += dy;
}

setInterval(draw, 10);
