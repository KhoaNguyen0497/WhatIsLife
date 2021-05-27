abstract class BaseGraph {
    Position: p5.Vector;
    Width: number = 500;
    Height: number = 300;
    
    constructor(p: p5.Vector) {
        this.Position = p;
    }

    protected DrawAxes(): void {
        stroke(color("black"));
        strokeWeight(3);
        line(this.Position.x, this.Position.y, this.Position.x, this.Position.y + this.Height);
        line(this.Position.x, this.Position.y + this.Height, this.Position.x + this.Width, this.Position.y + this.Height);
    }

    abstract Draw(): void;
}