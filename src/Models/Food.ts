let foodList : Food[] = [];


class Food
{
    public Position : p5.Vector
    public Consumed : boolean = false;

    constructor() 
    {
        this.SpawnRandom();
    }

    private SpawnRandom() : any 
    {
        this.Position = createVector(random(width), random(height));
    }
    
    public static SpawnFood() : any
    {
        while (foodList.length < maxFoodEntities)
        {
            let food = new Food();
            foodList.push(food);
        }
    }

    public Show() : any
    {
        strokeWeight(15);
        stroke("green");
        point(this.Position.x, this.Position.y);
    }
}