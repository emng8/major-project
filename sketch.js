// Flow Free
// Emily Ng
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// just testing the concept of having an initial grid, the grid with the dots, and then having the solved grid
// intial plain grid
let grid = [
  [0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

let gridOne = [
  [1, 2, 0, 0, 0], 
  [0, 0, 0, 1, 0],
  [3, 4, 0, 2, 0],
  [0, 0, 0, 0, 0],
  [0, 3, 0, 0, 4]
];

let solvedgridOne = [
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
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

}

function mousePressed() {
  if (mouseX && mouseY === ) {

  }
}

function displayGrid() {
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLUMNS; x++) {
    }
  }
}