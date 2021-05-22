import { Entity } from "./Models/Entity";
import { Config } from "./Config";
import { Food } from "./Models/Food";
import p5 from "p5";
import * as p5Global from 'p5/global' 

// Entities and Food
export let entities: Entity[] = [];

// Frames & days
let fps: number = 60; // PC MASTER RACE
let framesPerDay: number = fps * 5; // A day advances every x seconds or 5x frames
let days: number = 0;
let actualFrameCount: number = 0;

// Settings
let speed: p5.Element;
let sideBarXLocation: number;
let dayTextBox: p5.Element;
let numOfEntitiesTextBox: p5.Element;
let avgAgeTextBox: p5.Element;
let visionCheckBox: any;
let debugCheckBox: any;

// Some random vars. TODO: put these somewhere else
let isNewDay: boolean = true;
export let newBorn: Entity[] = [];
let averageAge: number = 0;
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
  let a = new Food();
  dayTextBox = createDiv();
  dayTextBox.position(sideBarXLocation, 50)

  visionCheckBox = createCheckbox(' Show vision radius', false);
  visionCheckBox.position(sideBarXLocation, 80);

  debugCheckBox = createCheckbox(' Show debug info', false);
  debugCheckBox.position(sideBarXLocation, 110);

  numOfEntitiesTextBox = createDiv();
  numOfEntitiesTextBox.position(sideBarXLocation, 140)

  avgAgeTextBox = createDiv();
  avgAgeTextBox.position(sideBarXLocation, 160)
  console.log(Config.DisableDeath);
  // INITIALISE LIST
  for (let i = 0; i < Config.MaxEntities; i++) {
    let entity = new Entity();
    entities.push(entity);
  }
  Food.SpawnFood();
}

function draw() {
  // CLEAR BACKGROUND
  background(200);

}


// }

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

console.log('123')