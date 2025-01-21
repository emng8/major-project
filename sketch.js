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
let stage = 0; // 0 = Start Screen, 1 = Level Selection, 2 = Game Screen, 3 = Completed Level
let dragCancelled = false; // tracks if the drag path is interrupted
let startTime = 0; // timer start time in millis
let elapsedTime = 0; // elapsed time in seconds

let levelStartTime = 0; // to store the time when the level starts
let levelCompletionTime = 0;  // to store the time when the level is completed
let waitForCompletion = false;  // flag to indicate whether to wait for 5 seconds

// let buttonRect = { x: 150, y: 320, width: 200, height: 50 }; // coordinates and dimensions for the "play again" button

function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  gameStage();
}

function gameStage() {
  if (stage === 0) {
    startScreen();
  } 

  if (stage === 1) {
    levelScreen();
  } 
  
  if (stage === 2) {
    displayGrid();
    displayTimer(); // display timer
    checkCompletion(); // Check if the current grid matches the completed grid
  }

  if (stage === 3) {
    completedLevelScreen();
  }
}

function keyPressed() {
  // change grid based on key press and switch to game stage
  if (key === "1") {
    levelOne();
    stage = 2;
    startTime = millis(); // start the timer
  } 
  
  if (key === "2") {
    levelTwo();
    stage = 2;
    startTime = millis();
  } 
  
  if (key === "3") {
    levelThree();
    stage = 2;
    startTime = millis();
  } 
  
  if (key === "4") {
    levelFour();
    stage = 2;
    startTime = millis();
  } 
  
  if (key === "5") {
    levelFive();
    stage = 2;
    startTime = millis();
  }
}

function startScreen() {
  background(0);
  textSize(22);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 30);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 470);

  textSize(50);
  noStroke();
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let colors = ['red', 'yellow', 'green', 'blue'];
  let word = "FLOW FREE";
  
  for (let i = 0; i < word.length; i++) {
    fill(colors[i % colors.length]);  // Cycle through the colors
    text(word[i], textWidth(word) / 2.5 + textWidth(word.substring(0, i)), height / 3 - 30);
  }

    // Draw the "Play Again" button
  fill(255, 0, 0);  // Red background
  rect(150, 200, 200, 50, 10);  // Draw the rectangle with rounded corners

  // Add white border to the button
  stroke(255);
  strokeWeight(2);
  noFill();
  rect(150, 200, 200, 50, 10, 10);

  // ellipse(width / 2, 2 * height / 3, 150, 150);

  fill(255);
  textSize(15);
  noStroke();
  text("CLICK TO START", width / 2, 225);
  
  fill(255);
  textSize(13);
  // textAlign(CENTER, CENTER);

  text('Connect dots of the same color by clicking and dragging your mouse.', 250, 300);
  text('Do not let the colors intersect and make sure that the entire grid is filled.', 250, 330);
  
  textSize(22);
  text('🎮HAVE FUN PLAYING!🎮', 250, 400);

  // transition to level selection screen when clicked
  if (mouseIsPressed) {
    stage = 1; // move to level selection screen
  }
}

function levelScreen() {
  background(0);
  
  fill(255);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("PRESS A NUMBER TO SELECT A LEVEL", width / 2, 80);

  // colors for the background rectangles
  let colors = ['red', 'yellow', 'green', 'blue'];
  
  // positions for each level option
  let levels = [
    { text: "1: Level 1 (4x4)", y: 140 },
    { text: "2: Level 2 (5x5)", y: 210 },
    { text: "3: Level 3 (6x6)", y: 280 },
    { text: "4: Level 4 (7x7)", y: 350 },
    { text: "5: Level 5 (8x8)", y: 420 }
  ];

  // draw the colored rectangles and text for each level
  for (let i = 0; i < levels.length; i++) {
    // draw the rectangle behind the text
    fill(colors[i % colors.length]);  // cycle through colors
    let rectWidth = textWidth(levels[i].text) + 40;  // add padding around the text (increased padding)
    let rectHeight = 50;
    let rectX = width / 2 - rectWidth / 2;
    let rectY = levels[i].y - rectHeight / 2;
    
    rect(rectX, rectY, rectWidth, rectHeight, 10);  // draw rounded rectangle
    
    // draw the white border around the rectangle
    stroke(255);
    strokeWeight(2);
    noFill();
    rect(rectX, rectY, rectWidth, rectHeight, 10);  // Draw border
    
    // draw the text on top of the rectangle
    noStroke();
    fill(0);
    textSize(25);
    text(levels[i].text, width / 2, levels[i].y);
  }
}

function displayTimer() {
  // calculate elapsed time
  elapsedTime = int((millis() - startTime) / 1000);  // convert to seconds
  
  // timer characteristics
  fill(255);
  textSize(27);
  textAlign(RIGHT, TOP);
  text("Time: " + elapsedTime + "s", width - 20, 15);
}


