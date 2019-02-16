var canvasWidth = 480, canvasHeight = 360;
var centerX = canvasWidth/2, centerY = canvasHeight/2;
var radiusMajor = canvasHeight/2 - 10;
var radiusMinor = radiusMajor - 20;
var radiusSun = 20;
var radiusEarth = 8;

var imgEarth;

function preload() {
  imgEarth = loadImage('assets/earth_32.png');
  console.log('preload', typeof imgEarth)
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  console.log(canvasWidth, canvasHeight);
  background(245);
  noLoop();
}

function draw() {
  ellipseMode(RADIUS);

  noFill();
  ellipse(centerX, centerY, radiusMajor, radiusMinor);

  fill('#FBC02D');
  circle(centerX, centerY, radiusSun);
  drawDot(centerX, centerY);

  // var rad = radians(90);
  var rad = HALF_PI;
  var earthX = centerX + (radiusMajor * Math.cos(rad));
  var earthY = centerY + (radiusMinor * Math.sin(rad));
  // fill('#76A9FF');
  // circle(earthX, earthY, radiusEarth);
  imageMode(CENTER);
  image(imgEarth, earthX, earthY);
  drawDot(earthX, earthY);
}

function drawDot(x, y) {
  fill(0);
 circle(x, y, 1);
}