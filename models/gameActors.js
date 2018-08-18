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
    
    constructor(name, health) {
        this.name   = name;
        this.node   = document.createElement("div");
        this.moving = false;
        this.anim   = null;
        this.health = health;

        $(this.node).attr("class", "tile");
    }


    ////////////////////////// Methods //////////////////////////

    getPosition(referenceGrid) {
        /// Gets the GameActor's position in terms of coordinates on #grid
        /// getPosition : void -> { int, int }

        const rect = this.node.getBoundingClientRect();
        return referenceGrid.getCoordinates(rect.left, rect.top);
    }

    setPosition(coordX, coordY) {
        /// Sets the GameActor's graphical position to the place corresponding
        ///   with the given (coordX, coordY).
        /// setPosition : int int -> void
        /// requires: node has been attached to some kind of #grid object.

        this.node.style.left = 50 * coordX + "px";
        this.node.style.top  = 50 * coordY + "px";
    }

    isAlive() {
        /// Determines if the GameActor is alive or not.
        /// isAlive: void -> bool
        
        return this.health > 0;
    }

    takeDamage(damage) {
        /// Reduces the GameActor's healtb by the specified damage.
        /// takeDamage : int -> void

        this.health -= damage;
    }

    takeHealing(amount) {
        /// Increases the GameActor's health by the specified amount
        /// takeHealing : int -> void

        this.health += amount;
    }
}