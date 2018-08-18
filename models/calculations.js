//////////////////////////////////////////////////////////////////////
///
/// calculations.js
/// General library of functions that do not belong to any particular
///   script. These tend to be functions used for calculations such as
///   getDiffVector() which calculates the difference between a start
///   and an end vector.
///
//////////////////////////////////////////////////////////////////////

let epsilon = 0.0000001;

function getDiffVector(endVector, startVector) {
    /// Calculates the difference vector between endVector and startVector.
    /// getMoveVector: [int, int] [int, int] -> [int, int]

    if (endVector.length != startVector.length)
        return Error("getMoveVector() was given two vectors of unmatching length.");

    let diffVector = new Array(endVector.length);
    for (let i = 0; i < endVector.length; ++i)
    {
        diffVector[i] = endVector[i] - startVector[i];
    }
    
    return diffVector;
}
