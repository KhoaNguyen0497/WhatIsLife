/// <reference path="DebugInterface.ts" />

class EntityDebugInterface extends DebugInterface {
    OffsetX: number = -10
    OffsetY: number = -20;
    OffsetStepY: number = -20

    constructor(e : Entity){
        super(e.Position);
    }
}