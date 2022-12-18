let x0, y0, x1, y1, count, pg;

const paddingX = 80;
const paddingY = 80;
const divs = 6;
const noiseHeigth = 90;
const ta = 0.01;

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 14);
  pg = createGraphics(windowWidth - 10, windowHeight - 14);
  frameRate(60);
  smooth(16);

  x0 = paddingX;
  y0 = paddingY;
  x1 = windowWidth - paddingX;
  y1 = y0;
  count = round(((windowHeight - 14 - paddingY) - y0) / divs);
  background(0);
  pg.noFill();
  pg.strokeWeight(1);
  //pg.blendMode(ADD);
}

function draw() {
  pg.background(0,16);

  drawLines(x0, y0, x1, y1, count, divs, noiseHeigth);

  image(pg,0,0);
}

function drawLines(x0, y0, x1, y1, count, separation, span){
  let y = y0;
  for(let i = 0 ; i < count; i++){
    pg.stroke(0, 255, 0, 192);
    drawLine(x0, y + i*separation, x1, y+i*separation, i, span*1.2);
    pg.stroke(255,0,0, 192);
    drawLine(x0, y + i*separation - 1, x1, y+i*separation - 1, i, span*1.1);
    pg.stroke(0,0,255, 192);
    drawLine(x0, y + i*separation - 1, x1, y+i*separation - 1, i, span);
  }
}

function drawLine(x0, y0, x1, y1, index, h){
  let fc = frameCount;
  //let t = y0 + fc * ta;
  let t = fc * ta + y0*0.01;

  pg.beginShape();

  for(let i = x0; i < x1; i+=30){
    let r = i / 8;
    //let d = (i / 500)*(i/500)*(index/100);
    //let d = sin(r + index/40) * cos(r + index/5);
    let d = 1;
    let y = y0 + (noise(r, t, index * 0.05) - 0.5) * (h * d);
    pg.curveVertex(i, y);
  }

  pg.endShape();
}

function keyPressed(){
  if(key == 's')
    pg.save("noisy-lines.jpg");
}