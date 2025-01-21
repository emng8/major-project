// Flow Free Game - Final Project 
// Emily Ng
// Tuesday, January 21, 2025

// grid characteristics
let grid = []; 
const cellSize = 50;
const EMPTY_TILE = 0;

// dot characteristics
let selectedColor = null;
const RED_DOT = 1;
const BLUE_DOT = 2;
const GREEN_DOT = 3;
const YELLOW_DOT = 4;

// start screen
let stage = 0; 

// setting and storing timer characteristics
let startTime = 0; 
let elapsedTime = 0; 
let levelStartTime = 0; 
let levelCompletionTime = 0; 
let waitForCompletion = false;  

// tracks if the drag path is interrupted
let dragCancelled = false;

// variable for music
let music;
let musicPlayed = false;

function preload() {
  music = loadSound('music.mp3');
}

function setup() {
  createCanvas(500, 500);
  noStroke();
  music.amp(0.5);
}

function draw() {
  // calling function to play game 
  gameStage();
}

function gameStage() {
  // show start screen
  if (stage === 0) {
    startScreen();

    // plays music
    if (!musicPlayed) {
      music.loop();
      musicPlayed = true;
    }
  } 

  // show level screen
  if (stage === 1) {
    levelScreen();
  } 
  
  // show chosen game level
  if (stage === 2) {
    displayGrid();
    displayTimer(); 
    checkCompletion();
  }

  // shows completed level screen
  if (stage === 3) {
    completedLevelScreen();
  }
}

function startScreen() {
  // start screen text, pictures, and instructions
  background(0);
  textSize(22);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 30);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 470);

  // title
  textSize(50);
  noStroke();
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  let colors = ['red', 'yellow', 'green', 'blue'];
  let word = "FLOW FREE";
  
  for (let i = 0; i < word.length; i++) {
    fill(colors[i % colors.length]);
    text(word[i], textWidth(word) / 2.5 + textWidth(word.substring(0, i)), height / 3 - 30);
  }

  // start button
  fill(255, 0, 0);
  rect(150, 200, 200, 50, 10);
  stroke(255);
  strokeWeight(2);
  noFill();
  rect(150, 200, 200, 50, 10, 10);

  fill(255);
  textSize(15);
  noStroke();
  text("CLICK TO START", width / 2, 225);
  
  // instructions
  fill(255);
  textSize(13);
  text('Connect dots of the same color by clicking and dragging your mouse.', 250, 300);
  text('Do not let the colors intersect and make sure that the entire grid is filled.', 250, 330);
  
  textSize(22);
  text('🎮HAVE FUN PLAYING!🎮', 250, 400);

  // switch to stage 1
  if (mouseIsPressed) {
    stage = 1;
  }
}

function levelScreen() {
  // level selection screen text and instructions
  background(0);
  fill(255);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("PRESS A NUMBER TO SELECT A LEVEL", width / 2, 70);

  // colors for the rectangles
  let colors = ['red', 'yellow', 'green', 'blue'];
  
  // text and position for each level option
  let levels = [
    { text: "1: Level 1 (4x4)", y: 140 },
    { text: "2: Level 2 (5x5)", y: 210 },
    { text: "3: Level 3 (6x6)", y: 280 },
    { text: "4: Level 4 (7x7)", y: 350 },
    { text: "5: Level 5 (8x8)", y: 420 }
  ];

  // displaying the colored rectangles and text for each level
  for (let i = 0; i < levels.length; i++) {
    // draw the rectangle behind the text
    fill(colors[i % colors.length]);
    let rectWidth = textWidth(levels[i].text) + 40;
    let rectHeight = 50;
    let rectX = width / 2 - rectWidth / 2;
    let rectY = levels[i].y - rectHeight / 2;
    
    rect(rectX, rectY, rectWidth, rectHeight, 10); 
    stroke(255);
    strokeWeight(2);
    noFill();
    rect(rectX, rectY, rectWidth, rectHeight, 10);
    
    // display text
    noStroke();
    fill(0);
    textSize(25);
    text(levels[i].text, width / 2, levels[i].y);
  }
}

function completedLevelScreen() {
  // completed level screen text, pictures, timer, and instructions
  background(0);
  textSize(22);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 30);
  text('🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵🔴🟡🟢🔵', 250, 470);
  fill(255);
  textSize(45);
  textAlign(CENTER, CENTER);
  text("LEVEL COMPLETED!", width / 2, 150);

  // calculate and display the time taken to complete the level
  let timeTaken = (levelCompletionTime - levelStartTime) / 1000;
  textSize(25);
  text(`Time taken to complete level: ${Math.round(timeTaken)-2} seconds`, width / 2, height / 2); // subtracts 2 second wait
  
  // play again button
  fill(255, 0, 0);
  rect(150, 320, 200, 50, 10);
  stroke(255);
  strokeWeight(2);
  noFill();
  rect(150, 320, 200, 50, 10, 10);

  noStroke();
  fill(255);
  textSize(16);
  text("Click here to play again!", width / 2, 347);
  
  // switch to stage 1
  if (mouseIsPressed) {
    stage = 1; // move to level selection screen
  }
}

