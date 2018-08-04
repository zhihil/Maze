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
        player.style.left = parseFloat(player.style.left) + (50 * diff[0]) + "px";
        player.style.top  = parseFloat(player.style.top) + (50 * diff[1]) + "px";
    }
})
