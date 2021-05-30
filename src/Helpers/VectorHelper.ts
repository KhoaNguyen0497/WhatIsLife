class VectorHelper {
    public static ConstrainPosition(position: p5.Vector) {
        position.x = constrain(position.x, 0, width);
        position.y = constrain(position.y, 0, height);
    }

    public static WithinDistance(p1: p5.Vector, p2: p5.Vector, d: number) {
        return pow(p2.x - p1.x, 2) + pow(p2.y - p1.y, 2) <= pow(d, 2);
    }
}