enum Status {
    Hungry,
    
}

let StatusConditions : Map<Status, (e: Entity) => boolean> = new Map<Status, (e: Entity) => boolean>();

StatusConditions.set(Status.Hungry, (e: Entity) => {
    return e.Hunger.Value <= e.Hunger.HungryThreshold
});