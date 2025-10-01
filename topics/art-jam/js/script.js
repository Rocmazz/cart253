/**
 * Art Jam: Self Portrait
 * Noureddine Mazzene
 *
 * A self portrait of myself using p5
 */

"use strict";

// Skin Tone
let skin = "#BD8B5AFF";

// My Head
let nourHead = {
  // Position and size
  x: 300,
  y: 300,
  w: 300,
  h: 325,
};

let nourBody = {
  //Position and size
  x: 300,
  y: 600,
  w: 500,
  h: 320,
  //shirt color
  color: "#1071bc",
};

let nourEyes = {
  //Left Eye Size & Proportions
  L: {
    x: 240,
    y: 280,
    w: 75,
    h: 50,
  },
  //Right Eye Size & Proportions
  R: {
    x: 360,
    y: 280,
    w: 75,
    h: 50,
  },
};

let nourIris = {
  //Left Iris Size & Proportions
  L: {
    x: 240,
    y: 280,
    w: 35,
    h: 35,
  },
  //Right Iris Size & Proportions
  R: {
    x: 360,
    y: 280,
    w: 35,
    h: 35,
  },
};

/**
 * Create the canvas
 */
function setup() {
    angleMode(DEGREES)
  createCanvas(600, 600);
}

/**
 * Draw My Self Portrait
 */
function draw() {
  background("#595959FF");
  drawNourBody();
    drawNourHairBack();
  drawNourHead();
  drawNourEyes();
  drawNourIris();
  drawNourMouth();
  drawNourHairline();
  drawNourBraid();
}

// Draw Head
function drawNourHead() {
  push();
  noStroke();
  fill(skin);
  ellipse(nourHead.x, nourHead.y, nourHead.w, nourHead.h);
  pop();
}
//Draw Body
function drawNourBody() {
  push();
  noStroke();
  fill(nourBody.color);
  ellipse(nourBody.x, nourBody.y, nourBody.w, nourBody.h);
  pop();
}

//Draw Eyes
function drawNourEyes() {
  push();
  noStroke();
  fill("#FFFFFFEE");
  ellipse(nourEyes.L.x, nourEyes.L.y, nourEyes.L.w, nourEyes.L.h);
  ellipse(nourEyes.R.x, nourEyes.R.y, nourEyes.R.w, nourEyes.R.h);
  pop();
}

//Draw Iris
function drawNourIris() {
  push();
  noStroke();
  fill("#000000EE");
  ellipse(nourIris.L.x, nourIris.L.y, nourIris.L.w, nourIris.L.h);
  ellipse(nourIris.R.x, nourIris.R.y, nourIris.R.w, nourIris.R.h);
  pop();
}

function drawNourMouth() {
  push();
  noStroke();
  fill("#FFFFFFEE");
  arc(300, 375, 100, 70, 0, 180)
  pop();
}

function drawNourHairline() {
  push();
  noStroke();
  fill("#000000EE");
  arc(300, 195, 230, 115, 180, 360);
  pop();
}

function drawNourHairBack(){
  push();
  noStroke();
  fill("#000000EE");
 ellipse(300,175,100);
    stroke("#000000EE");  
 strokeWeight(20);
   line(170, 250, 180, 500);
   line(195, 185, 205, 500);
   line(235, 185, 245, 500);
   line(355, 185, 345, 500);
   line(395, 185, 385, 500);
   line(420, 250, 410, 500);
  pop();


}

function drawNourBraid() {
 push();
    stroke("#000000EE");
    strokeWeight(20);
    line(200, 185, 200, 400);
    strokeWeight(20);
    line(240, 185, 240, 400);
        stroke("#000000EE");
        strokeWeight(20);
        line(350, 185, 350, 400);
        strokeWeight(20);
        line(390, 185, 390, 400);
  pop();
}  