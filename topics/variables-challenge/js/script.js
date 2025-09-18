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

//The Sky (or simply the background)
let sky = {
//Color
    fill:{
     r: 160,
     g: 180,
     b: 200,
    },
};

// The Annoying Bird
let bird = {
  // Position and size
  x: -25,
  y: 120,
  size: 25,
  // Colour
  fill: {
    r: 255,
    g: 255,
    b: 255,
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
  background(sky.fill.r, sky.fill.g, sky.fill.b);
  drawMrFurious();
  drawBird()

  //Make Mr. Furios turn red
  mrFurious.fill.g = mrFurious.fill.g - .5;
  mrFurious.fill.g =constrain(mrFurious.fill.g,0,255);
  mrFurious.fill.b = mrFurious.fill.b - .5;
  mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);

  //Make Mr. Furious Shake
  mrFurious.x = random(197,203)
  mrFurious.y = random(197, 203);

  //Turn the sky black
  sky.fill.r = sky.fill.r - 1;
  sky.fill.r = constrain(sky.fill.r,0,255);
  sky.fill.g = sky.fill.g - 1;
  sky.fill.g = constrain(sky.fill.g, 0, 255);
  sky.fill.b = sky.fill.b - 1;
  sky.fill.b = constrain(sky.fill.b, 0, 255);

  //Bird flies from left to right
  bird.x = bird.x+1.5
  bird.x = constrain(bird.x, -25, 425)
  //bird bounces up and down
  bird.y = 30 * sin(bird.x * 0.1) + 100;

}

// Draw Mr. Furious as a coloured circle
function drawMrFurious(){  
    push();
      noStroke();
     fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
     pop();
}

// Draw bird as a coloured circle
function drawBird(){  
    push();
      noStroke();
      fill(bird.fill.r, bird.fill.g, bird.fill.b);
      ellipse(bird.x, bird.y, bird.size);
     pop();
}