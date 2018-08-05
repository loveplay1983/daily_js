// JavaScript code goes here
var canvas = document.getElementById('myCanvas');
// The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
var ctx = canvas.getContext('2d');

// BASIC
// // prints a red square on the Canvas
// // The CanvasRenderingContext2D.beginPath() method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
// ctx.beginPath();
// // the first two values specify the coordinates of the top left corner of the rectangle on the canvas, while the second two specify the width and height of the rectangle
// ctx.rect(20, 20, 50, 50);
// ctx.fillStyle = '#FF0000';
// ctx.fill();
// ctx.closePath();
//
// // draw a circle
// ctx.beginPath();
// /*
//   x and y coordinates of the arc's center
//   arc radius
//   start angle and end angle (what angle to start and finish drawing the circle, in radians)
//   direction of drawing (false for clockwise, the default, or true for anti-clockwise.) This last parameter is optional.
//  */
// ctx.arc(240, 160, 20, 0, Math.PI * 1.2, false);
// ctx.fillStyle = 'green';
// ctx.fill();
// ctx.closePath();
//
// // draw a new rect with only the outline instead of filling the content
// ctx.beginPath();
// ctx.rect(120, 20, 100, 40);
// ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.stroke();
// ctx.closePath();


// STEP 2
// // draw red arc
// function drawRed() {
//   ctx.beginPath();
//   ctx.arc(50, 50, 10, 0, Math.PI * 2);
//   ctx.fillStyle = 'red';
//   ctx.fill();
//   ctx.closePath();
// }
// // draw blue arc
// function drawBlue() {
//   ctx.beginPath();
//   ctx.arc(50, 50, 10, 0, Math.PI * 2);
//   ctx.fillStyle = '#0000FF';
//   ctx.fill();
//   ctx.closePath();
// }
// setInterval(drawRed, 5);
// setInterval(drawBlue, 1);


var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

function draw() {
  ctx.beginPath();
  // The CanvasRenderingContext2D.clearRect() method of the Canvas 2D API sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black, erasing any previously drawn content.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  // add or sub x and y 2 pixel each time the draw() is done
  x += dx;
  y += dy;
}
setInterval(draw, 10);
