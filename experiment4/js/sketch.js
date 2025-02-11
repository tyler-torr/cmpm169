// sketch.js - purpose and description here
// Author: Tyler James Torrella
// Date: Jan 20 2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
'use strict';

/*
/ Credit to Programming Chaos for their helpful tutorial on how to use Perlin noise to generate
/ a weather map, in Generating Procedural Maps using Perlin Noise: 
/ https://www.youtube.com/watch?v=6BdYzfVOyBY
*/

// ---- Start of Wes Modes's prewritten code to make it fit within the Canvas ----
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

const backgroundColor = [135, 206, 235]; // Default: [135, 206, 235]
const rainColor = [138, 43, 226]; // Default: [138, 43, 226]
const rainStroke = 2; // Default: 2

let raindrops = [];
let weatherMap = [];

let noiseScale = 0.0015;
let windOffset = 0;
let windOffsetScale = 0.001;

class MyClass {
  constructor(param1, param2) {
      this.property1 = param1;
      this.property2 = param2;
  }

  myMethod() {
      // code to run when method is called
  }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  
  // ---- End of Wes Modes's prewritten code to make it fit within the Canvas ----

  // Weather map
  for (let x = 0; x < width; x++) {
    weatherMap[x] = []; // JS doesn't allow nested functions normally so this will do
    for (let y = 0; y < height; y++) {
      weatherMap[x][y] = noise(x * noiseScale, y * noiseScale);
    }
  }
}

function draw() {
  background(backgroundColor);
  stroke(rainColor);
  strokeWeight(rainStroke);

  let wind = map(noise(windOffset), 0, 1, -1, 1);
  windOffset += windOffsetScale; // Update current windOffset by the change

  let x = random(width);
  let intensity = weatherMap[int(x)][int(random(height))];
  if (intensity > 0.5) {
    raindrops.push(new Raindrop(x, 0)); // Create raindrop
  }

  for (let raindrop of raindrops) {
    raindrop.display();
    raindrop.move(wind);
  }

  // Remove raindrops that fall off the screen
  raindrops = raindrops.filter(drop => drop.y < height);
}

// Raindrop class
class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(15, 20);
    this.length = random(10, 25);
  }

  move(wind) {
    this.y += this.speed;
    this.x += wind; // Apply wind to horizontal movement
  }

  display() {
    line(this.x, this.y, this.x - windOffset, this.y + this.length); // Draw the raindrop
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}