// sketch.js - purpose and description here
// Author: Tyler James Torrella
// Date: Jan 20 2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
'use strict';

// ---- Start of Wes Modes's prewritten code to make it fit within the Canvas ----
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

var tileCount = 5;
var maxDistance = 250;
var baseSpeed = 0.02;
var maxSpeed = 0.2;
var circles = [];

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

  noFill();
  strokeWeight(3);
  
  // Initialize grid
  for (var gridY = 0; gridY < width; gridY += 30) {
    for (var gridX = 0; gridX < height; gridX += 30) {
      circles.push({
        x: gridX,
        y: gridY,
        size: random(1, 5),
        maxDiameter: random(25, 45)
      });
    }
  }
}

function draw() {
  clear();
  // call a method on the instance
  myInstance.myMethod();

  circles.forEach(function(circle) {
    var distance = dist(mouseX, mouseY, circle.x, circle.y);
    
    // Change circle's size
    circle.size += baseSpeed + map(distance, 0, maxDistance, maxSpeed, 0);

    // Okay this sucked, this is how to change circle diameter relative to the speed (use sin())
    var diameter = map(sin(circle.size), -1, 1, 10, circle.maxDiameter);

    // Change color based on distance to the cursor
    var alpha = map(distance, 0, maxDistance, 255, 50);
    var colorIntensity = map(distance, 0, maxDistance, 255, 0);
    stroke(colorIntensity, 0, 255 - colorIntensity, alpha);

    // Draw circle
    ellipse(circle.x, circle.y, diameter, diameter);
  });
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
