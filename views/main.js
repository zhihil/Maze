//////////////////////////////////////////////////////////////////////
///
/// main.js
///
/// Programmatically instantiates objects to the View main.html.
///
//////////////////////////////////////////////////////////////////////

function DebugTile(x, y, id)
{
    /// Constructor for a DOM Node representing a tile to 
    ///   visualize the coordinate system.

    var tile = $(GameActor());
    tile.attr("id", id)
        .css("left", (50 * x) + "px")
        .css("top", (50 * y) + "px");
    tile.appendTo("#grid");
    return tile[0];
}

for (var x = 0; x < 1000 / 50; ++x)
{
    for (var y = 0; y < 1000 / 50; ++y)
    {
        var id = "debugTileA";
        if ((x + y) % 2 == 0) id = "debugTileB";
        DebugTile(x, y, id);
    }
}

var layout =
[
['W','W','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','P','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','N','W','N','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','N','W','N','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','N','N','N','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','W','W','N','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','N','N','N','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','N','W','W','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','W','W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['W','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N'],
['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','W']
]

gridModel.readMazeLayout(layout);