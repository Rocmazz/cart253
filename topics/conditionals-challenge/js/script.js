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
    overlap: "#00ff00", // green for overlap
  },
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000",
};





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

function movePuck() {
  // Calculate distance between user and puck and overlap
  const d = dist(user.x, user.y, puck.x, puck.y);

  const overlap = d < user.size / 2 + puck.size / 2;

  // test to see if overlap code works
  if (overlap) {
    puck.fill = puck.fills.overlap;
  } else {
    puck.fill = puck.fills.noOverlap;
  }
}