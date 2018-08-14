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

function debugTile(x, y, id)
{
    /// Constructor for a DOM Node representing a tile to 
    ///   visualize the coordinate system.

    var tile = $(document.createElement("div"));
    tile.attr("class", "tile")
        .attr("id", id)
        .css("left", (50 * x) + "px")
        .css("top", (50 * y) + "px");
    tile.appendTo("#grid");
    return tile[0];
}

function makeCheckerBoard()
{
    for (var x = 0; x < 1000 / 50; ++x)
    {
        for (var y = 0; y < 1000 / 50; ++y)
        {
            var id = "debugTileA";
            if ((x + y) % 2 == 0) id = "debugTileB";
            debugTile(x, y, id);
        }
    }
}