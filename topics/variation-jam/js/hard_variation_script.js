/**
 * Hardcore Frog Game (Variant)
 * Noureddine Mazzene
 *
 * A game of catching flies with your frog-tongue but with a difficulty twist
 *
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch 10 flies in a row (Not Bees!!!)
 * - Dont Miss Your Shot!
 *
 *
 * Changes List:
* - Added a "Back to Menu" button on the title screen to return to index.html
 * - Changed the X icons into a lives system that starts full and empties as you lose
 * - Added tongue miss detection using tongueHitThisShot so empty shots cost a life
 * - Kept the original win condition of eating 10 bugs in a row but made it much harder to keep a streak
 * - Replaced the simple circle fly with a sprite
 * - Made fly size depend on streak:
 *      big and easy to hit at low streak
 *      original size around streak 5
 *      smaller at higher streak
 * - Made fly speed depend on streak so they move faster as your streak goes up
 * - Adjusted fly movement so higher streaks mean more sine and jitter motion and fewer straight paths
 * - Added a bee variant (isBee) that uses a separate sprite
 * - Made bees more likely to spawn as your streak increases
 * - Eating a fly increases the streak as usual
 * - Eating a bee makes you lose a life and reset your streak but still cancels a tongue miss
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// NEW MOD: defining back to menu button on title screen
const backToMenuButton = {
  x: 540,
  y: 430,
  w: 150,
  h: 40,
};

//MOD: defining game states
let gameState = "credit"; // "credit" or "title" or "play" or "lose" or "win"
let titleImage; // the title screen image
let winImage; // the win screen
let loseImage; // the lose screen

//MOD: defining win/loss conditions and scoring
let streak = 0; //total flies eaten in a row
let misses = 0; // total flies missed
const winStreak = 10; // eating 10 in a row = win
const maxMiss = 3; // missing 3 = loss

// NEW MOD: tracks whether the current tongue shot hit something
let tongueHitThisShot = false;


//MOD: defining music states
let titleMusic;
let playMusic;
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
let gameBgImg;

//MOD: defining X icon for misses
let missIconImg;

// NEW MOD: defining sprite for fly
let flyImg;

// NEW MOD: defining sprite for bee
let beeImg;


// Our frog
const frog = {
  // The frog's body has a position and size
  body: {
    x: 320,
    y: 420,
    size: 150,
  },
  // The frog's tongue has a position, size, speed, and state
  tongue: {
    x: undefined,
    y: 480,
    size: 20,
    speed: 20,
    // Determines how the tongue moves each frame
    state: "idle", // State can be: idle, outbound, inbound
  },
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
  angle: 0,

  // NEW MOD: defining if it is a bee
  isBee: false,
};


// NEW MOD: fly size & speed variety
const baseFlySizeAt0 = 18;  // starting size before streak
const flySizeAt5 = 10;      // original size when midway through
const minFlySizeAt10 = 8;   // tiny size when streak is high

const baseMinSpeed = 2;     // base min speed at low streak
const baseMaxSpeed = 4;     // base max speed at low streak
const extraMaxSpeed = 2;    // extra speed added by streak


// MOD: Preloading assests for the game
function preload() {
  // MOD: Preloads the screen images
  titleImage = loadImage(
    "assets/hard_variation_assets/images/title-screen.png"
  );
  winImage = loadImage("assets/original_game_assets/images/winscreen.png");
  loseImage = loadImage("assets/original_game_assets/images/losescreen.png");
  gameBgImg = loadImage(
    "assets/hard_variation_assets/images/background-ingame.png"
  );

  //MOD: Preloads Frog Sprites
  frogPlayClosedImg = loadImage(
    "assets/hard_variation_assets/images/frog_play_closed.png"
  );
  frogPlayOpenImg = loadImage(
    "assets/hard_variation_assets/images/frog_play_open.png"
  );

  //MOD: Preloads Lives Miss icon
  missIconImg = loadImage("assets/hard_variation_assets/images/miss_x.png");

  // NEW MOD: Preloads fly sprite
  flyImg = loadImage("assets/hard_variation_assets/images/fly.png");

  // NEW MOD: Preloads bee sprite
  beeImg = loadImage("assets/hard_variation_assets/images/bee.png");

  //MOD: Preloads music
  titleMusic = loadSound("assets/original_game_assets/sounds/title_screen.mp3");
  playMusic = loadSound("assets/original_game_assets/sounds/play.mp3");
  winMusic = loadSound("assets/original_game_assets/sounds/win.mp3");
  loseMusic = loadSound("assets/original_game_assets/sounds/loss.mp3");

  //MOD: Preloads SFX
  sfxClick = loadSound("assets/original_game_assets/sounds/click.mp3");
  sfxTongue = loadSound("assets/original_game_assets/sounds/tongue.mp3");
  sfxCatch = loadSound("assets/original_game_assets/sounds/catch.mp3");
  sfxMiss = loadSound("assets/original_game_assets/sounds/miss.wav");
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
  if (gameState === "credit") {
    //MOD: Credit screen on game opening
    background(0); // flat black, you can change it

    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(26);
    text("CART 253aa – Variation Jam", width / 2, height / 2 - 40);

    textSize(18);
    text("Noureddine Mazzene", width / 2, height / 2);

    textSize(14);
    text("Click to continue", width / 2, height / 2 + 50);
    pop();
  } else if (gameState === "title") {
    // MOD: Title Screen State
    image(titleImage, 0, 0, width, height);

    // NEW MOD: draw "Back to Menu" button on top of the title screen
    drawBackToMenuButton();
  } else if (gameState === "play") {
    //MOD: Gameplay State
    image(gameBgImg, 0, 0);
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
    image(winImage, 0, 0);
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

  // NEW MOD: how hard the game should be
  let difficulty = constrain(streak / winStreak, 0, 1);

  //MOD: Defining all the new modes of movement
  if (fly.mode === "straight") {
  }
  //Referencing mr angry assignement with movement for the fly
  else if (fly.mode === "sine") {
    // NEW MOD: increase amplitude slightly with difficulty
    fly.angle += 0.08 + difficulty * 0.04; // angle speed also grows a bit
    let baseAmplitude = 20;
    let maxExtraAmp = 25; // so max 45 total
    let amplitude = baseAmplitude + difficulty * maxExtraAmp;

    fly.y = fly.baseY + sin(fly.angle) * amplitude;
  } 

  else if (fly.mode === "jitter") {
    // NEW MOD: jitter range increases with difficulty
    let baseJitter = 2;
    let maxExtraJitter = 4; // so max 6
    let jitterRange = baseJitter + difficulty * maxExtraJitter;

    fly.y += random(-jitterRange, jitterRange);
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
 * NEW MOD: handles a miss when the tongue returns without hitting anything
 */
