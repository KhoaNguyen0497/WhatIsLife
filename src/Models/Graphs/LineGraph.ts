class LineGraph extends BaseGraph {
    Data: Point[] = [];

    MinX: number;
    MaxX: number;
    MinY: number;
    MaxY: number;
    LabelX: string;
    LabelY: string;
    MainTitle: string;
    IntervalX: number;
    LineColor: p5.Color = color("orange");

    private XLabelOffset: number = -50;
    private YLabelOffset: number = 75;

    constructor(p: p5.Vector, data: Point[], title: string, labelX: string, labelY: string, intervalX: number) {
        super(p);
        this.Data = data;
        this.LabelX = labelX;
        this.LabelY = labelY;
        this.MainTitle = title;
        this.IntervalX = intervalX;
    }

    Draw(): void {
        this.GetExtrema();

        let p1, p2: Point;
        push();
        strokeWeight(1)
        stroke(this.LineColor)
        for (let i = 0; i < this.Data.length - 1; i++) {
            p1 = this.CalculateRelativePosition(this.Data[i]);
            p2 = this.CalculateRelativePosition(this.Data[i + 1]);

            // +-1 pixel to x and y so the line doesnt sit directly on the axes
            line(p1.x + 1, p1.y - 1, p2.x + 1, p2.y - 1);
        }
        pop()
        // Draw these last so they are always on top
        this.DrawAxes();
        this.DrawLabels();
        this.DrawYIntervals();
        this.DrawXIntervals();
    }

    private DrawXInteralEndpoint(value: number, x: number, y: number) {
        text(value, x, y); 
        line(x, y - 5, x, this.Position.y + this.Height);
    }

    private DrawXIntervals(): void {
        push()
        strokeWeight(1)
        textSize(18);
        textAlign(CENTER, TOP);
        if (this.MaxX - this.MinX < this.IntervalX) {
            this.DrawXInteralEndpoint(this.MinX, this.Position.x, this.Position.y + this.Height + this.YLabelOffset / 3);
            this.DrawXInteralEndpoint(this.MaxX, this.Position.x + this.Width, this.Position.y + this.Height + this.YLabelOffset / 3);
        }
        else {
            let step = 1;
            for (let i = this.MaxX; i >= this.MinX - 1; i -= step) {
                if (i % this.IntervalX == 0){
                    let p = this.CalculateRelativePosition({x: i, y: 0});
                    this.DrawXInteralEndpoint(i, p.x, this.Position.y + this.Height + this.YLabelOffset / 3);
                    step = this.IntervalX;
                }
            }
        }
        pop()
    }

    private DrawYIntervals(): void {
        push();

        strokeWeight(1)
        textSize(18);

        push();
        textAlign(RIGHT);
        text(round(this.MinY * 10) / 10, this.Position.x + this.XLabelOffset / 2, this.Position.y + this.Height);
        pop();

        push();
        textAlign(RIGHT, TOP);
        text(round(this.MaxY * 10) / 10, this.Position.x + this.XLabelOffset / 2, this.Position.y);
        pop();

        pop();
    }

    private DrawLabels(): void {
        push();
        stroke(Config.GraphBaseColor)
        strokeWeight(1)
        textSize(18);

        // X
        push();
        textAlign(CENTER);
        text(this.LabelX, this.Position.x + this.Width / 2, this.Position.y + this.Height + this.YLabelOffset);
        pop();

        // Y
        push();
        translate(this.Position.x + this.XLabelOffset, this.Position.y + this.Height / 2)
        textAlign(CENTER);
        rotate(radians(-90));
        text(this.LabelY, 0, 0);
        pop();

        // MAIN
        push();
        textSize(25);
        textAlign(CENTER);
        text(this.MainTitle, this.Position.x + this.Width / 2, this.Position.y - 40)
        pop();

        pop();
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