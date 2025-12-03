/**
 * Rhythm Frog Game
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
 * - Tied the gameplay to a fixed 119 BPM music track
 * - Removed lose conditions: the game always runs until the end of the song
 * - Replaced streak and lives with a pure score system based on how many flies you catch
 * - Made flies fall from the top of the screen at a fixed speed
 * - Spawned flies on a beat-based pattern so the game follows the rhythm of the track
 * - Randomized the horizontal position of falling flies so you have to move the frog with the mouse
 * - Increased tongue speed so it can keep up with the beat while still showing a visible animation
 * - Added a results screen that shows your final score and a rank (S / A / B / C) at the end of the song
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

// NEW MOD: defining letter rank icons
let rankSImg;
let rankAImg;
let rankBImg;
let rankCImg;

//MOD: defining win/loss conditions and scoring
let streak = 0; //NEW MOD: Now its just the total eaten not a streak
let misses = 0; // total flies missed
const winStreak = 10; // eating 10 in a row = win
const maxMiss = 3; // missing 3 = loss

//MOD: defining music states
let titleMusic;
let playMusic;
let winMusic;
let loseMusic;
//MOD: tracks which song should be playing for the state
let currentMusic = null;

// NEW MOD: BPM & Intervals defining for fly spawn timings
const SONG_BPM = 119;
const BEAT_INTERVAL = (60 / SONG_BPM) * 1000; // ms per beat (~504ms)

// NEW MOD: Song duration (in ms) for rhythm mode
const SONG_DURATION_MS = 33000; // 33 seconds

// NEW MOD: tracking song time & total notes
let songStartTime = 0;
let totalNotes = 0; // how many flies were spawned (total notes)


let lastBeatTime = 0; // when the last fly was spawned


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
    speed: 40,
    // Determines how the tongue moves each frame
    state: "idle", // State can be: idle, outbound, inbound
  },
};

// Our flies
// NEW MOD: array for multiple on screen at once
let flies = [];

// MOD: Preloading assests for the game
function preload() {
  // MOD: Preloads the screen images
  titleImage = loadImage("assets/original_game_assets/images/title-screen.png");
  winImage = loadImage("assets/original_game_assets/images/winscreen.png");
  loseImage = loadImage("assets/original_game_assets/images/losescreen.png");
  gameBgImg = loadImage(
    "assets/original_game_assets/images/background-ingame.png"
  );

  //MOD: Preloads Frog Sprites
  frogPlayClosedImg = loadImage(
    "assets/rhythm_variation_assets/images/rfrog_play_closed.png"
  );
  frogPlayOpenImg = loadImage(
    "assets/rhythm_variation_assets/images/rfrog_play_open.png"
  );

  // NEW MOD: Preloads rank icons
  rankSImg = loadImage("assets/rhythm_variation_assets/images/rank_s.png");
  rankAImg = loadImage("assets/rhythm_variation_assets/images/rank_a.png");
  rankBImg = loadImage("assets/rhythm_variation_assets/images/rank_b.png");
  rankCImg = loadImage("assets/rhythm_variation_assets/images/rank_c.png");

  //MOD: Preloads X Miss icon
  missIconImg = loadImage("assets/original_game_assets/images/miss_x.png");

  // NEW MOD: Preloads fly sprite
  flyImg = loadImage("assets/rhythm_variation_assets/images/fly.png");

  //MOD: Preloads music
  titleMusic = loadSound("assets/original_game_assets/sounds/title_screen.mp3");
  playMusic = loadSound("assets/rhythm_variation_assets/sounds/play.wav");
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

  // Start with no flies; rhythm system will spawn them
  resetFlies();

  // Start beat timer from now
  lastBeatTime = millis();

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
    text("CART 253aa – Mod Jam", width / 2, height / 2 - 40);

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

    // NEW MOD: spawn a new fly exactly on each beat
    const now = millis();
    if (now - lastBeatTime >= BEAT_INTERVAL) {
      spawnFly();
      lastBeatTime += BEAT_INTERVAL;
    }

    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();

    //MOD: UI for scoring
    drawHUD();

    // NEW MOD: song timer / progress
    const elapsed = millis() - songStartTime;
    drawSongProgress(elapsed);

    // NEW MOD: check if song is over
    if (elapsed >= SONG_DURATION_MS) {
      setGameState("win");
    }
  }

  //MOD: Win Screen State
  else if (gameState === "win") {
    image(winImage, 0, 0);

    // Simple results overlay
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);
    text("Hits: " + streak, width / 2, 190);
    text("Total notes: " + totalNotes, width / 2, 225);

    // Accuracy calculation
    let accuracy = 0;
    if (totalNotes > 0) {
      accuracy = Math.round((streak / totalNotes) * 100);
    }
    text("Accuracy: " + accuracy + "%", width / 2, 260);

    // NEW MOD: Rank based on accuracy
    let rankImg = rankCImg;
    if (accuracy >= 95) {
      rankImg = rankSImg;
    } else if (accuracy >= 85) {
      rankImg = rankAImg;
    } else if (accuracy >= 70) {
      rankImg = rankBImg;
    }

    // Draw "Rank" label
    textSize(18);
    text("Rank", width / 2, 300);

    // Draw icon under the label (if loaded)
    if (rankImg) {
      imageMode(CENTER);
      image(rankImg, width / 2, 360, 80, 80);
    }

    textSize(14);
    text("Click to return to title", width / 2, 410);
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
 * NEW MOD: Moves the fly from top to bottom
 * Resets the fly if it gets all the way to the bottom
 */
