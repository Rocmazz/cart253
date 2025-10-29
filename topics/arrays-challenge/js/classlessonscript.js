/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// let's create an array!
let newArray = [5, 6, 7, 4, 0, 1, 5];

// If i want to get access to an element of my array I write:
// arrayName[x]
console.log(newArray[2]);

//let colors = ["r", "g", "b"]:
let colors = ["r", "g", "b", "x", "y", "z"];
let index = 2;
let numbers = [];
console.log(numbers);

// let emptyArray = []
// console.log(emptyArray.length);

// //syntax to add an element to array is:
// numbers.push("sword");
// numbers.push("balloon");
// numbers.push("potion");
// console.log(numbers);

// numbers.pop();
// console.log(numbers);

// console.log(numbers.indexOf("sword")) // calls for the array position of sword using js language not p5

// Create OBJECTS

let balloons = [];

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
 */
function setup() {
createCanvas(1000, 500)
  console.log(colors[0]);
  let previousValue = colors[0]; //  this saves the value of colors 0 at this instance for future use

  colors[0] = "red";
  console.log(colors[0]);
  console.log(previousValue); // this shows the saved previous value before line 30 goes through

  colors[1] = "green";
  colors[2] = "blue";

  console.log(colors); // show the entire array
  console.log(colors[2]); // show the array entry in the []
  console.log(colors[index]);
  console.log(colors.length);
  console.log(colors[colors.length - 1]);

  //LETS MAKE OBJECTS!

  // let balls = [
  //     {
  //     x: random(0, 100),
  //     y: random(0, 100),
  //     size: 20,
  //     color: {
  //         r: random(0, 100),
  //         g: random(0, 100),
  //         b: random(0, 100),
  //     },
  // }
  //     {
  //     x: random(0, 100),
  //     y: random(0, 100),
  //     size: 20,
  //     color: {
  //         r: random(0, 100),
  //         g: random(0, 100),
  //         b: random(0, 100),
  //     },
  // }    {
  //     x: random(0, 100),
  //     y: random(0, 100),
  //     size: 20,
  //     color: {
  //         r: random(0, 100),
  //         g: random(0, 100),
  //         b: random(0, 100),
  //     },
  // }
  // ];
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
  background("white");
  //
  //
  for (let ball of balloons) {
    fill(ball.color.r, ball.color.g, ball.color.b);
    circle(ball.x, ball.y, ball.size);
  }
}

//in mousePressed, i want to dynamically add a new element in my array
//everytine that i click
// I want to assign a random number to the element
function mousePressed() {
  //
  //     numbers.push(random(0,100));
  //     console.log(numbers)
  //     console.log("the lenght of my array is:" + numbers.length)
  //     console.log("the last element is:" + numbers[numbers.length -1])
  //

  let newBall = createNewBall();
  {
    balloons.push(newBall);
    console.log(balloons);
    console.log("The last element's x value:");
    console.log(balloons[balloons.length - 1].x);
  }
}

function createNewBall() {
  let ball = {
    x: random(0, 1000),
    y: random(0, 500),
    size: 20,
    color: {
      r: random(0, 100),
      g: random(0, 100),
      b: random(0, 100),
    },
  };
  return ball;
}
