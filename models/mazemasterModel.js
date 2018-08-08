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
    paintbrushTile: 'N'
};

mazemasterModel.changePaintbrush = function(newTile) {
    /// Sets the value of mazemasterModel.paintbrushTile
    /// changePaintbrush: tileCode -> void
    /// time: O(1)
    /// effects: modifies mazemasterModel.paintbrushTile.

    if (!gridModel.isValidTileCode(newTile))
        throw new TypeError("mazemasterModel.changePaintbrush was not given a valid tileCode.");

    this.paintbrushTile = newTile;
}