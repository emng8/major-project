// Flow Free
// Emily Ng
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// just testing the concept of having an initial grid, the grid with the dots, and then having the solved grid

// intial plain grid. nothing on it
let emptyGrid = [
  [0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

// possible set up to try with the dots
let grid = [
  [1, 2, 0, 0, 0], 
  [0, 0, 0, 1, 0],
  [3, 4, 0, 2, 0],
  [0, 0, 0, 0, 0],
  [0, 3, 0, 0, 4]
];

// how the grid should look like when it is solved
let solvedGridOne = [
  [1, 2, 2, 2, 2], 
  [1, 1, 1, 1, 2],
  [3, 4, 4, 2, 2],
  [3, 3, 4, 2, 2],
  [3, 3, 4, 4, 4]
];

let gridTwo = [
  [0, 3, 2, 0, 0, 0], 
  [0, 0, 0, , 0, 2],
  [, , 0, , 0, 0],
  [0, 0, 0, 0, 0, 0],
  [3, , 0, 0, , 0],
  [0, , 0, 0, , 0]
];

let solvedGridTwo = [
  [1, 2, 2, 2, 2], 
  [1, 1, 1, 1, 2],
  [3, 4, 4, 2, 2],
  [3, 3, 4, 2, 2],
  [3, 3, 4, 4, 4]
];

const GRID_ROWS = grid.length;
const GRID_COLUMNS = grid[0].length; 
const cellSize = 50;

const EMPTY_TILE = 0;
const RED_DOT = 1;
const BLUE_DOT = 2;
const GREEN_DOT = 3;
const YELLOW_DOT = 4;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLUMNS; x++) {
      // displays red
      if (grid[y][x] === RED_DOT) {
        fill("red"); 
        square(x * cellSize, y * cellSize, cellSize);
      } 
      // displays blue
      else if (grid[y][x] === BLUE_DOT) {
        fill("blue");
        square(x * cellSize, y * cellSize, cellSize);
      } 
      // displays green
      else if (grid[y][x] === GREEN_DOT) {
        fill("green");
        square(x * cellSize, y * cellSize, cellSize);
      } 
      // displays yellow
      else if (grid[y][x] === YELLOW_DOT) {
        fill("yellow");
        square(x * cellSize, y * cellSize, cellSize);
      }      
      // displays black 
      else if (grid[y][x] === EMPTY_TILE) {
        fill("black");
        square(x * cellSize, y * cellSize, cellSize);
      }      
    }
  }
}

function mousePressed() {
  // make the line to connect dots red
  if (mousePressed === RED_DOT) {
    let color = RED_DOT.get(mouseX, mouseY);
    if mouseDragged() {
      
    }

  }
  // make the line to connect dots blue
  if (mousePressed === BLUE_DOT) {
    
  }
  // make the line to connect dots green
  if (mousePressed === GREEN_DOT) {
    
  }
  // make the line to connect dots yellow
  if (mousePressed === YELLOW_DOT) {
    
  }
}