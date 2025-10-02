/**
 * Art Jam: Self Portrait
 * Noureddine Mazzene
 *
 * A self portrait of myself using p5
 */

"use strict";

//defines the user
const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 30,

};

// Skin Tone
let skin = "#BD8B5AFF";

//Hair color
let hair = {
  color: "#000000EE",
  braid:{
  startX: 200,
  startY: 185,
  tipX: 200,
  tipY: 400,
  size: 20,
}
};

// My Head
let nourHead = {
  // Position and size
  x: 300,
  y: 300,
  w: 300,
  h: 325,
};

// My Body
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

let bgColor = 0
    

/**
 * Create the canvas
 */
function setup() {
  // Set up angle mode for the smile arc
    angleMode(DEGREES)
  createCanvas(600, 600);
}

/**
 * Draw My Self Portrait
 */
function draw() {
    
  // set the background
  background(bgColor, 5, 80);
  // Make the background shift from blue to red and loop it
    bgColor += 0.4
    if (bgColor >= 255) {
      bgColor = 0;
    };
    

  // Move  user circle
  moveUser();

  // draw Me in order of appearance
  drawNourBody();
  drawNourHairBack();
  drawNourHead();
  drawNourEyes();
  drawNourIris();
  drawNourMouth();
  drawNourHairline();
  drawNourBraid();

// draw user circle
  drawUser();

  // make front braids able to be pulled and moved
  moveBraid();

  //adds trail to mouse user
mouseDragged();

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
  // Left eye
  ellipse(nourEyes.L.x, nourEyes.L.y, nourEyes.L.w, nourEyes.L.h);
  // Right eye
  ellipse(nourEyes.R.x, nourEyes.R.y, nourEyes.R.w, nourEyes.R.h);
  pop();
}

//Draw Iris
function drawNourIris() {
   const irisFollow = 4; // how far the pupils can move
   // Map mouse to small offset of the eyes and iris
   const irisX = map(user.x, 0, width, -irisFollow, irisFollow);
   const irisY = map(user.y, 0, height, -irisFollow, irisFollow);
    push();
  
  noStroke();
  fill("#000000EE");
  // left iris
ellipse(nourIris.L.x + irisX, nourIris.L.y + irisY, nourIris.L.w, nourIris.L.h);
//right iris
ellipse(nourIris.R.x + irisX, nourIris.R.y + irisY, nourIris.R.w, nourIris.R.h);
  pop();
}

// draw my mouth
function drawNourMouth() {
  push();
  noStroke();
  fill("#FFFFFFEE");
  arc(300, 375, 100, 70, 0, 180)
  pop();
}

//draw base hair line
function drawNourHairline() {
  push();
  noStroke();
  fill(hair.color);
  arc(300, 195, 230, 115, 180, 360);
  pop();
}

// draw the hair behind the head
function drawNourHairBack(){
  push();
  noStroke();
  //Back hairbun
  fill(hair.color);
 ellipse(300,175,100);
 // back braids left to right
    stroke(hair.color);  
 strokeWeight(20);
   line(170, 250, 180, 500);
   line(195, 185, 205, 500);
   line(235, 185, 245, 500);
   line(355, 185, 345, 500);
   line(395, 185, 385, 500);
   line(420, 250, 410, 500);
  pop();


}

//draws the braids
function drawNourBraid() {
 push();
    stroke(hair.color);
    strokeWeight(hair.braid.size);
    line(hair.braid.startX, hair.braid.startY, hair.braid.tipX, hair.braid.tipY);
  line(hair.braid.startX+15, hair.braid.startY, hair.braid.tipX+15, hair.braid.tipY);
  pop();
}  


 // Sets the user position to the mouse position
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(40, 40, 60, 60);
  
  ellipse(user.x, user.y, user.size);
  pop();
}

// function for braids to be pulled and dragged
function moveBraid() {
  // Calculate distance between user and puck and overlap
  const d = dist(user.x, user.y, hair.braid.tipX, hair.braid.tipY);

  const overlap = d < user.size / 2 + hair.braid.size / 2;

  const overlapRight = user.x > hair.braid.tipX;
  const overlapLeft = user.x < hair.braid.tipX;
  const overlapUp = user.y > hair.braid.tipY;
  const overlapDown = user.y < hair.braid.tipY;

  // overlap check to make puck move (the movement is very specific so mostly diagonal movement happens)
  if (overlap && overlapRight) {
    hair.braid.tipX -= 1;
  }
  if (overlap && overlapLeft) {
    hair.braid.tipX += 1;
  }
  if (overlap && overlapUp) {
    hair.braid.tipY -= 1;
  }
  if (overlap && overlapDown) {
    hair.braid.tipY += 1;
  }
}

// mouse outline 
function mouseDragged() {
  // from the previous position to the current position
  stroke(hair.color);
   strokeWeight(20);
  line(pmouseX, pmouseY, mouseX, mouseY);
}