/**
 * Frog Game
 * Noureddine Mazzene
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * 
 * Changes List:
 * -Start, Win screen & Game Over Screen (game states)
 * -Win condition: Eat 10 flies in a row
 * -Lose condition: Miss 3 flies
 * -UI For score in game
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//MOD: defining game states
let gameState = "title"; // "title" or "play" or "lose"
let titleImage;          // the title screen image

//MOD: defining win/loss conditions and scoring
let streak = 0; //total flies eaten in a row
let misses = 0; // total flies missed
const winStreak = 10; // eating 10 in a row = win
const maxMiss = 3; // missing 3 = loss


// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

// MOD: Preloading assests for the game
function preload() {
  // Preloads title screen image
  titleImage = loadImage("assets/images/title-screen.png");
}




/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

// MOD: Adding game states to the draw function for the title screen 
function draw() {
    if (gameState === "title") {
        // MOD: Title Screen State
        image(titleImage, 0, 0, width, height);
    }

    else if (gameState === "play") {
      //MOD: Gameplay State
      background("#87ceeb");
      moveFly();
      drawFly();
      moveFrog();
      moveTongue();
      drawFrog();
      checkTongueFlyOverlap();

      //MOD: Temporary UI for scoring
      push();
      fill(0);
      textSize(16);
      textAlign(LEFT, TOP);
      text("Streak: " + streak, 10, 10);
      text("Misses: " + misses + " / " + maxMiss, 10, 30);
      pop();
    }

    //MOD: Win Screen State (Temporary until image made)
    else if (gameState === "win") {
      background("#87ceeb");
      push();
      textAlign(CENTER, CENTER);
      fill(0);
      textSize(32);
      text("YOU WIN!", width / 2, height / 2 - 20);
      textSize(18);
      text("You ate " + streak + " flies in a row!", width / 2, height / 2 + 20);
      pop();
    }

    //MOD: Lose Screen State (Temporary until image made)
    else if (gameState === "lose") {
      background("#87ceeb");
      push();
      textAlign(CENTER, CENTER);
      fill(0);
      textSize(32);
      text("GAME OVER", width / 2, height / 2 - 20);
      textSize(18);
      text("You missed " + misses + " flies...", width / 2, height / 2 + 20);
      pop();
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        // MOD: Change to handleMiss to calculate lose condition
        handleMiss();
    }
}

/**
 * MOD: New function to check misses and loss
 * Handles a miss when a fly goes past the canvas
 */
function handleMiss() {
    misses += 1;
    streak = 0; // breaks the streak when there's a miss

    //loss condition
    if (misses >= maxMiss) {
        gameState = "lose";
    }

    // call back to resetFly to bring new ones again
    resetFly();
}



/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 * MOD: Adding scoring and win condition to this function
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // MOD: Eat streak added
        streak += 1;

        //MOD: Win condition to see if 10 were eating in a row
        if (streak >= winStreak) {
            gameState = "win";
        }

        //MOD: keeping the resetFly function to bring back flies even when eating
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
//MOD: Adding game states to mousePresssed for title screen
function mousePressed() {
  if (gameState === "title") {
    // MOD: Starts the game in the title screen
    gameState = "play";
  } 

  else if (gameState === "play") {
    // MOD: Orignial Tongue Control
    if (frog.tongue.state === "idle") {
      frog.tongue.state = "outbound";
    }
  }

  else if(gameState === "win"){
    //MOD: Click on win to reset game
    resetGame();
    gameState = "title";
  }

else if(gameState === "lose"){
    //MOD: Click on win to reset game
    resetGame();
    gameState = "title";  
  }
}

//MOD: Function to reset the game and refresh all stats
function resetGame() {
    streak = 0;
    misses = 0;

    // Resets the frog
    frog.tongue.state = "idle";
    frog.tongue.y = 480;

    //Resets the flies
    resetFly();
}