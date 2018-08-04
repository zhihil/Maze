/////////////////////////// Grid ///////////////////////////

/// Get grid component.
var grid = document.getElementById("grid");

/// Grid properties
let gridLength  = 1000;
let tileLength  = 50;


////////////////////// Debug Checkboard Pattern //////////////////////

function DebugTile(x, y, id)
{
    /// Constructor for a DOM Node representing a tile to 
    ///   visualize the coordinate system.

    var tile = $(MakeNode());
    tile.attr("id", id)
        .addClass("tile")
        .css("left", (50 * x) + "px")
        .css("top", (50 * y) + "px");
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


////////////////////// Debug Checkboard Pattern //////////////////////

function getCoordinates(posX, posY){
    /// Given the absolute position (posX, posY) in pixels, calculate the
    ///   the coordinates of the position relative to #grid's origin (top-left corner)
    /// getCoordinates: float float -> {int, int}
    /// requires: posX >= xGridOffset, posY >= yGridOffset

    let rect = grid.getBoundingClientRect();
    let xGridOffset = rect.left;
    let yGridOffset = rect.top;

    console.log("Offsets: { " + xGridOffset + ", " + yGridOffset + " }");

    return {
        x : Math.floor((posX - xGridOffset) / tileLength),
        y : Math.floor((posY - yGridOffset) / tileLength)
    }
}