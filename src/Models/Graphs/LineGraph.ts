class LineGraph extends BaseGraph {
    Data: Point[] = [];

    MinX: number;
    MaxX: number;
    MinY: number;
    MaxY: number;

    constructor(p: p5.Vector, data: Point[]) {
        super(p);
        this.Data = data;
    }

    Draw(): void {
        this.GetExtrema();

        let p1, p2: Point;
        stroke(color("orange"))
        for (let i = 0; i < this.Data.length - 1; i++) {
            p1 = this.CalculateRelativePosition(this.Data[i]);
            p2 = this.CalculateRelativePosition(this.Data[i + 1]);

            // +-1 pixel to x and y so the line doesnt sit directly on the axes
            line(p1.x + 1, p1.y - 1, p2.x + 1, p2.y - 1);
        }

        // Draw these last so they are always on top
        this.DrawAxes();
    }

    private CalculateRelativePosition(p: Point): Point {
        let X, Y: number;

        X = (((p.x - this.MinX) / (this.MaxX - this.MinX)) * this.Width) + this.Position.x;
        Y = this.Position.y + this.Height - (((p.y - this.MinY) / (this.MaxY - this.MinY)) * this.Height);

        return { x: X, y: Y };
    }

    private GetExtrema(): void {
        this.MinX = min(this.Data.map(x => x.x));
        this.MaxX = max(this.Data.map(x => x.x));
        this.MinY = min(this.Data.map(x => x.y));
        this.MaxY = max(this.Data.map(x => x.y));

        if (this.MinX == this.MaxX) {
            this.MinX -= this.MinX;
            this.MaxX += this.MaxX;
        }

        if (this.MinY == this.MaxY) {
            this.MinY -= this.MinY;
            this.MaxY += this.MaxY;
        }
    }
}