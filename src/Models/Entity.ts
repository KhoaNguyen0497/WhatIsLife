class Entity {
    public Position: p5.Vector
    Speed: number = 5;
    VisionRadius: number = 100;
    Velocity: p5.Vector = p5.Vector.random2D().mult(this.Speed);
    FoodTarget: Food = null;
    RotationAngle : number = 45; // The Entity will turn randomly x degree to the left or right
    RotationAngleRadian : number; // The above as radian
    NoiseRandomness : number = 20 // %chance to turn each frame
    constructor() {
        this.SpawnRandom();
    }

    private SpawnRandom(): any {
        this.Position = createVector(random(width), random(height));
        this.RotationAngleRadian = PI/180 * this.RotationAngle;
    }

    public UpdateMovement(): any {
        if (this.FindFood()) {

            if (this.Position.equals(this.FoodTarget.Position)) {
                this.FoodTarget.Consumed = true;

                // Reset Velocity
                this.Velocity.normalize().mult(this.Speed);
            }
            else {
                // Get Direction to food
                let directionToFood: p5.Vector = createVector();
                directionToFood.x = this.FoodTarget.Position.x - this.Position.x;
                directionToFood.y = this.FoodTarget.Position.y - this.Position.y;

                this.Velocity = directionToFood;
                // Limit the max distance we can move
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
    }

    private FindFood(): boolean {
        // Is currently targeted food sourced consumed by someone else?
        if (this.FoodTarget?.Consumed) {
            this.FoodTarget = null;
        }
        // Find a new one
        else {
            for (let food of foodList) {
                if (VectorHelper.Distance(this.Position, food.Position) <= this.VisionRadius) {
                    this.FoodTarget = food;
                    break;
                }
            }
        }

        return this.FoodTarget != null;
    }
    public Wander(): any {
        if (NumberHelper.RandomPercentage(this.NoiseRandomness)) {
            this.Velocity = this.Velocity.rotate(random(-this.RotationAngleRadian, this.RotationAngleRadian))
        }

        // If it goes out of bound, +180degree to the angle
        if (this.Position.x + this.Velocity.x >= width || this.Position.x + this.Velocity.x <= 0) {
            this.Velocity.x *= -1;
        }

        if (this.Position.y + this.Velocity.y >= height || this.Position.y + this.Velocity.y <= 0) {
            this.Velocity.y *= -1;
        }
    }
    public Show(): any {
        let c = color(255, 204, 0);
        // Radius
        stroke(c);
        strokeWeight(1);
        noFill();
        circle(this.Position.x, this.Position.y, this.VisionRadius * 2);

        // The entity
        strokeWeight(15);
        stroke(c);
        point(this.Position.x, this.Position.y);

        // Line to food
        strokeWeight(1);
        if (this.FoodTarget != null) {
            line(this.Position.x, this.Position.y, this.FoodTarget.Position.x, this.FoodTarget.Position.y);
        }
    }
}