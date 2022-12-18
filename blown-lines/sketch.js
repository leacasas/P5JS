let x0, y0, x1, y1;
function setup() {
  createCanvas(windowWidth - 10, windowHeight - 14);

  frameRate(60);

  x0 = 100;
  y0 = 100;
  x1 = windowWidth - 100;
  y1 = y0;

  background(220);
}

function draw() {
  background(220);

  stroke(20, 80);
  strokeWeight(1);
  drawLine(x0, y0, x1, y1);
}

function drawLine(x0, y0, x1, y1){
  let r = 5;
  let rnd = random(-r,r);
  let x = x0;
  
  while(x <= x1){
    rnd = random(-r,r);
    line(x0, y0, x++, y1+rnd);
    x0 = x;
  }
}