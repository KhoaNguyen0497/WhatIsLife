enum Status {
    Hungry,
    UrgeToReproduce
}

let StatusConditions : Map<Status, (e: Entity) => boolean> = new Map<Status, (e: Entity) => boolean>();

StatusConditions.set(Status.Hungry, (e: Entity) => {
    return false;
    return e.Hunger.Value <= e.Hunger.HungryThreshold
});

StatusConditions.set(Status.UrgeToReproduce, (e: Entity) => {
    // Recently reproduced
    if (e.ReproducetiveNeed.Value < 0 ){
        return false;
    }
    // Update once a day only and have a higher chance of having an urge to reproduce the longer the entity goes without reproducing
    if (isNewDay && !e.Statuses.includes(Status.UrgeToReproduce)){
        return NumberHelper.RandomPercentage(e.ReproducetiveNeed.Value);
    }

    return e.Statuses.includes(Status.UrgeToReproduce);
});