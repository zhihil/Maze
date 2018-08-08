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