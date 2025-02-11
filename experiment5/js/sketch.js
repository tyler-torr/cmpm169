// sketch.js - purpose and description here
// Author: Tyler James Torrella
// Date: Feb 10 2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
'use strict';

// ---- Start of Wes Modes's prewritten code to make it fit within the Canvas ----
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let angle = 30;
let swapTimer = 5350; // Amount of time before gray and white swap. This could've been way smarter
let lastSwitchTime = 0;
let isGray = false;
let showMode = "ALL"; // Can be "ALL", "FRONT", or "BACK"

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
  resizeCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  
  // ---- End of Wes Modes's prewritten code to make it fit within the Canvas ----
}

function draw() {
  background(20);
  stroke(255);
  strokeWeight(10);

  rotateY(angle);
  rotateX(25.75);
  angle += 0.01;

  noFill();

  let s = 50; // Cube size
  let points = [
    createVector(-s, -s, -s),
    createVector(s, -s, -s),
    createVector(s, s, -s),
    createVector(-s, s, -s),
    createVector(-s, -s, s),
    createVector(s, -s, s),
    createVector(s, s, s),
    createVector(-s, s, s)
  ];

  if (millis() - lastSwitchTime > swapTimer) {
    isGray = !isGray;
    lastSwitchTime = millis();
  }

  if (showMode === "ALL" || showMode === "BACK") {
    if (isGray) {
      stroke(125);
    }
    else {
      stroke(255);
    }
    drawEdges(points, [[5, 1], [1, 2], [1, 0]]);
  }

  if (showMode === "ALL" || showMode === "FRONT") {
    if (!isGray) {
      stroke(125);
    }
    else {
      stroke(225);
    }
    drawEdges(points, [[6, 7], [7, 4], [4, 7], [7, 3]]);
  }
  
  stroke(255);
  if (showMode === "ALL") {
    drawEdges(points, [[4, 5], [5, 6], [6, 2], [2, 3], [3, 0], [0, 4]]);
  }
}

function drawEdges(points, edges) {
  beginShape();
  for (let e of edges) {
    let v1 = points[e[0]];
    let v2 = points[e[1]];
    vertex(v1.x, v1.y, v1.z);
    vertex(v2.x, v2.y, v2.z);
  }
  endShape();
}

function keyPressed() {
  if (key === 'F' || key === 'f') {
    showMode = "FRONT";
    console.log("Showing front edges");
  } else if (key === 'B' || key === 'b') {
    showMode = "BACK";
    console.log("Showing back edges");
  } else if (key === 'A' || key === 'a') {
    showMode = "ALL";
    console.log("Showing all edges");
  }
}