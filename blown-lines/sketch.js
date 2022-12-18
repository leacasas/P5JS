let x0, y0, x1, y1, count;

const paddingX = 100;
const paddingY = 100;
const divs = 20;
const noiseHeigth = 200;
function setup() {
  createCanvas(windowWidth - 10, windowHeight - 14);

  //frameRate(60);
  smooth(16);
  blendMode(MULTIPLY);

  x0 = paddingX;
  y0 = paddingY;
  x1 = windowWidth - paddingX;
  y1 = y0;
  count = round(((windowHeight - 14 - paddingY) - y0) / divs);
  background(220);
}

function draw() {
  //background(220);

  stroke(60, 4);
  strokeWeight(1);
  noFill();

  drawLines(x0, y0, x1, y1, count, divs, noiseHeigth);
}

function drawLines(x0, y0, x1, y1, count, separation, span){
  let y = y0;
  for(let i = 0 ; i < count; i++){
    drawLine(x0, y + i*separation, x1, y+i*separation, span);
  }
}

function drawLine(x0, y0, x1, y1, h){
  let t = y0 + frameCount * 0.005;

  beginShape();

  for(let i = x0; i < x1; i++){
    let r = i / 100;
    let d = (i / 1000)*(i/1000);
    let y = y0 + (noise(r, t) - 0.5) * (h * d);
    vertex (i + random(-0.55,0.55), y);
  }

  endShape();
}