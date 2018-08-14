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
    const target = gridModel.getCoordinates(event.clientX, event.clientY);
    let playerModel = gridModel.player;
    if (!playerModel.moving && playerModel.isValidMove(target.x, target.y))
    {
        const playerPos = playerModel.getPosition();
        const diff = getDiffVector([target.x, target.y], [playerPos.x, playerPos.y]);
        playerModel.playerMove(target.x, target.y, diff[0], diff[1]);
    }
});

$("#loadButton").on("click", function() {
    gridModel.readMazeLayout(JSON.parse(localStorage["mazeSavedCustomMap"]));
});