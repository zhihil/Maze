//////////////////////////////////////////////////////////////////////
///
/// gameActors.js
///
/// Defines the GameActor object, which is a parent class for all
///     game pieces in Maze.
///
//////////////////////////////////////////////////////////////////////

class GameActor {
    ////////////////////////// Constructor //////////////////////////
    
    constructor(name) {
        this.name   = name;
        this.node   = document.createElement("div");
        this.moving = false;
        this.anim   = null;

        $(this.node).attr("class", "tile");
    }


    ////////////////////////// Methods //////////////////////////

    getPosition(referenceGrid) {
        /// Gets the GameActor's position in terms of coordinates on #grid
        /// getPosition : void -> { int, int }

        const rect = this.node.getBoundingClientRect();
        return getCoordinates.call(referenceGrid, rect.left, rect.top);
    }

    setPosition(coordX, coordY) {
        /// Sets the GameActor's graphical position to the place corresponding
        ///   with the given (coordX, coordY).
        /// setPosition : int int -> void
        /// requires: node has been attached to some kind of #grid object.

        this.node.style.left = 50 * coordX + "px";
        this.node.style.top  = 50 * coordY + "px";
    }
}