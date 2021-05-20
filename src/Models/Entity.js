import * as p5 from "p5";
import { Config } from "../Config";
var Entity = /** @class */ (function () {
    function Entity(position) {
        // Vectors
        this.Position = createVector();
        // Movement behaviour attributes
        this.RotationAngle = 45; // The Entity will turn randomly x degree to the left or right
        this.NoiseRandomness = 20; // %chance to turn each frame
        // Other attributes
        this.Speed = 5;
        this.VisionRadius = 150;
        // Gender: Gender = random(Object.values(Gender));
        this.Weight = 0;
        this.IsAlive = true;
        // Targets for different purposes
        //FoodTarget: Food = null;
        this.Partner = null;
        this.Velocity = p5.Vector.random2D().mult(this.Speed);
        ;
        this.RotationAngleRadian = PI / 180 * this.RotationAngle;
        this.Spawn(position);
        this.DayStart = 1;
    }
    Object.defineProperty(Entity.prototype, "Age", {
        get: function () {
            return 1 - this.DayStart;
            ;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.Die = function () {
        // sad
        if (this.Partner != null) {
            // this.Partner.ReproductiveFunction.Reset();
        }
        this.IsAlive = false;
    };
    Entity.prototype.Spawn = function (position) {
        if (position) {
            this.Position = createVector(position.x, position.y);
        }
        else {
            this.Position = createVector(random(width), random(height));
        }
    };
    Entity.prototype.Update = function () {
        // let tempStatuses: Status[] = [];
        // StatusConditions.forEach((condition: (e: Entity) => boolean, status: Status) => {
        //     if (condition(this)) {
        //         if (status == Status.Death){
        //             this.Die();
        //         }
        //         tempStatuses.push(status);
        //     }
        // });
        // if (!this.IsAlive){
        //     return;
        // }
        // this.Statuses = tempStatuses;
        // this.Hunger.Update();
        // this.ReproductiveFunction.Update();
        // if (this.FindFood()) {
        //     this.GetFood();
        // }
        // else if (this.FindPartner()) {
        //     this.MoveToPartner();
        // }
        // else {
        //     this.Wander();
        // }
        // this.Position.add(this.Velocity);
        // // Reset Velocity
        // this.Velocity.normalize().mult(this.Speed);
    };
    Entity.prototype.GetFood = function () {
        // if (this.Position.equals(this.FoodTarget.Position)) {
        //     this.FoodTarget.Consumed = true;
        //     this.FoodTarget = null;
        //     this.Hunger.Value += this.Hunger.FoodValue;
        //     this.Weight += 1;
        // }
        // else {
        //     // Get Direction to food
        //     let directionToFood: p5.Vector = createVector();
        //     directionToFood.x = this.FoodTarget.Position.x - this.Position.x;
        //     directionToFood.y = this.FoodTarget.Position.y - this.Position.y;
        //     this.Velocity = directionToFood;
        //     // Limit the max distance we can move
        //     this.Velocity.limit(min(directionToFood.mag(), this.Speed));
        // }
    };
    // private FindFood(): boolean {
    //     if (!this.Statuses.includes(Status.Hungry)) {
    //         return false;
    //     }
    //     // Is currently targeted food sourced consumed by someone else?
    //     if (this.FoodTarget?.Consumed) {
    //         this.FoodTarget = null;
    //     }
    //     // Find a new one
    //     else {
    //         for (let food of foodList) {
    //             if (VectorHelper.Distance(this.Position, food.Position) <= this.VisionRadius) {
    //                 this.FoodTarget = food;
    //                 break;
    //             }
    //         }
    //     }
    //     return this.FoodTarget != null;
    // }
    // private FindPartner(): boolean {
    //     if (!this.Statuses.includes(Status.UrgeToReproduce)) {
    //         return false;
    //     }
    //     if (this.Partner == null){
    //         for (let candidate of entities) {
    //             let condition: boolean = candidate.Gender != this.Gender && candidate.Statuses.includes(Status.UrgeToReproduce) && VectorHelper.Distance(this.Position, candidate.Position) <= this.VisionRadius + candidate.VisionRadius;
    //             if (condition) {
    //                 this.Partner = candidate;
    //                 candidate.Partner = this;
    //                 return true;
    //             }
    //         }
    //     }
    //     return this.Partner != null;
    // }
    // private MoveToPartner(): any {
    //     if (this.Position.equals(this.Partner.Position)) {
    //         // Reproduce
    //         let child: Entity = new Entity(this.Position);
    //         newBorn.push(child);
    //         this.Partner.ReproductiveFunction.Reset();
    //         this.ReproductiveFunction.Reset();
    //         this.Partner = null;
    //     }
    //     else {
    //         // Move to Partner
    //         let directtionToTarget: p5.Vector = createVector();
    //         directtionToTarget.x = this.Partner.Position.x - this.Position.x;
    //         directtionToTarget.y = this.Partner.Position.y - this.Position.y;
    //         this.Velocity = directtionToTarget;
    //         // Limit the max distance we can move
    //         this.Velocity.limit(min(directtionToTarget.mag(), this.Speed));
    //     }
    // }
    // public Wander(): void {
    //     if (NumberHelper.RandomPercentage(this.NoiseRandomness)) {
    //         this.Velocity = this.Velocity.rotate(random(-this.RotationAngleRadian, this.RotationAngleRadian))
    //     }
    //     // If it goes out of bound, +180degree to the angle
    //     if (this.Position.x + this.Velocity.x >= width || this.Position.x + this.Velocity.x <= 0) {
    //         this.Velocity.x *= -1;
    //     }
    //     if (this.Position.y + this.Velocity.y >= height || this.Position.y + this.Velocity.y <= 0) {
    //         this.Velocity.y *= -1;
    //     }
    // }
    Entity.prototype.Show = function () {
        var cMale = color(255, 204, 0);
        var cFemale = color(255, 51, 204);
        // if (this.Gender == Gender.Male) {
        //     stroke(cMale);
        // }
        // else {
        //     stroke(cFemale);
        // }
        // // Radius
        // if (visionCheckBox.checked()) {
        //     strokeWeight(1);
        //     noFill();
        //     circle(this.Position.x, this.Position.y, this.VisionRadius * 2);
        // }
        // The entity
        strokeWeight(Config.EnableWeightVisual ? this.Weight + 10 : 20);
        point(this.Position.x, this.Position.y);
        // Line to food
        strokeWeight(1);
        // if (this.FoodTarget != null) {
        //     line(this.Position.x, this.Position.y, this.FoodTarget.Position.x, this.FoodTarget.Position.y);
        // }
        // Debug info
        // if (debugCheckBox.checked()) {
        //     color('black');
        //     fill('black')
        //     textSize(18);
        //     stroke('black')
        //     text('Age: ' + this.Age, this.Position.x - 10, this.Position.y - 15);
        //     text('Hunger: ' + this.Hunger.Value, this.Position.x - 10, this.Position.y - 35);
        //     text('ReproductionNeed: ' + this.Statuses.includes(Status.UrgeToReproduce) + " (Partner:" + this.Partner + ")", this.Position.x - 10, this.Position.y - 50);
        // }
    };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map