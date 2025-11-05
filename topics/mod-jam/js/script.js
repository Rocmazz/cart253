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
 * -Adding music
 * -Changing Frog & Background in game
 * -Adding opening splash screen
 * -Adding SFX
 * -New Movement for flies
 * -Adding two states for the frog sprite
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//MOD: defining game states
let gameState = "credit"; // "credit" or "title" or "play" or "lose" or "win"
let titleImage;          // the title screen image
let winImage; // the win screen
let loseImage; // the lose screen

//MOD: defining win/loss conditions and scoring
let streak = 0; //total flies eaten in a row
let misses = 0; // total flies missed
const winStreak = 10; // eating 10 in a row = win
const maxMiss = 3; // missing 3 = loss

//MOD: defining music states
let titleMusic;
let playMusic
let winMusic;
let loseMusic;
//MOD: tracks which song should be playing for the state
let currentMusic = null;

// MOD: defining the sound effects
let sfxClick;
let sfxTongue;
let sfxCatch;
let sfxMiss;

//MOD: defining new frog sprites
let frogPlayClosedImg;
let frogPlayOpenImg;

//MOD: defining ingame background
let gameBgImg

//MOD: defining X icon for misses
let missIconImg

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 420,
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
    speed: 3,

    //MOD: defining modes for different movement
    mode: "straight", // mode can be: straight, sine, jitter
    baseY: 200,
    angle: 0
};

// MOD: Preloading assests for the game
function preload() {
  // MOD: Preloads the screen images
  titleImage = loadImage("assets/images/title-screen.png");
  winImage = loadImage("assets/images/winscreen.png");
  loseImage = loadImage("assets/images/losescreen.png");
  gameBgImg = loadImage("assets/images/background-ingame.png");

   //MOD: Preloads Frog Sprites
   frogPlayClosedImg = loadImage("assets/images/frog_play_closed.png");
   frogPlayOpenImg = loadImage("assets/images/frog_play_open.png");

   //MOD: Preloads X Miss icon
   missIconImg = loadImage("assets/images/miss_x.png")

  //MOD: Preloads music
  titleMusic = loadSound("assets/sounds/title_screen.mp3");
  playMusic = loadSound("assets/sounds/play.mp3");
  winMusic = loadSound("assets/sounds/win.mp3");
  loseMusic = loadSound("assets/sounds/loss.mp3");

  //MOD: Preloads SFX
  sfxClick = loadSound("assets/sounds/click.mp3");
  sfxTongue = loadSound("assets/sounds/tongue.mp3");
  sfxCatch = loadSound("assets/sounds/catch.mp3");
  sfxMiss = loadSound("assets/sounds/miss.wav");
}




/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();

    // MOD: Sets the game state to Title screen
    setGameState("credit");
}

