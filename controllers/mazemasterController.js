//////////////////////////////////////////////////////////////////////
///
/// mainController.js
///
/// Detects user input for mazemaster.html and passes it into the relevant
///   Models to handle the information.
///
//////////////////////////////////////////////////////////////////////

$("#grid").on("click", function(event) {
    let coord = gridModel.getCoordinates(event.clientX, event.clientY);
    mazemasterModel.paint(coord.x, coord.y);
})

$("#playerButton").on("click", function() {
    mazemasterModel.changePaintbrush("P");
})

$("#wallButton").on("click", function() {
    mazemasterModel.changePaintbrush("W");
})

$("#minotaurButton").on("click", function() {
    mazemasterModel.changePaintbrush("M");
})

$("#fleeceButton").on("click", function() {
    mazemasterModel.changePaintbrush("T");
})

$("#eraseButton").on("click", function() {
    mazemasterModel.changePaintbrush('N');
})

$("#saveButton").on("click", function() {
    localStorage["mazeSavedCustomMap"] = JSON.stringify(gridModel.actorsGrid);
})

$("#loadButton").on("click", function() {
    gridModel.readMazeLayout(JSON.parse(localStorage["mazeSavedCustomMap"]));
})