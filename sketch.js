// Flow Free
// Emily Ng
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// intial plain grid. nothing on it
// let emptyGrid = [
//   [0, 0, 0, 0, 0], 
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0]
// ];

// // possible set up to try with the dots
// let grid = [
//   [1, 2, 0, 0, 0], 
//   [0, 0, 0, 1, 0],
//   [3, 4, 0, 2, 0],
//   [0, 0, 0, 0, 0],
//   [0, 3, 0, 0, 4]
// ];

// // how the grid should look like when it is solved
// let solvedGridOne = [
//   [1, 2, 2, 2, 2], 
//   [1, 1, 1, 1, 2],
//   [3, 4, 4, 2, 2],
//   [3, 3, 4, 2, 2],
//   [3, 3, 4, 4, 4]
// ];

// let gridTwo = [
//   [0, 3, 2, 0, 0, 0], 
//   [0, 0, 0, , 0, 2],
//   [, , 0, , 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [3, , 0, 0, , 0],
//   [0, , 0, 0, , 0]
// ];

// let solvedGridTwo = [
//   [1, 2, 2, 2, 2], 
//   [1, 1, 1, 1, 2],
//   [3, 4, 4, 2, 2],
//   [3, 3, 4, 2, 2],
//   [3, 3, 4, 4, 4]
// ];

let grid = [
  [1, 2, 0, 0, 0], 
  [0, 0, 0, 1, 0],
  [3, 4, 0, 2, 0],
  [0, 3, 0, 0, 0],
  [0, 0, 0, 0, 4]
];

const GRID_ROWS = grid.length;
const GRID_COLUMNS = grid[0].length; 
const cellSize = 50;

const EMPTY_TILE = 0;
const RED_DOT = 1;
const BLUE_DOT = 2;
const GREEN_DOT = 3;
const YELLOW_DOT = 4;

let selectedColor = null;

let dragCancelled = false; // tracks if the drag path is interrupted

// start screen 
let stage = 0; 

function setup() {
  createCanvas(500, 500);
}

function preload() {

}

function draw() {
  startScreen();
  // background(220);
  // displayGrid();
  // connectDotsWithRects();
}

function gameStage() {
  // show start screen 
  if (stage === 0) {
    startScreen();
  }

  // show game levels
  if (stage === 1) {
    levelScreen();
  }

  if (mouseIsPressed === true) {
    stage = 1;
  }

}

function keyPressed() {
  // level 1
  if (key === "1") {
  
  }

  if (key === "2") {

  }

  

}

function startScreen() {
  background(0);
  fill(255);
  textSize(50);
  text('FLOW FREE', 110, 140);
   

  ellipse(250, 300, 150, 150);
}

function levelScreen() {
  background(0);
}

function displayGrid() {
  strokeWeight(1);
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLUMNS; x++) {
      // draw black square as the background
      fill("black");
      stroke(0);  // add a border to the tiles
      square(x * cellSize, y * cellSize, cellSize);

      // display the colored circle depending on the grid value
      if (grid[y][x] === RED_DOT) {
        fill("red");
        ellipse(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize * 0.8, cellSize * 0.8);
      } 
      else if (grid[y][x] === BLUE_DOT) {
        fill("blue");
        ellipse(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize * 0.8, cellSize * 0.8);
      } 
      else if (grid[y][x] === GREEN_DOT) {
        fill("green");
        ellipse(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize * 0.8, cellSize * 0.8);
      } 
      else if (grid[y][x] === YELLOW_DOT) {
        fill("yellow");
        ellipse(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize * 0.8, cellSize * 0.8);
      }
      // no circle if the tile is empty
    }
  }
}

function connectDotsWithRects() {
  fill("green");
  ellipse(0 * cellSize + cellSize / 2, 3 * cellSize + cellSize / 2, cellSize * 0.8, cellSize * 0.8);

  let p1 = {};
  p1.x = 0 * cellSize + cellSize / 2;
  p1.y = 2 * cellSize + cellSize / 2;
  let p2 = {};
  p2.x = 0 * cellSize + cellSize / 2;
  p2.y = 3 * cellSize + cellSize / 2;

  stroke("green");
  strokeWeight(cellSize * 0.8);
  line(p1.x, p1.y, p2.x, p2.y);
}

function mousePressed() {
  // get the tile position on the grid
  const gridX = Math.floor(mouseX / cellSize);
  const gridY = Math.floor(mouseY / cellSize);
  
  // select the color when clicking on a color tile
  if (grid[gridY][gridX] === RED_DOT) {
    selectedColor = RED_DOT;
    dragCancelled = false;  // resets it
  } 
  else if (grid[gridY][gridX] === BLUE_DOT) {
    selectedColor = BLUE_DOT;
    dragCancelled = false;  
  } 
  else if (grid[gridY][gridX] === GREEN_DOT) {
    selectedColor = GREEN_DOT;
    dragCancelled = false;  
  } 
  else if (grid[gridY][gridX] === YELLOW_DOT) {
    selectedColor = YELLOW_DOT;
    dragCancelled = false;  
  }
}

function mouseDragged() {
  if (selectedColor !== null && !dragCancelled) {
    // get the tile position on the grid
    const gridX = Math.floor(mouseX / cellSize);
    const gridY = Math.floor(mouseY / cellSize);

    // check if the tile is occupied by a color other than the selected color
    if (grid[gridY][gridX] !== EMPTY_TILE && grid[gridY][gridX] !== selectedColor) {
      // if a different color is encountered, stop filling and cancel the drag
      dragCancelled = true;
      return; // stop the drag action
    }

    // if the tile is empty, fill it with the selected color
    if (grid[gridY][gridX] === EMPTY_TILE) {
      grid[gridY][gridX] = selectedColor;
    }
  }
}