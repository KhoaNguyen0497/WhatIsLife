import { Entity } from "./Models/Entity";
import { Config } from "./Config";
import { Food } from "./Models/Food";
// Entities and Food
export var entities = [];
// Frames & days
var fps = 60; // PC MASTER RACE
var framesPerDay = fps * 5; // A day advances every x seconds or 5x frames
var days = 0;
var actualFrameCount = 0;
// Settings
var speed;
var sideBarXLocation;
var dayTextBox;
var numOfEntitiesTextBox;
var avgAgeTextBox;
var visionCheckBox;
var debugCheckBox;
// Some random vars. TODO: put these somewhere else
var isNewDay = true;
export var newBorn = [];
var averageAge = 0;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    // FULLSCREEN CANVAS
    createCanvas(windowWidth - 200, windowHeight);
    // SETUP SOME OPTIONS
    rectMode(CENTER);
    frameRate(60);
    sideBarXLocation = windowWidth - 190;
    //Sidebar options
    speed = createSlider(0, 20, 1, 0);
    speed.position(sideBarXLocation, 10);
    speed.style("width", "160px");
    var a = new Food();
    dayTextBox = createDiv();
    dayTextBox.position(sideBarXLocation, 50);
    visionCheckBox = createCheckbox(' Show vision radius', false);
    visionCheckBox.position(sideBarXLocation, 80);
    debugCheckBox = createCheckbox(' Show debug info', false);
    debugCheckBox.position(sideBarXLocation, 110);
    numOfEntitiesTextBox = createDiv();
    numOfEntitiesTextBox.position(sideBarXLocation, 140);
    avgAgeTextBox = createDiv();
    avgAgeTextBox.position(sideBarXLocation, 160);
    console.log(Config.DisableDeath);
    // INITIALISE LIST
    for (var i = 0; i < Config.MaxEntities; i++) {
        var entity = new Entity();
        entities.push(entity);
    }
    Food.SpawnFood();
}
function draw() {
    // CLEAR BACKGROUND
    background(200);
    // // The purpose of this loop is to preprocess frames before rendering them
    // // Another way to do this is to increase the speed of each Entity, but the simulation won't be accurate, though it is more performant
    // let i: number = 0;
    // while (i < <number>speed.value()) {
    //   processFrame();
    //   i++;
    // }
    // drawFrame();
}
// function processFrame() {
//   actualFrameCount += 1;
//   // Check for day change to trigger certain events
//   let tempDay: number = floor(actualFrameCount / framesPerDay);
//   if (tempDay > days) {
//     days = tempDay;
//     Food.SpawnFood();
//     isNewDay = true;
//   }
//   averageAge = 0;
//   entities.forEach(entity => {
//     entity.Update();
//     averageAge += entity.Age;
//   });
//   entities = entities.filter(e => e.IsAlive);
//   averageAge = averageAge / entities.length;
//   entities = entities.concat(newBorn);
//   newBorn = [];
//   // If it's consumed, remove it
//   foodList = foodList.filter((food) => {
//     return !food.Consumed;
//   });
//   isNewDay = false;
// }
// function drawFrame() {
//   entities.forEach(entity => {
//     entity.Show();
//   });
//   foodList.forEach(food => {
//     food.Show();
//   });
//   dayTextBox.html("Current Day: " + days);
//   numOfEntitiesTextBox.html("Number of Entities: " + entities.length)
//   avgAgeTextBox.html("Average Age: " + averageAge)
// }
// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=app.js.map