function handleTongueMiss() {
  // Losing a life because of a missed shot (not the same as missed fly)
  misses += 1;
  streak = 0; // break the streak

  // play miss SFX
  sfxMiss.play();

  if (misses >= maxMiss) {
    setGameState("lose");
  }
}


/**
 * NEW MOD: Draws the fly sprite (placeholder too)
 */
function drawFly() {
  push();
  imageMode(CENTER);

if (fly.isBee && beeImg) {
  // NEW MOD: draw bee
  image(beeImg, fly.x, fly.y, fly.size * 2, fly.size * 2);
} else if (!fly.isBee && flyImg) {
  // NEW MOD: draw fly
  image(flyImg, fly.x, fly.y, fly.size * 2, fly.size * 2);
} else {
  // placeholder
  noStroke();
  fill("#000000");
  ellipse(fly.x, fly.y, fly.size);
}

  pop();
}


/**
 * NEW MOD: Resets the fly to the left with a random y AND adds variety into size and speed when streak is up
 */
function resetFly() {
  // spawn off-screen on the left
  fly.x = -20;

  // random vertical base position
  fly.baseY = random(30, 300);
  fly.y = fly.baseY;

  // NEW MOD: size based on streak
  // 0–5 streak: shrink from big → original size
  // 5–10 streak: shrink further to tiny
  let currentStreak = constrain(streak, 0, winStreak);

  if (currentStreak <= 5) {
    let t = currentStreak / 5; // 0 → 1
    fly.size = baseFlySizeAt0 + t * (flySizeAt5 - baseFlySizeAt0);
  } else {
    let t = (currentStreak - 5) / 5; // 0 → 1 (for 5 → 10)
    fly.size = flySizeAt5 + t * (minFlySizeAt10 - flySizeAt5);
  }

  // NEW MOD: speed based on streak
  let ratio = currentStreak / winStreak; // 0 → 1
  let minSpeed = baseMinSpeed + ratio * 0.5; // slight bump
  let maxSpeed = baseMaxSpeed + ratio * extraMaxSpeed; // more bump
  fly.speed = random(minSpeed, maxSpeed);

  // reset angle
  fly.angle = 0;

  // NEW MOD: movement type weighting based on streak
  // low streak: easier
  // high streak: harder
  let r = random(1);

  if (r < 0.4 - 0.3 * ratio) {
    fly.mode = "straight";
  } else if (r < 0.7) {
    fly.mode = "sine";
  } else {
    fly.mode = "jitter";
  }

  // NEW MOD: decide if this is a bee or a fly
  // low streak: fewer bees, high streak: more bees
  let beeChance = 0.1 + ratio * 0.3; // from 10% to 40%
  fly.isBee = random(1) < beeChance;
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
      frog.tongue.y = height;
      frog.tongue.state = "idle";

      // NEW MOD: if this shot never hit count it as a miss
      if (!tongueHitThisShot) {
        handleTongueMiss();
      }
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
  if (frog.tongue.state === "outbound" || frog.tongue.state === "inbound") {
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
  // Get distance from tongue to bug
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  const eaten = d < frog.tongue.size / 2 + fly.size / 2;

  if (eaten) {
    // NEW MOD: shot connected with bug so don't count tongue miss
    tongueHitThisShot = true;

    if (fly.isBee) {
      // NEW MOD: bee penalty
      //  lose a life and streak
      misses += 1;
      streak = 0;

      sfxMiss.play();

      if (misses >= maxMiss) {
        setGameState("lose");
      } else {
        // new bug comes in
        resetFly();
        frog.tongue.state = "inbound";
      }
    } else {
      // fly = point and streak
      streak += 1;
      sfxCatch.play();

      if (streak >= winStreak) {
        setGameState("win");
      }

      resetFly();
      frog.tongue.state = "inbound";
    }
  }
}


/**
 * Launch the tongue on click (if it's not launched yet)
 */
//MOD: Adding game states to mousePresssed for title screen
function mousePressed() {
  if (gameState === "credit") {
    //MOD: allows for the music of the title screen to play next
    userStartAudio();
    setGameState("title");
  } else if (gameState === "title") {
    // NEW MOD: check if click is on "Back to Menu" button
    const overBackButton =
      mouseX > backToMenuButton.x - backToMenuButton.w / 2 &&
      mouseX < backToMenuButton.x + backToMenuButton.w / 2 &&
      mouseY > backToMenuButton.y - backToMenuButton.h / 2 &&
      mouseY < backToMenuButton.y + backToMenuButton.h / 2;

    if (overBackButton) {
      // NEW MOD: go back to main menu page
      window.location.href = "index.html";
    } else {
      // MOD: Starts the game in the title screen
      setGameState("play");
    }
  } else if (gameState === "play") {
    // NEW MOD: Tongue shot starts and assumes it didnt hit yet
    if (frog.tongue.state === "idle") {
      frog.tongue.state = "outbound";
      sfxTongue.play();
      tongueHitThisShot = false;
    }
  } else if (gameState === "win") {
    //MOD: Click on win to reset game
    resetGame();
    setGameState("title");
  } else if (gameState === "lose") {
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
function setGameState(newState) {
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
  } else if (gameState === "play") {
    currentMusic = playMusic;
  } else if (gameState === "win") {
    currentMusic = winMusic;
  } else if (gameState === "lose") {
    currentMusic = loseMusic;
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

    const livesLeft = maxMiss - misses;
    const isLife = i < livesLeft;

    if (isLife) {
      // full / remaining life
      tint(255);
    } else {
      // lost life (dark)
      tint(80);
    }

    image(
      missIconImg,
      x + iconSize / 2,
      iconY + iconSize / 2,
      iconSize,
      iconSize
    );
  }
  pop();
}

// NEW MOD: draws the "Back to Menu" button on the title screen
function drawBackToMenuButton() {
  // NEW MOD: defining hovering around button size and edges
  const hovering =
    mouseX > backToMenuButton.x - backToMenuButton.w / 2 &&
    mouseX < backToMenuButton.x + backToMenuButton.w / 2 &&
    mouseY > backToMenuButton.y - backToMenuButton.h / 2 &&
    mouseY < backToMenuButton.y + backToMenuButton.h / 2;

  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(16);

  // button background
  if (hovering) {
    fill(0, 0, 0, 180); // darker on hover
  } else {
    fill(0, 0, 0, 140);
  }
  rect(
    backToMenuButton.x,
    backToMenuButton.y,
    backToMenuButton.w,
    backToMenuButton.h,
    8
  );

  // button text
  fill(255);
  text("Back to Menu", backToMenuButton.x, backToMenuButton.y + 2);
  pop();
}