function moveFly() {
  // NEW MOD: Move all flies down
  for (let i = flies.length - 1; i >= 0; i--) {
    const fly = flies[i];

    fly.y += fly.speed;

    // bottom counts as a miss then remove that fly
    if (fly.y > height + fly.size) {
      handleMiss();
      flies.splice(i, 1);
    }
  }
}

/**
 * MOD: New function to check misses and loss
 * Handles a miss when a fly goes past the canvas
 */
function handleMiss() {
  misses += 1;

  // MOD: play miss sfx
  sfxMiss.play();

  // NEW MOD: no more game over
}

/**
 * NEW MOD: Draws the fly using the sprite
*/
function drawFly() {
  push();
  imageMode(CENTER);
  // NEW MOD: draw the sprite scaled based on fly.size
  for (const fly of flies) {
    if (flyImg) {
      image(flyImg, fly.x, fly.y, fly.size * 2, fly.size * 2);
    } else {
      // placeholder
      noStroke();
      fill("#000000");
      ellipse(fly.x, fly.y, fly.size);
    }
  }

  pop();
}

// NEW MOD: Spawns new fly at the top at a random x
function spawnFly() {
  const fly = {
    x: random(40, width - 40),
    y: -20,
    size: 24,
    speed: random(3, 5),
  };
  flies.push(fly);

  // NEW MOD: adds note to bpm score
  totalNotes += 1;
}

// NEW MOD: Clears all flies when restarting the game
function resetFlies() {
  flies = [];
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
    if (frog.tongue.y <= height / 5) {
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
  fill("#4b84eb");
  noStroke();
  ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
  pop();

  // Draw the rest of the tongue
  push();
  stroke("#4b84eb");
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
  // Get distance from tongue to fly
  for (let i = flies.length - 1; i >= 0; i--) {
     // Check if it's an overlap
    const fly = flies[i];

    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    const eaten = d < frog.tongue.size / 2 + fly.size / 2;
    // MOD: Eat streak added
    if (eaten) {
 streak += 1; // now as the total 
      sfxCatch.play();

      // remove fly
      flies.splice(i, 1);

      // Pull tongue back
      frog.tongue.state = "inbound";

      // NEW MOD: no more win condition
      break;
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
    // MOD: Orignial Tongue Control
    if (frog.tongue.state === "idle") {
      frog.tongue.state = "outbound";
      sfxTongue.play();
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
  resetFlies();
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
    //when game starts restart flies & timing
  currentMusic = playMusic;
  resetFlies();
  lastBeatTime = millis();
  songStartTime = millis();
    // NEW MOD: reset stats for a clean run
    streak = 0;
    misses = 0;
    totalNotes = 0;
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

//NEW MOD: replacing bar hud with score and misses 
function drawHUD() {
  push();
  textAlign(LEFT, TOP);
  textSize(16);
  fill(255);

  // hits (streak is now total hits)
  text("Hits: " + streak, 20, 15);

  // misses
  text("Misses: " + misses, 20, 35);

  pop();
}

// NEW MOD: draws a progress bar for the song duration
function drawSongProgress(elapsed) {
  // how far into the song we are (0.0 to 1.0)
  let ratio = 0;
  if (SONG_DURATION_MS > 0) {
    ratio = constrain(elapsed / SONG_DURATION_MS, 0, 1);
  }

  const barX = 20;
  const barY = height - 30;
  const barWidth = width - 40;
  const barHeight = 12;

  push();
  noStroke();

  // background bar
  fill(0, 0, 0, 80);
  rect(barX, barY, barWidth, barHeight, 6);

  // filled part
  fill("#4b84eb");
  rect(barX, barY, barWidth * ratio, barHeight, 6);

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
