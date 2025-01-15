// Flow Free
// Emily Ng
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const cellSize = 50;

const EMPTY_TILE = 0;
const RED_DOT = 1;
const BLUE_DOT = 2;
const GREEN_DOT = 3;
const YELLOW_DOT = 4;

let selectedColor = null;
let grid = []; // Holds the current grid
let stage = 0; // 0 = Start Screen, 1 = Level Selection, 2 = Game Screen
let dragCancelled = false;

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  gameStage();
}

function gameStage() {
  // show start screen 
  if (stage === 0) {
    startScreen();
  }

  // show level screen
  if (stage === 1) {
    levelScreen();
  }

  // transition from start screen to level screen when mouse is clicked
  if (stage === 0 && mouseIsPressed) {
    stage = 1; // change to stage 1 when the screen is clicked
  }
}

function keyPressed() {
  // change grid based on key press and switch to game stage
  if (key === "1") {
    levelOne();
    stage = 2;
  } 
  
  if (key === "2") {
    levelTwo();
    stage = 2;
  } 
  
  if (key === "3") {
    levelThree();
    stage = 2;
  } 
  
  if (key === "4") {
    levelFour();
    stage = 2;
  } 
  
  if (key === "5") {
    levelFive();
  }
}

// Define grids for each level
function levelOne() {
  grid = [
    [1, 2, 0, 0],
    [0, 0, 0, 1],
    [3, 4, 0, 2],
    [0, 3, 0, 0],
  ];
}

function levelTwo() {
  grid = [
    [1, 2, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [3, 4, 0, 2, 0],
    [0, 3, 0, 0, 0],
    [0, 0, 0, 0, 4],
  ];
}

function levelThree() {
  grid = [
    [1, 2, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [3, 4, 0, 2, 0, 0],
    [0, 3, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0],
  ];
}

function levelFour() {
  grid = [
    [1, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [3, 4, 0, 2, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0],
  ];
}

function levelFive() {
  grid = [
    [1, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [3, 4, 0, 2, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0],
  ];
}

function mousePressed() {
  const GRID_ROWS = grid.length;
  const GRID_COLUMNS = grid[0].length;

  const offsetX = (width - GRID_COLUMNS * cellSize) / 2;
  const offsetY = (height - GRID_ROWS * cellSize) / 2;

   // get the tile position on the grid
  const gridX = Math.floor((mouseX - offsetX) / cellSize);
  const gridY = Math.floor((mouseY - offsetY) / cellSize);

  // select the color when clicking on a color tile
  if (gridY >= 0 && gridY < GRID_ROWS && gridX >= 0 && gridX < GRID_COLUMNS) {
    if (grid[gridY][gridX] === RED_DOT) {
      selectedColor = RED_DOT;
      dragCancelled = false;
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
}

function mouseDragged() {
  const GRID_ROWS = grid.length;
  const GRID_COLUMNS = grid[0].length;

  const offsetX = (width - GRID_COLUMNS * cellSize) / 2;
  const offsetY = (height - GRID_ROWS * cellSize) / 2;

  // get the tile position on the grid
  const gridX = Math.floor((mouseX - offsetX) / cellSize);
  const gridY = Math.floor((mouseY - offsetY) / cellSize);

  if ( 
    gridY >= 0 &&
    gridY < GRID_ROWS &&
    gridX >= 0 &&
    gridX < GRID_COLUMNS &&
    selectedColor !== null &&
    !dragCancelled
  ) 

  {
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
