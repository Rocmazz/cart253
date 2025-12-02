/**
 * Menu For Variation Jam
 * Noureddine Mazzene
 * 
 * navigate between all the variants and original game
 */

"use strict";

let menuBgImg;

let buttons = []; // array of buttons

function preload() {
  // preloads background for the menu
  menuBgImg = loadImage("assets/images/background-menu.png");

  // preload buttons for the menu
  buttons = [
    {
      label: "Original Game",
      img: loadImage("assets/images/btn_original.png"),
      x: 320,
      y: 170,
      w: 260,
      h: 60, 
      link: "original_game.html",
    },
    {
      label: "Rhythm Frog",
      img: loadImage("assets/images/btn_rhythm.png"),
      x: 320,
      y: 240,
      w: 260,
      h: 60,
      link: "rhythm_variation.html",
    },
    {
      label: "Hard Mode",
      img: loadImage("assets/images/btn_hard.png"),
      x: 320,
      y: 310,
      w: 260,
      h: 60,
      link: "hard_variation.html",
    },
    {
      label: "Whack-A-Mole",
      img: loadImage("assets/images/btn_whack.png"),
      x: 320,
      y: 380,
      w: 260,
      h: 60,
      link: "whack_variation.html",
    },
  ];
}

// setup canvas image mode and text align for the menu buttons and texts
function setup() {
  createCanvas(640, 480);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  // draw background
  if (menuBgImg) {
    imageMode(CORNER);
    image(menuBgImg, 0, 0, width, height);
    imageMode(CENTER);
  } else {
    background(20); // place holder for background
  }

  //  title text on top
  push();
  fill(255);
  textSize(32);
  text("Frog Game Variations", width / 2, 60);
  pop();

  // draw each button with hover effect
  for (let btn of buttons) {
    drawButton(btn);
  }
}

function drawButton(btn) {
  const hovering = isMouseOverButton(btn);

  push();
  imageMode(CENTER);

  if (hovering) {
    // darken the button when hovered (inspired by the x button my original game)
    tint(180); 
  } else {
    tint(255);
  }

  image(btn.img, btn.x, btn.y, btn.w, btn.h);
  pop();
}

// hovering funciton for the dark effect
function isMouseOverButton(btn) {
  return (
    mouseX > btn.x - btn.w / 2 &&
    mouseX < btn.x + btn.w / 2 &&
    mouseY > btn.y - btn.h / 2 &&
    mouseY < btn.y + btn.h / 2
  );
}

// send player to the other games on click
function mousePressed() {
  for (let btn of buttons) {
    if (isMouseOverButton(btn)) {
      window.location.href = btn.link;
      break;
    }
  }
}