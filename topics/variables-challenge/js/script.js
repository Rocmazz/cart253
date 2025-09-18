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
  rage: {
    speed: 0.5,
    startX: 200,
    endX: 200,
    startY: 200,
    endY: 200,
    velocity:0.1,
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
  //logging the velocity to make sure it accelerates slowly and reaches a max
  console.log(mrFurious.rage.velocity)

  //Make Mr. Furios turn red
  mrFurious.fill.g = mrFurious.fill.g - mrFurious.rage.velocity;
  mrFurious.fill.g =constrain(mrFurious.fill.g,0,255);
  mrFurious.fill.b = mrFurious.fill.b - mrFurious.rage.velocity;
  mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);

  ///Make Mr. Furious Shake
  mrFurious.rage.startX = random(197, 203);
  mrFurious.rage.startY = random(197, 203);
  //Full shake at the end
  mrFurious.rage.endX = random(180, 220);
  mrFurious.rage.endY = random(180, 220);
  //Shake acceleration variable
  mrFurious.rage.velocity = mrFurious.rage.velocity + 0.001;
  mrFurious.rage.velocity = constrain(mrFurious.rage.velocity, 0, 2)
  //Shaking from starting velocity to ending velocity
  mrFurious.x = lerp(mrFurious.rage.startX, mrFurious.rage.endX, mrFurious.rage.velocity)
  mrFurious.x = constrain(mrFurious.x, 180, 220)
  mrFurious.y = lerp(mrFurious.rage.startY, mrFurious.rage.endY, mrFurious.rage.velocity)
  mrFurious.y = constrain(mrFurious.y, 180, 220);

  //Turn the sky black
  sky.fill.r = sky.fill.r - 1;
  sky.fill.r = constrain(sky.fill.r,0,255);
  sky.fill.g = sky.fill.g - 1;
  sky.fill.g = constrain(sky.fill.g, 0, 255);
  sky.fill.b = sky.fill.b - 1;
  sky.fill.b = constrain(sky.fill.b, 0, 255);

  //Bird flies back and forth (looped)
  bird.x = 300 * sin(frameCount * 0.05) + 200;
  bird.x = constrain(bird.x, -25, 425)
  //bird bounces up and down
  bird.y = 30 * sin(bird.x * 0.04) + 100;

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