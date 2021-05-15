var speed;
var entities = [];
var numOfEntities = 10;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth - 200, windowHeight);
    rectMode(CENTER);
    frameRate(60);
    speed = createSlider(0, 10, 0, 0);
    speed.position(windowWidth - 190, 10);
    speed.style("width", "160px");
    for (var i = 0; i < numOfEntities; i++) {
        var entity = new Entity();
        entities.push(entity);
    }
}
function draw() {
    background(50);
    var i = 0;
    while (i <= speed.value()) {
        processFrame();
        i++;
    }
    drawFrame();
}
function processFrame() {
    Food.SpawnFood();
    entities.forEach(function (entity) {
        entity.UpdateMovement();
    });
}
function drawFrame() {
    entities.forEach(function (entity) {
        entity.Show();
    });
    foodList.forEach(function (food) {
        food.Show();
    });
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
var NumberHelper = (function () {
    function NumberHelper() {
    }
    NumberHelper.RandomPercentage = function (percentage) {
        return random(100) <= percentage;
    };
    return NumberHelper;
}());
var VectorHelper = (function () {
    function VectorHelper() {
    }
    VectorHelper.ConstrainPosition = function (position) {
        position.x = constrain(position.x, 0, width);
        position.y = constrain(position.y, 0, height);
    };
    VectorHelper.Distance = function (v1, v2) {
        return dist(v1.x, v1.y, v2.x, v2.y);
    };
    return VectorHelper;
}());
var Entity = (function () {
    function Entity() {
        this.Speed = 5;
        this.VisionRadius = 100;
        this.Velocity = p5.Vector.random2D().mult(this.Speed);
        this.FoodTarget = null;
        this.RotationAngle = 45;
        this.NoiseRandomness = 20;
        this.SpawnRandom();
    }
    Entity.prototype.SpawnRandom = function () {
        this.Position = createVector(random(width), random(height));
        this.RotationAngleRadian = PI / 180 * this.RotationAngle;
    };
    Entity.prototype.UpdateMovement = function () {
        if (this.FindFood()) {
            if (this.Position.equals(this.FoodTarget.Position)) {
                this.FoodTarget.Consumed = true;
                this.Velocity.normalize().mult(this.Speed);
            }
            else {
                var directionToFood = createVector();
                directionToFood.x = this.FoodTarget.Position.x - this.Position.x;
                directionToFood.y = this.FoodTarget.Position.y - this.Position.y;
                this.Velocity = directionToFood;
                this.Velocity.limit(min(directionToFood.mag(), this.Speed));
            }
        }
        else {
            this.Wander();
        }
        if (this.FoodTarget != null) {
            console.log(this.FoodTarget.Position.x + ";" + this.FoodTarget.Position.y);
        }
        this.Position.add(this.Velocity);
    };
    Entity.prototype.FindFood = function () {
        var _a;
        if ((_a = this.FoodTarget) === null || _a === void 0 ? void 0 : _a.Consumed) {
            this.FoodTarget = null;
        }
        else {
            for (var _i = 0, foodList_1 = foodList; _i < foodList_1.length; _i++) {
                var food = foodList_1[_i];
                if (VectorHelper.Distance(this.Position, food.Position) <= this.VisionRadius) {
                    this.FoodTarget = food;
                    break;
                }
            }
        }
        return this.FoodTarget != null;
    };
    Entity.prototype.Wander = function () {
        if (NumberHelper.RandomPercentage(this.NoiseRandomness)) {
            this.Velocity = this.Velocity.rotate(random(-this.RotationAngleRadian, this.RotationAngleRadian));
        }
        if (this.Position.x + this.Velocity.x >= width || this.Position.x + this.Velocity.x <= 0) {
            this.Velocity.x *= -1;
        }
        if (this.Position.y + this.Velocity.y >= height || this.Position.y + this.Velocity.y <= 0) {
            this.Velocity.y *= -1;
        }
    };
    Entity.prototype.Show = function () {
        var c = color(255, 204, 0);
        stroke(c);
        strokeWeight(1);
        noFill();
        circle(this.Position.x, this.Position.y, this.VisionRadius * 2);
        strokeWeight(15);
        stroke(c);
        point(this.Position.x, this.Position.y);
        strokeWeight(1);
        if (this.FoodTarget != null) {
            line(this.Position.x, this.Position.y, this.FoodTarget.Position.x, this.FoodTarget.Position.y);
        }
    };
    return Entity;
}());
var foodList = [];
var maxFoodEntities = 50;
var Food = (function () {
    function Food() {
        this.Consumed = false;
        this.SpawnRandom();
    }
    Food.prototype.SpawnRandom = function () {
        this.Position = createVector(random(width), random(height));
    };
    Food.SpawnFood = function () {
        foodList = foodList.filter(function (food) {
            return !food.Consumed;
        });
        while (foodList.length < maxFoodEntities) {
            var food = new Food();
            foodList.push(food);
        }
    };
    Food.prototype.Show = function () {
        strokeWeight(15);
        stroke("green");
        point(this.Position.x, this.Position.y);
    };
    return Food;
}());
//# sourceMappingURL=app.js.map