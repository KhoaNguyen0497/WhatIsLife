/// <reference path="Status.ts" />


let StatusConditions : Map<Status, (e: Entity) => boolean> = new Map<Status, (e: Entity) => boolean>();
// Statuses are checked every frame
StatusConditions.set(Status.Hungry, (e: Entity) => {
    return e.Hunger.Value <= e.Hunger.HungryThreshold
});

StatusConditions.set(Status.UrgeToReproduce, (e: Entity) => {
    // Recently reproduced
    if (e.ReproductiveFunction.Value < 0 ){
        return false;
    }
    // Update once a day only and have a higher chance of having an urge to reproduce the longer the entity goes without reproducing
    if (isNewDay && !e.Statuses.includes(Status.UrgeToReproduce)){
        return NumberHelper.RandomPercentage(e.ReproductiveFunction.Value);
    }

    return e.Statuses.includes(Status.UrgeToReproduce);
});

StatusConditions.set(Status.Death, (e: Entity) => {
    if (Config.DisableDeath){
        return false;
    }
    if (isNewDay){
        // 50% chance to die every day if its critical
        if (e.Hunger.Value < e.Hunger.CriticalThreshold){
            if (NumberHelper.RandomPercentage(50)){
                return true;
            }
        }

        // {Age - 60}% chance to die every day after turning 60
        if (e.Age >= 60){
            if (NumberHelper.RandomPercentage(e.Age - 60)){
                return true;
            }
        }
    }

    return false;
});