abstract class Trait {
    MutationChance: number = 10
    GetTraitName(): string {
        return this.constructor.name;
    }
    abstract Inherit(): Trait
    abstract Mutate(): void
    abstract Merge(trait : Trait): void
    static MergeTraits(traits : Trait[]) : Trait{
        let tempTrait : Trait = null;
        traits.forEach(t => {
            if (tempTrait == null){
                tempTrait = t.Inherit();
            }
            else{
                tempTrait.Merge(t.Inherit());
            }
        });

        return tempTrait;
    }
    abstract ApplyModifications(entity: Entity): void
}