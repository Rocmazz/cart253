/**
 * Instructions Landscape Challenge
 * Noureddine Mazzene
 * 
 * Making a landscape using p5
 * 
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400)
}


/**
 * Sets the background, draws the landscape
*/
function draw() {
  //The Sky
  background("#4a8aef");

  //Mountain Far Back
  drawMountain();

  //Grassy Hill
  drawGrassyHill();

  //Grassy Hill Foreground
  drawGrassyHillForeground();

  //Shading the sky
  drawSkyShading();

  //Clouds
  drawClouds();
}

function drawGrassyHill() {
  //Flat Grassy Surface
  push();
  noStroke();
  fill("#86ae30");
  rect(0, 300, 400, 150);
  pop();

  // Left Hill Top
  push();
  noStroke();
  fill("#86ae30");
  ellipse(150, 350, 550, 250);
  pop()

  // Right Hill Top
  push();
  noStroke();
  fill("#86ae30");
  ellipse(475, 390, 550, 250);
  pop()
}

function drawGrassyHillForeground() {
  // Right Foreground hill
  push();
  noStroke();
  fill("#709628");
  ellipse(350, 450, 850, 250);
  pop();

  // Left Foreground hill
  push();
  noStroke();
  fill("#618125FF");
  ellipse(0, 470, 850, 250);
  pop();
}

function drawSkyShading() {
  // First layer of shading
  push();
  noStroke();
  fill("#508EF2FF");
  ellipse(385, 35, 850, 250);
  pop();

  // First layer of shading
  push();
  noStroke();
  fill("#5794F6FF");
  ellipse(400, 0, 850, 250);
  pop();

  // Second Layer Of Shading
  push();
  noStroke();
  fill("#6DA5FFFF");
  ellipse(415, -35, 850, 250);
  pop();
}

function drawClouds() {
  // First Cloud
  push();
  noStroke();
  fill("#FFFFFFFF");
  ellipse(200, 100, 90, 40);
  ellipse(220, 90, 100, 60);
  ellipse(240, 100, 110, 40);
  pop();

  // Second Cloud
  push();
  noStroke();
  fill("#FFFFFFFF");
  ellipse(60, 150, 100, 50);
  ellipse(80, 140, 105, 70);
  ellipse(100, 150, 118, 40);
  pop();
}

function drawMountain() {
//First Mountain
push();
noStroke();
fill("#296AD2FF");
triangle(280, 300, 420, 300, 360, 230)


//Second Mountain
push();
noStroke();
fill("#3172DCFF");
triangle(340, 300, 420, 300, 380, 230)
}