/**
 * Mr. Furious
 * Noureddine Mazzene
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225,
  },
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(160, 180, 200);
  drawMrFurious();

  //Make Mr. Furios turn red
  mrFurious.fill.g = mrFurious.fill.g - .4;
  mrFurious.fill.b = mrFurious.fill.b - .4;
}

// Draw Mr. Furious as a coloured circle
function drawMrFurious(){  
    push();
      noStroke();
     fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
     pop();
}