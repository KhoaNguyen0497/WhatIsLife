// GLOBAL VARS & TYPES
let speed: p5.Element;
let entities: Entity[] = [];
let numOfEntities: number = 1;

function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  // FULLSCREEN CANVAS
  createCanvas(windowWidth - 200, windowHeight);

  // SETUP SOME OPTIONS
  rectMode(CENTER);
  frameRate(60);

  // SPEED SLIDER
  speed = createSlider(0, 10, 0, 0);
  speed.position(windowWidth - 190, 10);
  speed.style("width", "160px");

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
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}