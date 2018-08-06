//////////////////////////////////////////////////////////////////////
///
/// grid.js
///
/// Provides a model for the game grid.
///
//////////////////////////////////////////////////////////////////////

/////////////////////////// Grid ///////////////////////////

var gridModel = {
    gridLength : 1000,
    tileLength : 50,
    node : document.getElementById("grid"),
};
gridModel.tilesPerSide = gridModel.gridLength / gridModel.tileLength;

/// The actorsGrid is used to track what elements are on the grid. 
/// The elements of actorsGrid are of type "tileCode"

/// List of possible values for "tileCodes" is found in gridModel.isValidTileCode()

gridModel.actorsGrid = new Array(this.tilesPerSide);
for (let i = 0; i < gridModel.tilesPerSide; ++i)
{
    gridModel.actorsGrid[i] = new Array(this.tilesPerSide);
    for (let j = 0; j < gridModel.tilesPerSide; ++j)
    {
        gridModel.actorsGrid[i][j] = 'N';
    }
}

////////////////////// Support Functions//////////////////////

gridModel.getCoordinates = function(posX, posY){
    /// Given the absolute position (posX, posY) in pixels, calculate the
    ///   the coordinates of the position relative to #grid's origin (top-left corner)
    /// getCoordinates: float float -> {int, int}
    /// requires: posX >= xGridOffset, posY >= yGridOffset

    if (this.node == undefined) this.node = document.getElementById("grid");

    const rect = this.node.getBoundingClientRect();
    const xGridOffset = rect.left;
    const yGridOffset = rect.top;

    return {
        x : Math.floor((posX - xGridOffset) / this.tileLength),
        y : Math.floor((posY - yGridOffset) / this.tileLength)
    };
}

gridModel.addActor = function(tileCode, coordX, coordY) {
    /// Adds a newActor at (coordX, coordY), where (0, 0) is the top-left square on
    ///   the board and the positive axis go downward and rightward.
    /// addActor: tileCode (gridModel.isValidTileCode) int int -> void
    /// requires: 0 <= coordX, coordY < maxNumTiles
    
    if (!gridModel.isValidTileCode(tileCode))
        throw Error("gridModel.removeActor() was given an invalid tileCode");
    if (0 > coordX)
        throw Error("gridModel.removeActor() was given a negative x-coordinate");
    if (coordX >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range x-coordinate");
    if (0 > coordY)
        throw Error("gridModel.removeActor() was given a negative y-coordinate");
    if (coordY >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range y-coordinate");

    gridModel.actorsGrid[coordY][coordX] = tileCode;
}

gridModel.isValidTileCode = function(code) {
    /// Determines if the given code is an example of a tileCode. A valid tileCode is
    ///   one of:
    ///     - 'N' - Null
    ///     - 'P' - Player
    ///     - 'M' - Monster or Minotaur
    ///     - 'W' - Wall

    return code === 'N' || code === 'P' || code === 'M' || code === 'W';
}

gridModel.removeActor = function(coordX, coordY) {
    /// Removes newActor at (coordX, coordY), where (0, 0) is the top-left square on
    ///   the board and the positive axis go downward and rightward.
    /// removeActor: int int -> void
    /// requires: 0 <= coordX, coordY < maxNumTiles

    if (0 > coordX)
        throw Error("gridModel.removeActor() was given a negative x-coordinate");
    if (coordX >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range x-coordinate");
    if (0 > coordY)
        throw Error("gridModel.removeActor() was given a negative y-coordinate");
    if (coordY >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range y-coordinate");

    gridModel.actorsGrid[coordY][coordX] = 'N';
}

gridModel.isOccupied = function(x, y) {
    /// Determines if the chosen tile (x, y) on the grid is occupied or not.
    return gridModel.actorsGrid[y][x] != 'N';
}