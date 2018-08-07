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
    
    let $player = $(GameActor());
    $player.attr("id", "player")
        .css("top", "0px")
        .css("left", "0px")
        .css("z-index", "10")
        .appendTo("#grid");
    gridModel.addActor('P', 0, 0);
    return $player[0];
}

//////////////////////// Player Model ////////////////////////

let playerModel = {
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

playerModel.setPosition = function(coordX, coordY) {
    /// Sets the player's graphical position to the place corresponding
    ///   with the given (coordX, coordY).
    /// setPosition : int int -> void
    let offsetRect = gridModel.node.getBoundingClientRect();
    playerModel.node.style.left = 50 * coordX + "px";
    playerModel.node.style.top  = 50 * coordY + "px";

}

playerModel.isValidMove = function(targetX, targetY) {
    /// Determines if the target position (targetX, targetY) is a valid
    ///   place to go to, based on the player's current position.
    /// isValidMove : int int -> bool
    /// requires: gridModel.tilesPerSide > targetX, targetY >= 0

    if ((0 > targetX) || (targetX >= gridModel.tilesPerSide))
        throw Error("playerModel.isValidMove() received targetX out-of-range");
    if ((0 > targetY) || (targetY >= gridModel.tilesPerSide))
        throw Error("playerModel.isValidMove() received targetY out-of-range");

    if (gridModel.isOccupied(targetX, targetY)) return false;

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
    /// Animates the player's movement from their starting tile to a
    ///   selected tile (targetX, targetY), assuming the vector of 
    ///   their movement is (direcX, direcY)
    /// playerMove: int int int int -> void
    /// requires: 0 <= targetX, targetY < gridModel.tilesPerSide
    ///           -1 <= direcX, direcY <= 1
    ///           One of direcX, direcY is non-zero, one is zero.

    this.moving = true;

    const movespeed = 10;
    const epsilon = 0.01

    /// Get the target position in absolute pixels.
    const offset = gridModel.node.getBoundingClientRect();
    const targetLeft = targetX * gridModel.tileLength + offset.left;
    const targetTop  = targetY * gridModel.tileLength + offset.top; 

    /// Get the player's origin position
    const playerPos = playerModel.getPosition();

    this.anim = window.setInterval(function() {
        const playerRect = playerModel.node.getBoundingClientRect();
        if (Math.abs(playerRect.left - targetLeft) >= epsilon)
        {
            /// Player must be moving horizontally. 

            playerModel.node.style.left = parseFloat(playerModel.node.style.left) + (movespeed * direcX) + "px";
        }
        else if (Math.abs(playerRect.top - targetTop) >= epsilon)
        {
            /// Player must be moving vertically.

            playerModel.node.style.top = parseFloat(playerModel.node.style.top) + (movespeed * direcY) + "px";
        }
        else 
        {
            /// Player is at the target position, so we complete the animation.

            /// Make sure the player is in the proper position on the screen.
            playerModel.node.style.left = targetLeft;
            playerModel.node.style.top  = targetTop;

            /// Make sure the player is in the proper position programmatically. 
            gridModel.removeActor(playerPos.x, playerPos.y);
            const newPos = playerModel.getPosition();
            gridModel.addActor('P', newPos.x, newPos.y);

            /// Set relevant logic variables.
            playerModel.moving = false;
            window.clearInterval(playerModel.anim);
            playerModel.anim = null;
        }
    }, 50);
}