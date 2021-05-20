var NumberHelper = /** @class */ (function () {
    function NumberHelper() {
    }
    // Percentage should be an integer (0-100). Otherwise, chance will be compared to the rounded down value
    NumberHelper.RandomPercentage = function (percentage) {
        return random(100) <= percentage;
    };
    return NumberHelper;
}());
//# sourceMappingURL=NumberHelper.js.map