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
    tilesPerSide : 10,
    node : document.getElementById("grid"),
};

/// The actorsGrid is used to track what elements are on the grid. 
/// List of possible values
///     'N' - 'Null'
///     'P' - 'Player'
///     'M' - 'Monster' or "Minotaur"
///     'W' - 'Wall'

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

gridModel.addActor = function(newActor, coordX, coordY) {
    /// Adds a newActor at (coordX, coordY) from the top-left square on the
    ///   board.
    /// addActor: DOMNode int int -> void
    
    if (typeof newActor != "undefined") {
        throw Error("Cannot add new actor since the tile (coordX, coordY) is occupied.");
    }
    gridModel.actorsGrid[coordX][coordY] = newActor;
}