// Entities and Food
let entities: Entity[] = [];

// Frames & days
let framesPerDay: number = 150; // A day advances every x movement updates
let days: number = -1;
let movementUpdateCount: number = 0;

// Settings
let speed: p5.Element;
let dayTextBox: p5.Element;
let numOfEntitiesTextBox: p5.Element;
let avgAgeTextBox: p5.Element;
let visionCheckBox: any;
let debugCheckBox: any;
let toggleGraph: p5.Element;

// Some random vars. TODO: put these somewhere else
let isNewDay: boolean = true;
let newBorn: Entity[] = [];
let averageAge: number = 0;
let showGraphs: boolean = false;
let startTime : number = new Date().getTime();
// Data
let PopulationData: Point[] = [];
let fpsData: Point[] = [];

function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  // FULLSCREEN CANVAS
  createCanvas(windowWidth - 250, windowHeight);

  // SETUP SOME OPTIONS
  rectMode(CENTER);
  frameRate(Config.TargetFPS);

  //Sidebar options
  let sidebar = new SidebarInterface(createVector(width, 0))
  speed = sidebar.AppendSlider(0, 50, 1, 0, 160)

  dayTextBox = sidebar.AppendDiv('Days: ');

  visionCheckBox = sidebar.AppendCheckBox('Show Vision', false)

  debugCheckBox = sidebar.AppendCheckBox('Show debug info', false);

  numOfEntitiesTextBox = sidebar.AppendDiv('Number of Entities: ');

  avgAgeTextBox = sidebar.AppendDiv('Average Age: ');

  toggleGraph = sidebar.AppendButton('Toggle Graphs', function () {
    showGraphs = !showGraphs;
  });
  // INITIALISE LIST
  for (let i = 0; i < Config.MaxEntities; i++) {
    let entity = new Entity();
    entities.push(entity);
  }
}

function draw() {
  fpsData.push({ x: new Date().getTime() - startTime, y: frameRate() });
  if (fpsData.length > Config.TargetFPS * 10){
    fpsData.shift();
  }
  // The purpose of this loop is to preprocess frames before rendering them
  // Another way to do this is to increase the speed of each Entity, but the simulation won't be accurate, though it is more performant
  let i: number = 0;
  while (i < <number>speed.value()) {
    processFrame();
    i++;
  }

  if (showGraphs) {
    drawGraphs();
  }
  else {
    drawFrame();
  }

  updateDebugPanel();
}

function TriggerNewDay(currentDay: number) {
  isNewDay = true;
  days = currentDay;
  Food.SpawnFood();

  PopulationData.push({ x: days, y: entities.length });
  if (PopulationData.length > Config.DataMaxSize) {
    PopulationData.shift();
  }
}

function processFrame() {
  movementUpdateCount += 1;
  // Check for day change to trigger certain events
  let tempDay: number = floor(movementUpdateCount / framesPerDay);
  if (tempDay > days) {
    TriggerNewDay(tempDay);
  }

  averageAge = 0;
  entities.forEach(entity => {
    entity.Update();
    averageAge += entity.Age;
  });
  entities = entities.filter(e => e.IsAlive);
  averageAge = averageAge / entities.length;
  entities = entities.concat(newBorn);
  newBorn = [];

  // If it's consumed, remove it
  foodList = foodList.filter((food) => {
    return !food.Consumed;
  });

  isNewDay = false;
}

function drawFrame() {
  // CLEAR BACKGROUND
  background(color(Config.BackgroundColor));

  entities.forEach(entity => {
    entity.Show();
  });
  foodList.forEach(food => {
    food.Show();
  });
}

function drawGraphs() {
  // CLEAR BACKGROUND
  background(color(Config.BackgroundColor));
  let populationGraph = new LineGraph(createVector(120, 120), PopulationData, "Population", "Day", "Number of Entities", 50);
  let fpsGraph = new LineGraph(createVector(900, 120), fpsData, "FPS", "Time (milliseconds)", "FPS", 5000); 
  populationGraph.Draw();
  fpsGraph.Draw();
}


// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updateDebugPanel() {
  // Debug panel
  dayTextBox.html(<string>dayTextBox.value() + days);
  numOfEntitiesTextBox.html(<string>numOfEntitiesTextBox.value() + entities.length)
  avgAgeTextBox.html(<string>avgAgeTextBox.value() + averageAge.toFixed(1));
}