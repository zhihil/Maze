//////////////////////////////////////////////////////////////////////
///
/// mainController.js
///
/// Stores data and manages the logic of the MazeNaster maze-creation
///     tool.
///
//////////////////////////////////////////////////////////////////////

//////////////////////// MazeMaster Model ////////////////////////

let mazemasterModel = {
    paintbrushTile: 'W',
    palette: {}
};

/// Generate a dictionary that counts the number of each tile that has been
///     drawn on the screen.
mazemasterModel.tileCount = {};

/// Use a for loop to iterate through both lowercase and uppercase alphabet to
///     add valid tileCode. This approach is less efficient but is more robust
///     because you don't need to manually add new entries.
for (let c = 0; c < 26; ++c)
{
    if (gridModel.isValidTileCode(String.fromCharCode(97 + c)))
    {
        mazemasterModel.tileCount[String.fromCharCode(97 + c)] = 0;
    }
    if (gridModel.isValidTileCode(String.fromCharCode(65 + c)))
    {
        mazemasterModel.tileCount[String.fromCharCode(65 + c)] = 0;
    }
}

/// Generate a 2D array of references to DOM nodes, which will be used
///     by the Erase paintbrush option to delete DOM nodes on the screen.
mazemasterModel.canvas = new Array(gridModel.tilesPerSide);
for (let y = 0; y < gridModel.tilesPerSide; ++y)
{
    mazemasterModel.canvas[y] = new Array(gridModel.tilesPerSide);
    for (let x = 0; x < gridModel.tilesPerSide; ++x)
    {
        mazemasterModel.canvas[y][x] = null;
    }
}

mazemasterModel.palette['P'] = function(coordX, coordY) {
    /// Adds a Player to gridModel.actorsGrid and attaches its DOM Node
    ///     to grid. Assumes that playerModel.node == Player() already exists.
    /// anon: int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide

    if (mazemasterModel.tileCount['P'] === 0 && mazemasterModel.canvas[coordY][coordX] === null)
    {
        gridModel.addActor('P', coordX, coordY);
        $(playerModel.node).css("left", (50 * coordX) + "px")
                           .css("top", (50 * coordY) + "px")
                           .css("z-index", 10)
                           .appendTo("#grid");
        mazemasterModel.canvas[coordY][coordX] = playerModel.node;
        mazemasterModel.tileCount[mazemasterModel.paintbrushTile] += 1;
    }
}

mazemasterModel.palette['W'] = function(coordX, coordY) {
    /// Adds a Wall to gridModel.actorsGrid and attaches its DOM Node
    ///     to grid. Assumes that playerModel.node == Player() already
    ///     exists.
    /// anon : int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide

    if (mazemasterModel.canvas[coordY][coordX] === null)
    {
        gridModel.addActor('W', coordX, coordY);
        let newWall = new Wall(coordX, coordY);
        gridModel.addNode(newWall.node, coordX, coordY);
        mazemasterModel.canvas[coordY][coordX] = newWall.node;
        mazemasterModel.tileCount[mazemasterModel.paintbrushTile] += 1;
    }
}

mazemasterModel.palette['N'] = function(coordX, coordY) {
    if (mazemasterModel.canvas[coordY][coordX] !== null)
    {
        $(mazemasterModel.canvas[coordY][coordX]).remove();
        mazemasterModel.tileCount[gridModel.getActor(coordX, coordY)] -= 1;
        mazemasterModel.canvas[coordY][coordX] = null;
        gridModel.removeActor(coordX, coordY);
    }
}

mazemasterModel.changePaintbrush = function(newTile) {
    /// Sets the value of mazemasterModel.paintbrushTile
    /// changePaintbrush: tileCode -> void
    /// time: O(1)
    /// effects: modifies mazemasterModel.paintbrushTile.

    if (!gridModel.isValidTileCode(newTile))
        throw new TypeError("mazemasterModel.changePaintbrush was not given a valid tileCode.");

    this.paintbrushTile = newTile;
}

mazemasterModel.paint = function(coordX, coordY) {
    /// Modifies the gridModel.actorsGrid and places a new DOM Node
    ///   at the coordinates specified at (coordX, coordY)
    /// paint: int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide

    this.palette[this.paintbrushTile](coordX, coordY);
}