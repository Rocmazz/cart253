/**
 * Instructions Landscape Challenge
 * Noureddine Mazzene
 * 
 * Making a landscape using p5
 * 
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400)
}


/**
 * Sets the background, draws the landscape
*/
function draw() {
   //The Sky
    background("#4a8aef")

    //Grassy Hill
    drawGrassyHill()
}

function drawGrassyHill() {

//Flat Grassy Surface
push()
noStroke()
fill("#86ae30");
rect(0, 250, 400, 150)

}