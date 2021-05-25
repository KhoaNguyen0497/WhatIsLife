/// <reference path="Trait.ts" />

class SpeedMod extends Trait {
    BaseValue: number = 0;
    MutationRange: number = 1; // Modify the BaseValue by this +- value

    Inherit(): Trait {
        let inheritedTrait = new SpeedMod();
        inheritedTrait.BaseValue = this.BaseValue / 2;
        return inheritedTrait;
    }
    Mutate(): void {
        if (NumberHelper.RandomPercentage(this.MutationChance)) {
            this.BaseValue += random(-this.MutationRange, this.MutationRange);
        }
    }
    ApplyModifications(entity: Entity): void {
        entity.Speed += this.BaseValue;

        // Speed should not go below 1
        entity.Speed = max(entity.Speed, 1);
    }

    Merge(trait: SpeedMod): void {
        this.BaseValue += trait.BaseValue;
    }
}