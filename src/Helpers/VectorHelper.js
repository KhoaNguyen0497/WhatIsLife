var VectorHelper = /** @class */ (function () {
    function VectorHelper() {
    }
    VectorHelper.ConstrainPosition = function (position) {
        position.x = constrain(position.x, 0, width);
        position.y = constrain(position.y, 0, height);
    };
    VectorHelper.Distance = function (v1, v2) {
        return dist(v1.x, v1.y, v2.x, v2.y);
    };
    return VectorHelper;
}());
//# sourceMappingURL=VectorHelper.js.map