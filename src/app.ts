// Entities and Food
let entities: Entity[] = [];

// Frames & days
let fps: number = 60; // PC MASTER RACE
let framesPerDay: number = fps * 5; // A day advances every x seconds or 5x frames
let days : number = 0;
let actualFrameCount : number = 0;

// Settings
let speed: p5.Element;
let sideBarXLocation : number;
let dayTextBox: p5.Element;
let numOfEntitiesTextBox: p5.Element;
let visionCheckBox : any;
let debugCheckBox : any;

// Some random vars. TODO: put these somewhere else
let isNewDay : boolean = true;
let newBorn : Entity[] = [];
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  // FULLSCREEN CANVAS
  createCanvas(windowWidth - 200, windowHeight);

  // SETUP SOME OPTIONS
  rectMode(CENTER);
  frameRate(60);
  sideBarXLocation = windowWidth - 190;

  //Sidebar options
  speed = createSlider(0, 10, 0, 0);
  speed.position(sideBarXLocation, 10);
  speed.style("width", "160px");

  dayTextBox = createDiv("C");
  dayTextBox.position(sideBarXLocation, 50)

  visionCheckBox = createCheckbox(' Show vision radius', true);
  visionCheckBox.position(sideBarXLocation, 80);

  debugCheckBox = createCheckbox(' Show debug info', true);
  debugCheckBox.position(sideBarXLocation, 110);

  numOfEntitiesTextBox = createDiv("C");
  numOfEntitiesTextBox.position(sideBarXLocation, 140)

  // INITIALISE LIST
  for (let i = 0; i < Config.MaxEntities; i++) 
  {
    let entity = new Entity();
    entities.push(entity);
  }
  Food.SpawnFood();
}

function draw() 
{
  // CLEAR BACKGROUND
  background(200);

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
  // Check for day change to trigger certain events
  let tempDay: number = floor(actualFrameCount / framesPerDay);
  if (tempDay > days){
    days = tempDay;
    Food.SpawnFood();
    isNewDay = true;
  }
 

  entities.forEach(entity => {
    entity.Update();
  });
  entities = entities.concat(newBorn);
  newBorn = [];

  // If it's consumed, remove it
  foodList = foodList.filter((food) =>
  {
      return !food.Consumed;
  });

  isNewDay = false;
}

function drawFrame() {
  entities.forEach(entity => {
    entity.Show();
  });
  foodList.forEach(food => {
    food.Show();
  });

  dayTextBox.html("Current Day: " + days);  
  numOfEntitiesTextBox.html("Number of Entities: " + entities.length) 
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}