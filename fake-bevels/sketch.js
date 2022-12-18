let x0, y0, x1, y1;

const paddingX = 80;
const paddingY = 80;
const bebelWidth = 20;
const bebelSeparation = 40;

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 14);
  frameRate(60);
  smooth(16);

  x0 = paddingX;
  y0 = paddingY;
  x1 = windowWidth - paddingX;
  y1 = windowHeight - paddingY;

  strokeWeight(0.5);
  noStroke();

}

function draw() {
  background(255);
  drawBevelGrid();
}

function drawBevelGrid(){
  //stroke(1,128);
  drawBevels(x0, y0, x1, y1, bebelSeparation, bebelWidth, true, true, '#EB6440');
  drawBevels(x0, y0, x1, y1, bebelSeparation, bebelWidth, true, false, '#D6E4E5');
  drawBevels(x0, y0, x1, y1, bebelSeparation, bebelWidth, false, true, '#497174');
  drawBevels(x0, y0, x1, y1, bebelSeparation, bebelWidth, false, false, '#FFFFFF');
}

function drawBevels(px0, py0, px1, py1, sep, w, isHorizontal, ltr, color){
  fill(color);
  
  let count = isHorizontal ? (py1 - py0)/sep : (px1 - px0)/sep;

  for(let i = 0; i < count; i++){
    let interval = i*sep;
    if(isHorizontal){
      if(ltr)
        drawBevel(px0, py0 + interval, px1 + w, py0 + w + interval);
      else
        drawBevel(px1 + w, py0 + w + interval, px0, py0 + interval);
    } else {
      if(ltr)
        drawBevel(px0 + interval, py1 + w, px0 + w + interval, py0);
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