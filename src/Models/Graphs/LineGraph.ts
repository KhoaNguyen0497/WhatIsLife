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
    LineColor: p5.Color = color("#F8C630");
    AverageLineColor :p5.Color = color("#3E92CC");
    DataMaxSize: number;

    private YLabelOffset: number = -75;
    private XLabelOffset: number = 75;

    constructor(p: p5.Vector, title: string, labelX: string, labelY: string, intervalX: number, dataMaxSize: number = Config.DataMaxSize) {
        super(p);
        this.LabelX = labelX;
        this.LabelY = labelY;
        this.MainTitle = title;
        this.IntervalX = intervalX;
        this.DataMaxSize = dataMaxSize;
    }

    Update(point: Point) {
        this.Data.push(point);
        this.TrimData();
    }

    Draw(): void {
        this.GetExtrema();
        let p1, p2, pAverage: Point;
        push();
        strokeWeight(1)
        stroke(this.LineColor)
        let average = this.Data[this.Data.length - 1].y;
        for (let i = 0; i < this.Data.length - 1; i++) {
            p1 = this.CalculateRelativePosition(this.Data[i]);
            p2 = this.CalculateRelativePosition(this.Data[i + 1]);
            average += this.Data[i].y;
            // +-1 pixel to x and y so the line doesnt sit directly on the axes
            line(p1.x + 1, p1.y - 1, p2.x + 1, p2.y - 1);
        }
        average = average / this.Data.length;
        stroke(this.AverageLineColor)
        pAverage = this.CalculateRelativePosition({ x: 0, y: average });
        line(this.Position.x, pAverage.y, this.Position.x + this.Width, pAverage.y)
        stroke(color('black'))
        strokeWeight(1)
        textSize(18);
        textAlign(RIGHT);
        text(round(average * 10) / 10, this.Position.x + this.YLabelOffset / 4, pAverage.y);
        pop()
        // Draw these last so they are always on top
        this.DrawAxes();
        this.DrawLabels();
        this.DrawYIntervals();
        this.DrawXIntervals();
    }

    private TrimData(): void {
        while (this.Data.length > this.DataMaxSize) {
            this.Data.shift();
        }
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
        let yPos = this.Position.y + this.Height + this.XLabelOffset / 3;
        if (this.MaxX - this.MinX < this.IntervalX) {
            this.DrawXInteralEndpoint(this.MinX, this.Position.x, yPos);
            this.DrawXInteralEndpoint(this.MaxX, this.Position.x + this.Width, yPos);
        }
        else {
            let step = 1;
            for (let i = this.MaxX; i >= this.MinX - 1; i -= step) {
                if (i % this.IntervalX == 0) {
                    let p = this.CalculateRelativePosition({ x: i, y: 0 });
                    this.DrawXInteralEndpoint(i, p.x, yPos);
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
        text(round(this.MinY * 10) / 10, this.Position.x + this.YLabelOffset / 4, this.Position.y + this.Height);
        pop();

        push();
        textAlign(RIGHT, TOP);
        text(round(this.MaxY * 10) / 10, this.Position.x + this.YLabelOffset / 4, this.Position.y);
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
        text(this.LabelX, this.Position.x + this.Width / 2, this.Position.y + this.Height + this.XLabelOffset);
        pop();

        // Y
        push();
        translate(this.Position.x + this.YLabelOffset, this.Position.y + this.Height / 2)
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