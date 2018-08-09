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
    playerTiles: 0,
    monsterTiles: 0,
    wallTiles: 0,
    paintbrushTile: 'N',
    palette: {}
};

mazemasterModel.palette['P'] = function(coordX, coordY) {
    /// Adds a Player to gridModel.actorsGrid and attaches its DOM Node
    ///     to grid. Assumes that playerModel.node == Player() already exists.
    /// anon: int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide

    if (mazemasterModel.playerTiles == 0)
    {
        gridModel.addActor('P', coordX, coordY);
        $(playerModel.node).css("left", (50 * coordX) + "px")
                           .css("top", (50 * coordY) + "px")
                           .css("z-index", 10)
                           .appendTo("#grid");
        ++mazemasterModel.playerTiles;
    }
}

mazemasterModel.palette['W'] = function(coordX, coordY) {
    /// Adds a Wall to gridModel.actorsGrid and attaches its DOM Node
    ///     to grid. Assumes that playerModel.node == Player() already
    ///     exists.
    /// anon : int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide

    gridModel.addActor('W', coordX, coordY);
    Wall(coordX, coordY);
    ++mazemasterModel.wallTiles;
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