let x0, y0, x1, y1;

const paddingX = 80;
const paddingY = 80;
const bevelWidth = 10;
const bevelSeparation = 20;

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 14);
  frameRate(60);
  smooth(16);

  x0 = paddingX;
  y0 = paddingY;
  x1 = windowWidth - paddingX;
  y1 = windowHeight - paddingY;

  strokeWeight(bevelWidth*0.25);
  noStroke();
}

function draw() {
  background(255);
  //stroke(255)
  let off = (0.5+noise(frameCount*0.03)) * 300;
  drawBevelGrid(off);
}

function drawBevelAltGrid(off){
  drawBevels(x0 + off, y0, x1, y1, bevelSeparation, bevelWidth, true, false, '#242410');
  drawBevels(x0, y0 + off, x1, y1, bevelSeparation, bevelWidth, false, true, '#EB6440');
  drawBevels(x0, y0, x1, y1 - off, bevelSeparation, bevelWidth, false, false, '#497174');
  drawBevels(x0, y0, x1 - off, y1, bevelSeparation, bevelWidth, true, true, '#FFF');

  fill(color);
  
  let count = isHorizontal ? (py1 - py0)/sep : (px1 - px0)/sep;

  for(let i = 0; i < count; i++){
    let interval = i*sep;
    if(isHorizontal){
      if(ltr){
        drawBevel(px0, py0 + interval + w, px1 + w, py0 + w + w+ interval);
      }
      else{
        drawBevel(px1 + w, py0 + w + interval, px0, py0 + interval);
      }
    } else {
      if(ltr){
        drawBevel(px0 + interval + w, py1 + w, px0 + w + w + interval, py0);
      }
      else{
        drawBevel(px0 + w + interval, py0, px0 + interval, py1 + w);
      }
    }
  }

}

function drawBevelGrid(off){
  drawBevels(x0 + off, y0, x1, y1, bevelSeparation, bevelWidth, true, false, '#242410');
  drawBevels(x0, y0 + off, x1, y1, bevelSeparation, bevelWidth, false, true, '#EB6440');
  drawBevels(x0, y0, x1, y1 - off, bevelSeparation, bevelWidth, false, false, '#497174');
  drawBevels(x0, y0, x1 - off, y1, bevelSeparation, bevelWidth, true, true, '#FFF');

}

function drawBevels(px0, py0, px1, py1, sep, w, isHorizontal, ltr, color){
  fill(color);
  
  let count = isHorizontal ? (py1 - py0)/sep : (px1 - px0)/sep;
  
  for(let i = 0; i < count; i++){
    let interval = i*sep;
    if(isHorizontal){
      if(ltr)
        drawBevel(px0, py0 + interval + w, px1 + w, py0 + w + w + interval);
      else
        drawBevel(px1 + w, py0 + w + interval, px0, py0 + interval);
    } else {
      if(ltr)
        drawBevel(px0 + interval + w, py1 + w, px0 + w + w + interval, py0);
      else
        drawBevel(px0 + w + interval, py0, px0 + interval, py1 + w);
    }
  }
}

function drawBevel(px0, py0, px1, py1){
  beginShape();

  vertex(px0, py0);
  vertex(px1, py0);
  vertex(px0, py1);
  vertex(px0, py0);

  endShape();
}

function keyPressed(){
  if(key == 's')
    save("fake-bevels.png");
}