function completedLevelScreen() {
  background(0);
  textSize(22);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 30);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 470);
  fill(255);
  textSize(45);
  textAlign(CENTER, CENTER);
  text("LEVEL COMPLETED!", width / 2, 150);

  // Calculate the time taken to complete the level
  let timeTaken = (levelCompletionTime - levelStartTime) / 1000; // Convert milliseconds to seconds

  // Display the time taken (rounded to nearest integer)
  textSize(25);
  text(`Time taken to complete level: ${Math.round(timeTaken)-2} seconds`, width / 2, height / 2);
  
  // Draw the "Play Again" button
  fill(255, 0, 0);  // Red background
  rect(150, 320, 200, 50, 10);  // Draw the rectangle with rounded corners
  
  // Add white border to the button
  stroke(255);
  strokeWeight(2);
  noFill();
  rect(150, 320, 200, 50, 10, 10);

  // Display the text on the button
  noStroke();
  fill(255);
  textSize(16);
  text("Click here to play again!", width / 2, 347);
  
  if (mouseIsPressed) {
    stage = 1; // move to level selection screen
  }
}

function displayGrid() {
  background(0);
  const GRID_ROWS = grid.length;
  const GRID_COLUMNS = grid[0].length;

  // Calculate the top-left corner to center the grid
  const offsetX = (width - GRID_COLUMNS * cellSize) / 2;
  const offsetY = (height - GRID_ROWS * cellSize) / 2;

  strokeWeight(1);
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLUMNS; x++) {
      // Draw black squares as the grid background
      fill("black");
      stroke(255);
      square(offsetX + x * cellSize, offsetY + y * cellSize, cellSize);
    
      noStroke(); 

      // Draw colored circles based on grid values
      if (grid[y][x] === RED_DOT) {
        fill("red");
        ellipse(
          offsetX + x * cellSize + cellSize / 2,
          offsetY + y * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      } 
      
      else if (grid[y][x] === BLUE_DOT) {
        fill("blue");
        ellipse(
          offsetX + x * cellSize + cellSize / 2,
          offsetY + y * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      } 
      
      else if (grid[y][x] === GREEN_DOT) {
        fill("green");
        ellipse(
          offsetX + x * cellSize + cellSize / 2,
          offsetY + y * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      } 
      
      else if (grid[y][x] === YELLOW_DOT) {
        fill("yellow");
        ellipse(
          offsetX + x * cellSize + cellSize / 2,
          offsetY + y * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      }
    }
  }
}

function checkCompletion() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== completedGrid[y][x]) {
        return false; // Grid does not match the completed grid
      }
    }
  }
  // if the grid matches the completed grid, start the 2-second wait
  if (!waitForCompletion) {
    waitForCompletion = true;
    levelCompletionTime = millis();  // store the time when the level is completed
  }

  // If 2 seconds have passed, transition to the completed level screen
  if (waitForCompletion && millis() - levelCompletionTime >= 2000) {
    stage = 3;  // switch to the "Completed Level" screen
  }

  return true;
}

// Define grids for each level
function levelOne() {
  grid = [
    [4, 0, 3, 0],
    [1, 0, 4, 0],
    [0, 1, 3, 0],
    [2, 0, 0, 2],
  ];

  completedGrid = [
    [4, 4, 3, 3],
    [1, 4, 4, 3],
    [1, 1, 3, 3],
    [2, 2, 2, 2],
  ];
}

function levelTwo() {
  grid = [
    [1, 0, 0, 4, 0],
    [0, 2, 0, 3, 0],
    [0, 1, 0, 0, 0],
    [0, 3, 0, 0, 0],
    [0, 0, 2, 4, 0],
  ];

  completedGrid = [
    [1, 1, 1, 4, 4],
    [2, 2, 1, 3, 4],
    [2, 1, 1, 3, 4],
    [2, 3, 3, 3, 4],
    [2, 2, 2, 4, 4],
  ];
}

function levelThree() {
  grid = [
    [0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 4, 0],
    [0, 0, 4, 0, 0, 0],
    [0, 0, 0, 3, 0, 0],
    [2, 0, 0, 0, 0, 0],
    [3, 0, 1, 0, 0, 0],
  ];

  completedGrid = [
    [2, 2, 1, 1, 1, 1],
    [2, 3, 3, 3, 4, 1],
    [2, 3, 4, 3, 4, 1],
    [2, 3, 4, 3, 4, 1],
    [2, 3, 4, 4, 4, 1],
    [3, 3, 1, 1, 1, 1],
  ];
}

function levelFour() {
  grid = [
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 4, 0],
    [0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 4, 0, 0, 0, 3, 0],
    [2, 0, 0, 0, 0, 0, 0],
  ];

  completedGrid = [
    [4, 4, 4, 4, 4, 4, 1],
    [4, 3, 3, 3, 3, 4, 1],
    [4, 3, 1, 1, 1, 4, 1],
    [4, 3, 1, 2, 1, 1, 1],
    [4, 3, 3, 2, 2, 2, 2],
    [4, 4, 3, 3, 3, 3, 2],
    [2, 2, 2, 2, 2, 2, 2],
  ];
}

function levelFive() {
  grid = [
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 2, 0],
    [0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
  ];

  completedGrid = [
    [1, 1, 1, 1, 3, 3, 3, 3],
    [1, 2, 2, 1, 3, 3, 2, 3],
    [1, 4, 2, 1, 2, 2, 2, 3],
    [1, 4, 2, 1, 2, 3, 3, 3],
    [1, 4, 2, 1, 2, 3, 3, 4],
    [1, 4, 2, 2, 2, 3, 3, 4],
    [1, 4, 4, 4, 4, 4, 4, 4],
    [1, 1, 1, 1, 1, 1, 1, 1],
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
  ) {
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