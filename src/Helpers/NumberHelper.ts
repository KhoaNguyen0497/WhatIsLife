class NumberHelper
{
    // Percentage should be an integer (0-100). Otherwise, chance will be compared to the rounded down value
    public static RandomPercentage(percentage : number) : boolean
    {
        return random(100) <= percentage;
    }
}