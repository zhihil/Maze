//////////////////////////////////////////////////////////////////////
///
/// player.js
///
/// Provides a model for the player tile.
///
//////////////////////////////////////////////////////////////////////

//////////////////////// Player DOM ////////////////////////

function Player()
{
    /// Constructor for a DOM Node representing the player.
    
    var player = $(GameActor());
    player.attr("id", "player")
        .css("top", "0px")
        .css("left", "0px")
        .css("z-index", "10");
    player.appendTo("#grid");
    return player[0];
}

//////////////////////// Player Model ////////////////////////

var playerModel = {
    name: "Theseus",
    node: Player()
};

playerModel.getPosition = function() {
    /// Gets the player's position in terms of coordinates on #grid
    /// getPosition : void -> { int, int }

    var rect = this.node.getBoundingClientRect();
    return gridModel.getCoordinates(rect.left, rect.top);
}

playerModel.isValidMove = function(targetX, targetY) {
    /// Determines if the target position (targetX, targetY) is a valid
    ///   place to go to, based on the player's current position.
    /// isValidMove : int int -> bool
    /// requires: maxX >= targetX >= 0, maxY >= targetY >= 0

    var playerPos = this.getPosition();
    var diffX = targetX - playerPos.x;
    var diffY = targetY - playerPos.y;
    if (Math.abs(diffX) == 1 && diffY == 0)
        return true;
    else if (diffX == 0 && Math.abs(diffY) == 1)
        return true;
    return false;
}
