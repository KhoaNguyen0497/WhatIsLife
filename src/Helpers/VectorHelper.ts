class VectorHelper 
{
    public static ConstrainPosition(position: p5.Vector) 
    {
        position.x = constrain(position.x, 0, width);
        position.y = constrain(position.y, 0, height);
    }

    public static Distance(v1: p5.Vector, v2: p5.Vector) : number 
    {
        return dist(v1.x, v1.y, v2.x, v2.y);
    }
}