// MOD: Adding game states to the draw function for the title screen 
function draw() {

    if (gameState === "credit"){
        //MOD: Credit screen on game opening
        background(0); // flat black, you can change it

        push();
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(26);
        text("CART 253aa – Mod Jam", width / 2, height / 2 - 40);

        textSize(18);
        text("Noureddine Mazzene", width / 2, height / 2);

        textSize(14);
        text("Click to continue", width / 2, height / 2 + 50);
        pop();
    }

    else if (gameState === "title") {
        // MOD: Title Screen State
        image(titleImage, 0, 0, width, height);
    }

    else if (gameState === "play") {
      //MOD: Gameplay State
      image(gameBgImg, 0, 0)
      moveFly();
      drawFly();
      moveFrog();
      moveTongue();
      drawFrog();
      checkTongueFlyOverlap();

      //MOD: UI for scoring
      drawHUD();
    }

    //MOD: Win Screen State 
    else if (gameState === "win") {
      image(winImage, 0, 0)
      push();
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(32);
      text("You ate " + streak + " flies in a row!", 425, 300);
      pop();
    }

    //MOD: Lose Screen State (Temporary until image made)
    else if (gameState === "lose") {
      image(loseImage, 0, 0);
      push();
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(18);
      text("You missed " + misses + " flies...", 125, height / 2 + 40);
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

    //MOD: Defining all the new modes of movement
    if (fly.mode === "straight"){}
    //Referencing mr angry assignement with movement for the fly
    else if (fly.mode === "sine"){
        fly.angle += 0.08
        fly.y = fly.baseY + sin(fly.angle) * 30
    }
    
    else if (fly.mode === "jitter") {
        fly.y += random(-2, 2);
    }
    
    
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

    //MOD: play miss sfx
    sfxMiss.play();

    //loss condition
    if (misses >= maxMiss) {
        setGameState("lose");
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
   //MOD: adding more room out of the canvas for flies to spawn to not have awkward spawns with new movements
    fly.x = -20;

    //MOD: using fly.baseY as reference & same room added as before
    fly.baseY = random(30, 300);
    fly.y = fly.baseY;

    //MOD: different speed for each fly
    fly.speed = random(2, 4);

    //MOD: Angle reset for the sine movement
    fly.angle = 0;

    //MOD: random picker for movement
    const modes = ["straight", "sine", "jitter"];
    fly.mode = random(modes);

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
   // TONGUE DRAW
    // Draw the tongue tip
    push();
    fill("#ff807d");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff807d");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // MOD: FROG DRAW
    push();
    imageMode(CENTER);
    // MOD: Changing between open and closed mouth sprite
    let frogImg = frogPlayClosedImg;
    if(frog.tongue.state === "outbound" || frog.tongue.state === "inbound"){
        frogImg = frogPlayOpenImg;
    }

    //MOD: puts the frog sprite according to the pre established frog from the original
    image(frogImg, frog.body.x, frog.body.y, 180, 180);
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

        // MOD: play catch sfx
        sfxCatch.play();

        //MOD: Win condition to see if 10 were eating in a row
        if (streak >= winStreak) {
            setGameState("win");
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

    if (gameState === "credit"){
        //MOD: allows for the music of the title screen to play next
        userStartAudio();
        setGameState("title");
    }

 else if (gameState === "title") {
    // MOD: Starts the game in the title screen
    setGameState("play");
  } 

  else if (gameState === "play") {
    // MOD: Orignial Tongue Control
    if (frog.tongue.state === "idle") {
      frog.tongue.state = "outbound";
      sfxTongue.play();
    }
  }

  else if(gameState === "win"){
    //MOD: Click on win to reset game
    resetGame();
    setGameState("title");
  }

else if(gameState === "lose"){
    //MOD: Click on lose to reset game
    resetGame();
    setGameState("title");  
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

//MOD: Function to check game state
function setGameState(newState){
    // MOD: Sets the gameState to the current state it should be at
    gameState = newState;

    //MOD: Adds SFX when transitioning between states
    if (sfxClick && gameState !== "splash") {
      sfxClick.play();
    }

    //MOD: Stops The music when gameState ends
    if (currentMusic && currentMusic.isPlaying()) {
        currentMusic.stop();
    }

    //MOD: Adding a credit screen before the title so that the music actually starts on the title because of issue with startup music
    if (gameState === "credit") {
        currentMusic = null;
    }

    //MOD: Chooses which song should be playing
    else if (gameState === "title") {
        currentMusic = titleMusic;
    }
    else if (gameState === "play") {
        currentMusic = playMusic
    }
    else if (gameState === "win") {
        currentMusic = winMusic
    }
    else if (gameState === "lose") {
        currentMusic = loseMusic
    }

    // MOD: Starts the song and loops it
    if (currentMusic) {
        currentMusic.loop();
    }
}   

//MOD: Adding a function for the hud to better display score instead of just displaying numbers
function drawHUD() {
    // MOD: win streak bar or just hunger bar
    const barX = 20;
    const barY = 20;
    const barWidth = 200;
    const barHeight = 16;
    
    // bar goes 0 to 10
    const ratio = constrain(streak / winStreak, 0, 1);

    // background box for bar
    push();
    noStroke();
    fill(0, 0, 0, 60);
    rect(barX - 2, barY - 2, barWidth + 4, barHeight + 4, 6);

    // green bar as you build streak
    fill("#94c400");
    rect(barX, barY, barWidth * ratio, barHeight, 4);
    pop();

     // MOD: Miss icon definition (X Icon)
    const iconSize = 32;
    const spacing = 8;
    const totalWidth = maxMiss * iconSize + (maxMiss - 1) * spacing;
    const startX = width - totalWidth - 20;
    const iconY = 15;

    // MOD: make the X icon show up as you miss and placeholders before missing
    push();
    imageMode(CENTER);
    for (let i = 0; i < maxMiss; i++) {
        const x = startX + i * (iconSize + spacing);

        if (i < misses) {
            // missed flies show the X
            image(missIconImg, x + iconSize / 2, iconY + iconSize / 2, iconSize, iconSize);
        } else {
            // potential misses show a dark version of the X icon
            tint(80);
            image(missIconImg, x + iconSize / 2, iconY + iconSize / 2, iconSize, iconSize);
        }
    }
    pop();
}