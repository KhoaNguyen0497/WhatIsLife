class ArrayHelper {
    public static GroupBy<T, T2>(list: T[], keyGetter: (arg0: T) => T2): Map<T2, T[]> {
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

    public static Sum(list: number[]): number {
        const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
        return list.reduce(reducer);
    }
}