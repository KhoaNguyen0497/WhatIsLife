import { Config } from "../Config";
var foodList = [];
var Food = /** @class */ (function () {
    function Food() {
        this.Consumed = false;
        this.SpawnRandom();
    }
    Food.prototype.SpawnRandom = function () {
        this.Position = createVector(random(width), random(height));
    };
    Food.SpawnFood = function () {
        while (foodList.length < Config.MaxFood) {
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
export { Food };
//# sourceMappingURL=Food.js.map