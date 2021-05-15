
// Entities and Food
let maxFoodEntities : number = 50;
let entities: Entity[] = [];
let numOfEntities: number = 10;

// Frames & days
let fps: number = 60; // PC MASTER RACE
let framesPerDay: number = fps * 5; // A day advances every x seconds or 5x frames
let days : number = 0;
let actualFrameCount : number = 0;

// Settings
let speed: p5.Element;
let sideBarXLocation : number;
let div: p5.Element;

function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  // FULLSCREEN CANVAS
  createCanvas(windowWidth - 200, windowHeight);

  // SETUP SOME OPTIONS
  rectMode(CENTER);
  frameRate(60);
  sideBarXLocation = windowWidth - 190;

  // SPEED SLIDER
  speed = createSlider(0, 10, 0, 0);
  speed.position(sideBarXLocation, 10);
  speed.style("width", "160px");
  div = createDiv("C");
  div.position(sideBarXLocation, 50)
  // INITIALISE LIST
  for (let i = 0; i < numOfEntities; i++) {
    let entity = new Entity();
    entities.push(entity);
  }
}
function draw() {
  // CLEAR BACKGROUND
  background(50);

  // The purpose of this loop is to preprocess frames before rendering them
  // Another way to do this is to increase the speed of each Entity, but the simulation won't be accurate, though it is more performant
  let i: number = 0;
  while (i <= <number>speed.value()) {
    processFrame();
    i++;
  }

  drawFrame();
}

function processFrame() {
  actualFrameCount+=1;
  days = floor(actualFrameCount / framesPerDay);
  Food.SpawnFood();
  entities.forEach(entity => {
    entity.UpdateMovement();
  });


}

function drawFrame() {
  entities.forEach(entity => {
    entity.Show();
  });
  foodList.forEach(food => {
    food.Show();
  });

  div.html("Current Day: " + days);   
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}