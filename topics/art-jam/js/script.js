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
  drawNourHead();
  drawNourEyes();
  drawNourIris();
  drawNourMouth();
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