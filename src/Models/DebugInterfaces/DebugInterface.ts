abstract class DebugInterface {

    abstract OffsetX: number;
    abstract OffsetY: number;
    abstract OffsetStepY: number;
    abstract OffsetStepX: number;
    CurrentPosition: p5.Vector

    constructor(position: p5.Vector) {
        this.CurrentPosition = position;
    }

    private AdjustLocation(element?: p5.Element) {
        if (element)
        {
            element.position(this.CurrentPosition.x + this.OffsetX, this.CurrentPosition.y + this.OffsetY);
        }

        this.OffsetY += this.OffsetStepY;
        this.OffsetX += this.OffsetStepX;      
    }


    public AppendText(t: string): void {
        text(t, this.CurrentPosition.x + this.OffsetX, this.CurrentPosition.y + this.OffsetY);
        this.AdjustLocation();
    }

    public AppendSlider(min: number, max: number, value: number, step: number, width: number): p5.Element {
        let slider = createSlider(min, max, value, step);
        slider.style("width", width + "px");
        this.AdjustLocation(slider);
        return slider;
    }

    public AppendDiv(t?: string): p5.Element {
        let div = createDiv();
        this.AdjustLocation(div);
        return div;
    }

    public AppendCheckBox(t: string, ticked: boolean): p5.Element{
        let checkbox = createCheckbox(" " + t,ticked); // add a space so the text doesnt stay too close to the text box
        this.AdjustLocation(checkbox);
        return checkbox;
    }
}