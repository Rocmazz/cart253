/**
 * Art Jam: Self Portrait
 * Noureddine Mazzene
 * 
 * A self portrait of myself using p5
 */


"use strict";

// Skin Tone
let skin = "#BD8B5AFF"


// My Head
let nourHead = {
    // Position and size
    x:300,
    y:300,
    w:300,
    h:325,
}

let nourBody = {
  //Position and size
  x: 300,
  y: 600,
  w: 500,
  h: 320,
  //shirt color
  color: "#1071bc",
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 600);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000FF");
    drawNourBody();
    drawNourHead();
}



// Draw Head
function drawNourHead(){
    push();
    noStroke();
    fill(skin);
    ellipse(nourHead.x, nourHead.y, nourHead.w, nourHead.h)
    pop();
}

function drawNourBody() {
  push();
  noStroke();
  fill(nourBody.color);
  ellipse(nourBody.x, nourBody.y, nourBody.w, nourBody.h);
  pop();
}