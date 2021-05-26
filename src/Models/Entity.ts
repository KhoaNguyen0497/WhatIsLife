
class Entity {
    // Vectors
    Position: p5.Vector;
    Velocity: p5.Vector;

    // Movement behaviour attributes
    RotationAngle: number = 45; // The Entity will turn randomly x degree to the left or right
    RotationAngleRadian: number; // The above as radian
    NoiseRandomness: number = 20 // %chance to turn each frame

    // Other attributes
    Speed: number = Config.BaseSpeed;
    VisionRadius: number = 150;
    Gender: Gender = random(Object.values(Gender));
    Weight: number = 0;
    IsAlive: boolean = true;
    get Age(): number {
        return days - this.DayStart;;
    }

    // Targets for different purposes
    FoodTarget: Food = null;
    Partner: Entity = null;

    // Survival Mechanics
    Hunger: Hunger = new Hunger(this);
    ReproductiveFunction: ReproductiveFunction = new ReproductiveFunction(this);

    // Traits and Statuses
    Statuses: Status[] = []; // Temporary statuses that get recalculated every frame
    Traits: Trait[] = [];

    private DayStart: number;
    constructor(position?: p5.Vector) {
        this.Velocity = p5.Vector.random2D().mult(this.Speed);;
        this.RotationAngleRadian = PI / 180 * this.RotationAngle;
        this.Spawn(position);
        this.DayStart = days;
    }

    private Die(): void {
        // sad
        if (this.Partner != null) {
            this.Partner.ReproductiveFunction.Reset();
        }
        this.IsAlive = false;
    }

    // If position is not provided, this is a new Entity from the first generation (start of app)
    private Spawn(position: p5.Vector): void {
        if (position) {
            this.Position = createVector(position.x, position.y);
        }
        else {
            // Add a bunch of traits to the first generation. Remove any line to get rid of that trait for the entire simulation
            // For the 1st generation, no mutation happens and therefore no mods are applied
            this.Traits.push(new SpeedMod());
            this.Position = createVector(random(width), random(height));
        }
    }

    public Update(): void {
        let tempStatuses: Status[] = [];

        StatusConditions.forEach((condition: (e: Entity) => boolean, status: Status) => {
            if (condition(this)) {
                if (status == Status.Death) {
                    this.Die();
                }
                tempStatuses.push(status);
            }
        });

        if (!this.IsAlive) {
            return;
        }

        this.Statuses = tempStatuses;

        this.Hunger.Update();
        this.ReproductiveFunction.Update();

        if (this.FindFood()) {
            this.GetFood();
        }
        else if (this.FindPartner()) {
            this.MoveToPartner();
        }
        else {
            this.Wander();
        }

        this.Position.add(this.Velocity);

        // Reset Velocity
        this.Velocity.normalize().mult(this.Speed);
    }

    private GetFood(): void {
        if (this.Position.equals(this.FoodTarget.Position)) {
            this.FoodTarget.Consumed = true;
            this.FoodTarget = null;
            this.Hunger.Value += this.Hunger.FoodValue;
            this.Weight += 1;
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

    private FindFood(): boolean {
        if (!this.Statuses.includes(Status.Hungry)) {
            return false;
        }

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

    private FindPartner(): boolean {
        if (!this.Statuses.includes(Status.UrgeToReproduce)) {
            return false;
        }

        if (this.Partner == null) {
            for (let candidate of entities) {
                let condition: boolean = candidate.Gender != this.Gender && candidate.Statuses.includes(Status.UrgeToReproduce) && VectorHelper.Distance(this.Position, candidate.Position) <= this.VisionRadius + candidate.VisionRadius;
                if (condition) {
                    this.Partner = candidate;
                    candidate.Partner = this;
                    return true;
                }
            }
        }

        return this.Partner != null;
    }

    private Reproduce(): void {
        // Reproduce
        let child: Entity = new Entity(this.Position);

        // Inherit the traits from parents
        let allTraits = NumberHelper.groupBy(this.Traits.concat(this.Partner.Traits), t => t.GetTraitName());
        allTraits.forEach(element => {
            child.Traits.push(Trait.MergeTraits(element));
        });

        child.Traits.forEach(trait => {
            trait.Mutate();
            trait.ApplyModifications(child);
        });

        // Push child to the list to be processed next frame
        newBorn.push(child);

        this.Partner.ReproductiveFunction.Reset();
        this.ReproductiveFunction.Reset();
        this.Partner = null;
    }

    private MoveToPartner(): void {
        if (this.Position.equals(this.Partner.Position)) {
            this.Reproduce();
        }
        else {
            // Move to Partner
            let directtionToTarget: p5.Vector = createVector();
            directtionToTarget.x = this.Partner.Position.x - this.Position.x;
            directtionToTarget.y = this.Partner.Position.y - this.Position.y;

            this.Velocity = directtionToTarget;
            // Limit the max distance we can move
            this.Velocity.limit(min(directtionToTarget.mag(), this.Speed));
        }
    }

    public Wander(): void {
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
    public Show(): void {
        let cMale = color(Config.MaleColor);
        let cFemale = color(Config.FemaleColor);
        if (this.Gender == Gender.Male) {
            stroke(cMale);
        }
        else {
            stroke(cFemale);
        }
        // Radius
        if (visionCheckBox.checked()) {
            strokeWeight(1);
            noFill();
            circle(this.Position.x, this.Position.y, this.VisionRadius * 2);
        }


        // The entity
        strokeWeight(Config.EnableWeightVisual ? this.Weight + 10 : 15);
        point(this.Position.x, this.Position.y);

        // Line to food
        strokeWeight(1);
        if (this.FoodTarget != null) {
            line(this.Position.x, this.Position.y, this.FoodTarget.Position.x, this.FoodTarget.Position.y);
        }

        // Debug info
        if (debugCheckBox.checked()) {
            let debugInterface = new EntityDebugInterface(this);

            color('black');
            fill('black');
            textSize(18);
            stroke('black');


            
            debugInterface.AppendText('Age: ' + this.Age);
            debugInterface.AppendText('Hunger: ' + this.Hunger.Value);
            //debugInterface.AppendText('ReproductionNeed: ' + this.Statuses.includes(Status.UrgeToReproduce) + " (Partner:" + this.Partner + ")");
            debugInterface.AppendText('Speed: ' + this.Speed);
        }
    }
}
