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
  background("pink");

  let x1 = 0
  let x2 = 0
  let y1 =0
  let y2 = height
  let distance = 50

  let baseStroke = 0
  let strokeAdd = 25

  while (x1 <= width) {
      stroke(baseStroke);
      line(x1, x2, y1, y2);

      x1 += distance;
      y1 += distance;
      baseStroke += strokeAdd;
  }



//   stroke(baseStroke);
//   line(x1, x2, y1, y2);

//   stroke(50);
//   line(100, 0, 100, height);

//   stroke(75);
//   line(150, 0, 150, height);

//   stroke(100);
//   line(200, 0, 200, height);

//   stroke(125);
//   line(250, 0, 250, height);

//   stroke(150);
//   line(300, 0, 300, height);

//   stroke(175);
//   line(350, 0, 350, height);

//   stroke(200);
//   line(400, 0, 400, height);

//   stroke(225);
//   line(450, 0, 450, height);

//   stroke(250);
//   line(500, 0, 500, height);
}
