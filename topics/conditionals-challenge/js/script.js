/**
 * Circle Master
 * Noureddine Mazzene
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000",
  //just to check if overlap code works
  fills: {
    noOverlap: "#ff0000", // red for no overlap
    overlapR: "#00ff00", // green for overlap right
    overlapL: "#2F00FFFF", // green for overlap left
    overlapU: "#FF00B7FF", // green for overlap up
    overlapD: "#EEFF00FF", // green for overlap down
  },
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000",
};

const target = {
    x: 300,
    y: 320,
    size: 40,
    fill: "#0055FFFF", //default
    fills: {noOverlap: "#0055FFFF", // blue for no overlap
        overlap: "#00ff00", // green for overlap right
    },

}



/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");



  // Move user circle
  moveUser();

  // Draw the user and puck
  drawUser();
  drawPuck();

  // Pushes the Puck Through the user
  movePuck();

  //Draw the target for the puck
  drawTarget();

  //Checks if the puck is overlapping with the puck
  checkTarget();
}

/**
 * Sets the user position to the mouse position
 */
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
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

// Displays the Target circle
function drawTarget() {
  push();
  noStroke();
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}

function movePuck() {
  // Calculate distance between user and puck and overlap
  const d = dist(user.x, user.y, puck.x, puck.y);

  const overlap = d < user.size / 2 + puck.size / 2;

  const overlapRight = user.x > puck.x 
  const overlapLeft = user.x < puck.x; 
  const overlapUp = user.y > puck.y;
  const overlapDown = user.y < puck.y; 

  // overlap check to make puck move (the movement is very specific so mostly diagonal movement happens)
  if (overlap && overlapRight) {
    puck.x -= 1;
  } 
   if (overlap && overlapLeft) {
    puck.x += 1;
  } 
   if (overlap && overlapUp) {
    puck.y -= 1;
  } 
  if (overlap && overlapDown) {
    puck.y += 1;
  } 
} 
function checkTarget() {
  // Calculate distance between user and puck and overlap
  const targetD = dist(puck.x, puck.y, target.x, target.y);

  const targetOverlap = targetD < puck.size / 2 + target.size / 2;

  if (targetOverlap) {
    target.fill = target.fills.overlap;
  } else {
    target.fill = target.fills.noOverlap;
  }
}
