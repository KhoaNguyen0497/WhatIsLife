/// <reference path="DebugInterface.ts" />

class SidebarInterface extends DebugInterface {
    OffsetX: number = 20;
    OffsetY: number = 10;
    OffsetStepY: number = 40
    OffsetStepX: number = 0;

    constructor(position: p5.Vector) {
        super(position);
    }
}