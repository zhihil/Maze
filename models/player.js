//////////////////////////////////////////////////////////////////////
///
/// player.js
///
/// Manages the data and logic of a Player tile.
///
//////////////////////////////////////////////////////////////////////

class PlayerModel extends GameActor {
    ////////////////////////// Constructor //////////////////////////

    constructor(name) {
        super(name);

        $(this.node).attr("id", "player")
                    .css("z-index", "10");
    }


    /////////////////////////// Methods //////////////////////////

    isValidMove(targetX, targetY) {
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
}

