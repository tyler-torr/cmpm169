// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
'use strict';

var tileCount = 5;

var moduleAlpha = 180;
var maxDistance = 250;
var baseSpeed = 0.02;
var maxSpeed = 0.2;
var circles = [];

function setup() {
  createCanvas(800, 800);
  noFill();
  strokeWeight(3);
  
  // Initialize oscillators for each grid point
  for (var gridY = 0; gridY < width; gridY += 30) {
    for (var gridX = 0; gridX < height; gridX += 30) {
      circles.push({
        x: gridX,
        y: gridY,
        angle: random(1, 5),
        maxDiameter: random(30, 45)
      });
    }
  }
}

function draw() {
  clear();

  circles.forEach(function(circle) {
    var distance = dist(mouseX, mouseY, circle.x, circle.y);

    circle.angle += baseSpeed + map(distance, 0, maxDistance, maxSpeed, 0);

    // Holy fuck this sucked
    var diameter = map(sin(circle.angle), -1, 1, 10, circle.maxDiameter);

    // Change color based on distance to the cursor
    var alpha = map(distance, 0, maxDistance, 255, 50);
    var colorIntensity = map(distance, 0, maxDistance, 255, 0);
    stroke(colorIntensity, 0, 255 - colorIntensity, alpha);

    push();
    ellipse(circle.x, circle.y, diameter, diameter);
    pop();
  });
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
