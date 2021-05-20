import { Config } from "../Config";

let foodList : Food[] = [];


export class Food
{
    public Position : p5.Vector
    public Consumed : boolean = false;

    constructor() 
    {
        this.SpawnRandom();
    }

    private SpawnRandom() : void 
    {
        this.Position = createVector(random(width), random(height));
    }
    
    public static SpawnFood() : void
    {
        while (foodList.length < Config.MaxFood)
        {
            let food = new Food();
            foodList.push(food);
        }
    }

    public Show() : void
    {
        strokeWeight(15);
        stroke("green");
        point(this.Position.x, this.Position.y);
    }
}