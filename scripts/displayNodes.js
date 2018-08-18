//////////////////////////////////////////////////////////////////////
///
/// displayNodes.js
/// Library of functions that do not belong to any particular
///   script. These functions are used to display objects onto the screen.
///
//////////////////////////////////////////////////////////////////////

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