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

let pos;
let vel;
let target;
let trail = [];
let alpha = 255;
let lastClickTime = 0;
let speedMultiplier = 1;
let barkStartTime = 0;
let barkPos;

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

  pos = createVector(width / 2, height / 2); // Dog starts in the center
  let angle = noise(frameCount * 0.01) * TWO_PI;
  vel = p5.Vector.fromAngle(angle).mult(2); // Choose random direction to start walking to
  target = pos.copy();
}

function draw() {
  background(30);
  
  // Make the trail behind the current position of the dog fade away over time
  // by changing its alpha value
  for (let i = 0; i < trail.length - 1; i++) {
    let alphaValue = map(i, 0, trail.length - 1, 0, 255); // This is probably not how you do this
    stroke(255, alphaValue);
    line(trail[i].x, trail[i].y, trail[i + 1].x, trail[i + 1].y);
  }
  trail.push(pos.copy());

  // Slowly move the dog towards the most recently clicked position
  // Emulates 'forward' movement by slowly edging movement to the left or right
  // Kind of like turning in real life. Credit to ChatGPT for showing me this.
  let desired = p5.Vector.sub(target, pos).setMag(0.1);
  vel.add(desired).setMag(2); // Smoothly steer toward the target
  vel.mult(speedMultiplier);
  pos.add(vel);

  // Bounce the dog off the wall
  if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) {
    vel.mult(-1 * random(0, 0.3));
  }

  // BARK code to show that this is a dog
  let distanceToTarget = pos.dist(target);
  if ((random() < 0.01 || (distanceToTarget < 20 && random() < 0.1)) && millis() - barkStartTime > 300) { 
    barkStartTime = millis(); // The dog is getting restless.....
    let noiseOffset = noise(frameCount * 0.1) * 50;
    let barkOffset = p5.Vector.random2D().mult(noiseOffset);
    barkPos = pos.copy().add(barkOffset);
  }

  if (millis() - barkStartTime < 300 && barkPos) { // Show BARK for 0.3 seconds
    fill(255);
    noStroke();
    textSize(16);
    text("BARK", barkPos.x, barkPos.y); // BARK ABRK. BAR KK BARK BAR KARBK BARK
  }
}

function mousePressed() {
  target.set(mouseX, mouseY);

  let currentTime = millis();
  let timeDiff = currentTime - lastClickTime;

  // Dog gets excited with rapid clicks
  if (timeDiff < 200) {
    speedMultiplier = 2;
  } else {
    speedMultiplier = 1;
  }
  lastClickTime = currentTime;
}