function keyPressed() {
  // level one selection and begin timer
  if (key === "1") {
    levelOne();
    stage = 2;
    startTime = millis(); 
  } 
  
  // level two selection and begin timer
  if (key === "2") {
    levelTwo();
    stage = 2;
    startTime = millis();
  } 
  
  // level three selection and begin timer
  if (key === "3") {
    levelThree();
    stage = 2;
    startTime = millis();
  } 
  
  // level four selection and begin timer
  if (key === "4") {
    levelFour();
    stage = 2;
    startTime = millis();
  } 
  
  // level five selection and begin timer
  if (key === "5") {
    levelFive();
    stage = 2;
    startTime = millis();
  }
}

function levelOne() {
  // level one uncompleted and completed grid
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
  // level two uncompleted and completed grid
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
  // level three uncompleted and completed grid
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
  // level four uncompleted and completed grid
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
  // level five uncompleted and completed grid
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

function displayGrid() {
  // loops through grid to display the proper colored dots
  background(0);
  const GRID_ROWS = grid.length;
  const GRID_COLUMNS = grid[0].length;
  const offsetX = (width - GRID_COLUMNS * cellSize) / 2;
  const offsetY = (height - GRID_ROWS * cellSize) / 2;

  strokeWeight(1);
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLUMNS; x++) {

      // black squares for grid 
      fill("black");
      stroke(255);
      square(offsetX + x * cellSize, offsetY + y * cellSize, cellSize);
    
      // draw colored dots based on grid values
      noStroke(); 

      // red dot
      if (grid[y][x] === RED_DOT) {
        fill("red");
        ellipse(
          offsetX + x * cellSize + cellSize / 2,
          offsetY + y * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      } 
      
      // blue dot
      else if (grid[y][x] === BLUE_DOT) {
        fill("blue");
        ellipse(
          offsetX + x * cellSize + cellSize / 2,
          offsetY + y * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      } 
      
      // green dot
      else if (grid[y][x] === GREEN_DOT) {
        fill("green");
        ellipse(
          offsetX + x * cellSize + cellSize / 2,
          offsetY + y * cellSize + cellSize / 2,
          cellSize * 0.8,
          cellSize * 0.8
        );
      } 
      
      // yellow dot
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

function displayTimer() {
  // calculates the time
  elapsedTime = int((millis() - startTime) / 1000);
  
  // timer charactristics
  fill(255);
  textSize(27);
  textAlign(RIGHT, TOP);
  text("Time: " + elapsedTime + "s", width - 20, 15);
}

function checkCompletion() {
  // compares the uncompleted grid to the completed grid to determine if the level is complete
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== completedGrid[y][x]) {
        return false; // grid is not completed
      }
    }
  }
  // if the grid matches the completed grid, start 2-second wait
  if (!waitForCompletion) {
    waitForCompletion = true;
    levelCompletionTime = millis();  // store the time it took to complete the level
  }

  // if 2 seconds have passed, switch to the completed level screen
  if (waitForCompletion && millis() - levelCompletionTime >= 2000) {
    stage = 3;
  }

  return true;
}

function mousePressed() {
  // determines if player clicks on a dot
  const GRID_ROWS = grid.length;
  const GRID_COLUMNS = grid[0].length;

  const offsetX = (width - GRID_COLUMNS * cellSize) / 2;
  const offsetY = (height - GRID_ROWS * cellSize) / 2;

  const gridX = Math.floor((mouseX - offsetX) / cellSize);
  const gridY = Math.floor((mouseY - offsetY) / cellSize);

  // selects the color of the dot being clicked on and stops the drag if it goes over a different colored dot
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
  // uses selected color and draws other dots when the mouse is dragged
  const GRID_ROWS = grid.length;
  const GRID_COLUMNS = grid[0].length;

  const offsetX = (width - GRID_COLUMNS * cellSize) / 2;
  const offsetY = (height - GRID_ROWS * cellSize) / 2;

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

    // if a different color is encountered, stop filling and cancel the drag
    if (grid[gridY][gridX] !== EMPTY_TILE && grid[gridY][gridX] !== selectedColor) {
      dragCancelled = true;
      return;
    }

    // if the tile is empty, draw dot using selected color
    if (grid[gridY][gridX] === EMPTY_TILE) {
      grid[gridY][gridX] = selectedColor;
    }
  }
}