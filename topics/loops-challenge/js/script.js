/**
 * Lines
 * Noureddine Mazzene
 *
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
//   background("pink");


  let x1 = 0
  let x2 = 0
  let y1 = 0
  let y2 = 0
  let distance = 50

  let baseStroke = 0
  let strokeAdd = 25


  gradientBG();



  while (x1 <= width) {
      stroke(baseStroke);
      line(x1, x2, y1, height);

      x1 += distance;
      y1 += distance;
      baseStroke += strokeAdd;
  }

  baseStroke = 0

  while (x2 <= height) {
      stroke(baseStroke);
      line(0, x2, width, y2);

      x2 += distance;
      y2 += distance;
      baseStroke += strokeAdd;
    }


    


}

function gradientBG() {
  push();
  for (let x1 = 0; x1 <= width; x1++) {
    let r = map(x1, 0, width, 0, 255); 
    let g = map(x1, 0, width, 255, 0); 
    stroke(r, g, 0);
    line(x1, 0, x1, height);
  }
  pop();
}