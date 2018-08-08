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
    alert(coord.x + " " + coord.y);
})

$("#playerButton").on("click", function() {
    mazemasterModel.changePaintbrush("P");
    alert(mazemasterModel.paintbrushTile);
})

$("#wallButton").on("click", function() {
    mazemasterModel.changePaintbrush("W");
    alert(mazemasterModel.paintbrushTile);
})

$("#minotaurButton").on("click", function() {
    mazemasterModel.changePaintbrush("M");
    alert(mazemasterModel.paintbrushTile);
})

$("#fleeceButton").on("click", function() {
    mazemasterModel.changePaintbrush("T");
    alert(mazemasterModel.paintbrushTile);
})