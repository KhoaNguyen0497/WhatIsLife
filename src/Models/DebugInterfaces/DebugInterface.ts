abstract class DebugInterface {

    abstract OffsetX: number;
    abstract OffsetY: number;
    abstract OffsetStepY: number;
    CurrentPosition : p5.Vector

    constructor(position : p5.Vector){
        this.CurrentPosition = position;
    }
    public AppendText(t : string): void {
        text(t, this.CurrentPosition.x + this.OffsetX, this.CurrentPosition.y + this.OffsetY);
        this.OffsetY += this.OffsetStepY;
    }
}