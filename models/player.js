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
    node: Player(),
    moving: false,
    anim: null
};

playerModel.getPosition = function() {
    /// Gets the player's position in terms of coordinates on #grid
    /// getPosition : void -> { int, int }

    const rect = this.node.getBoundingClientRect();
    return gridModel.getCoordinates(rect.left, rect.top);
}

playerModel.isValidMove = function(targetX, targetY) {
    /// Determines if the target position (targetX, targetY) is a valid
    ///   place to go to, based on the player's current position.
    /// isValidMove : int int -> bool
    /// requires: maxX >= targetX >= 0, maxY >= targetY >= 0

    const playerPos = this.getPosition();
    const diffX = targetX - playerPos.x;
    const diffY = targetY - playerPos.y;
    if (Math.abs(diffX) == 1 && diffY == 0)
        return true;
    else if (diffX == 0 && Math.abs(diffY) == 1)
        return true;
    return false;
}


//////////////////////// Player Animations ////////////////////////

/// These animations are played by using SetInterval()

playerModel.playerMove = function(targetX, targetY, direcX, direcY) {

    this.moving = true;

    const movespeed = 10;
    const epsilon = 0.01

    /// Get the target position in absolute pixels.
    const offset = gridModel.node.getBoundingClientRect();
    const targetLeft = targetX * gridModel.tileLength + offset.left;
    const targetTop  = targetY * gridModel.tileLength + offset.top; 

    this.anim = window.setInterval(function() {
        const playerPos = playerModel.node.getBoundingClientRect();
        if (Math.abs(playerPos.left - targetLeft) >= epsilon)
        {
            playerModel.node.style.left = parseFloat(playerModel.node.style.left) + (movespeed * direcX) + "px";
        }
        else if (Math.abs(playerPos.top - targetTop) >= epsilon)
        {
            playerModel.node.style.top = parseFloat(playerModel.node.style.top) + (movespeed * direcY) + "px";
        }
        else 
        {
            playerModel.node.style.left = targetLeft;
            playerModel.node.style.top  = targetTop;

            playerModel.moving = false;
            window.clearInterval(playerModel.anim);
            playerModel.anim = null;
        }
    }, 50);
}