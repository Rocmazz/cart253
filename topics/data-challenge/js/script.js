/**
 * Terrible New Car
 * Noureddine Mazzene
 *
 * A program to generate new car model names using dinosaurs.
 *
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";

//loading data files
let carsJsonData = null;
let dinoJsonData = null;



// Starts with the instruction
let carName = "Click to generate a car name.";

/**
 * Load the car and dinosaur data
 */
function preload() {
        carsJsonData = loadJSON("assets/data/cars.json")
        dinoJsonData = loadJSON("assets/data/dinosaurs.json");
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(600, 400);
}

/**
 * Display the current main text (either instructions or a car)
 */
function draw() {
  background(0);

  push();
  fill("pink");
  textAlign(CENTER, CENTER);
  textSize(32);
  text(carName, width / 2, height / 2);
  pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
  // random car from cars data
  let randomCar = random(carsJsonData.cars);

  // random dino from dino data
  let randomDino = random(dinoJsonData.dinosaurs);
  
  // random car and dino name on mouse click
  carName = randomCar + " " + randomDino;
}