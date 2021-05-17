class ReproductiveFunction {
    Value: number = 0;
    MaxValue: number = 100;
    DrainRate: number = 50;
    Rate: number = 10;
    Entity: Entity;
    constructor(e: Entity) {
        this.Entity = e;
    }
    Update(): void {
        // for legal reasons, should only reproduce after 18
        if (this.Entity.Age > 18 && isNewDay) {
            this.Value += this.Rate
        }
    }

    Reset(): any {
        this.Value = -20;
        this.Entity.Partner = null;
    }
}