//////////////////////////////////////////////////////////////////////
///
/// grid.js
///
/// Programmatically instantiates DOM nodes for the View mazemaster.html.
///
//////////////////////////////////////////////////////////////////////

/// Add the associated models.
let mazemasterModel = new MazemasterModel();

/// Create the checkboard pattern.
makeCheckerBoard();

/// Remove any existing tiles on the board.
mazemasterModel.resetActorsGrid();
