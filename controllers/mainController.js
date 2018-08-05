//////////////////////////////////////////////////////////////////////
///
/// mainController.js
///
/// Detects user input for main.html and passes it into the relevant
///   Models to handle the information.
///
//////////////////////////////////////////////////////////////////////

///////////////// PLAYER MOVEMENT /////////////////

$("#grid").on("click", function(event) {
    var target    = gridModel.getCoordinates(event.clientX, event.clientY);
    var playerPos = playerModel.getPosition();
    if (playerModel.isValidMove(target.x, target.y))
    {
        var diff = getDiffVector([target.x, target.y], [playerPos.x, playerPos.y]);
        playerModel.playerMove(target.x, target.y, diff[0], diff[1]);
    }
})
