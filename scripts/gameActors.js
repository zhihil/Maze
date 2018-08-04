function MakeNode()
{
    /// Constructor for a DOM Node representing a generic tile on the board.

    var newNode = document.createElement("div");
    grid.appendChild(newNode);
    return newNode;
}

function Player()
{
    /// Constructor for a DOM Node representing the player.
    
    var player = $(MakeNode());
    player.attr("id", "player")
        .addClass("tile")
        .css("top", "0px")
        .css("left", "0px");
    return player[0];
}

function debugTile(x, y, id)
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