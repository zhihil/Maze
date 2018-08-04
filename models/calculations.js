function getMoveVector(endVector, startVector) {
    /// Calculates the difference vector between endVector and startVector.
    /// getMoveVector: [int, int] [int, int] -> [int, int]

    if (endVector.length != startVector.length)
        return Error("getMoveVector() was given two vectors of unmatching length.");
    var diffVector = new Array(endVector.length);
    for (var i = 0; i < endVector.length; ++i)
    {
        diffVector[i] = endVector[i] - startVector[i];
    }
    return diffVector;
}