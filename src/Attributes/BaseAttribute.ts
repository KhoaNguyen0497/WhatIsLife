abstract class BaseAttribute {
    Entity: Entity;
    constructor(e: Entity) { 
        this.Entity = e;
    };
    abstract Update(): void
}