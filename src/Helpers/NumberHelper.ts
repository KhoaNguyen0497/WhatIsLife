class NumberHelper
{
    // Percentage should be an integer (0-100). Otherwise, chance will be compared to the rounded down value
    public static RandomPercentage(percentage : number) : boolean
    {
        return random(100) <= percentage;
    }

    
public static groupBy<T, T2>(list: T[], keyGetter: (arg0: T) => T2) : Map<T2,T[]> {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
}