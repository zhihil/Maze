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
    node : document.getElementById("grid")
};

////////////////////// Support Functions//////////////////////

gridModel.getCoordinates = function(posX, posY){
    /// Given the absolute position (posX, posY) in pixels, calculate the
    ///   the coordinates of the position relative to #grid's origin (top-left corner)
    /// getCoordinates: float float -> {int, int}
    /// requires: posX >= xGridOffset, posY >= yGridOffset

    if (this.node == undefined) this.node = document.getElementById("grid");
    
    let rect = this.node.getBoundingClientRect();
    let xGridOffset = rect.left;
    let yGridOffset = rect.top;

    return {
        x : Math.floor((posX - xGridOffset) / this.tileLength),
        y : Math.floor((posY - yGridOffset) / this.tileLength)
    }
}