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

    getPosition() {
        /// Gets the GameActor's position in terms of coordinates on #grid
        /// getPosition : void -> { int, int }

        const rect = this.node.getBoundingClientRect();
        return gridModel.getCoordinates(rect.left, rect.top);
    }

    setPosition(coordX, coordY) {
        /// Sets the GameActor's graphical position to the place corresponding
        ///   with the given (coordX, coordY).
        /// setPosition : int int -> void
        let offsetRect = gridModel.node.getBoundingClientRect();
        this.node.style.left = 50 * coordX + "px";
        this.node.style.top  = 50 * coordY + "px";
    }


    ////////////////////////// Animations //////////////////////////

    playerMove(targetX, targetY, direcX, direcY) {
        /// Animates the GameActor's movement from their starting tile to a
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
        const actorPos = this.getPosition();
        
        /// Define the function that performs the animation logic. 
        let animationFunc = function() {
            const actorRect = this.node.getBoundingClientRect();
            if (Math.abs(actorRect.left - targetLeft) >= epsilon)
            {
                /// Player must be moving horizontally. 

                this.node.style.left = parseFloat(this.node.style.left) + (movespeed * direcX) + "px";
            }
            else if (Math.abs(actorRect.top - targetTop) >= epsilon)
            {
                /// Player must be moving vertically.

                this.node.style.top = parseFloat(this.node.style.top) + (movespeed * direcY) + "px";
            }
            else 
            {
                /// Player is at the target position, so we complete the animation.

                /// Make sure the player is in the proper position on the screen.
                this.node.style.left = targetLeft;
                this.node.style.top  = targetTop;

                /// Make sure the player is in the proper position programmatically. 
                gridModel.removeActor(playerPos.x, playerPos.y);
                const newPos = this.getPosition();
                gridModel.addActor('P', newPos.x, newPos.y);

                /// Make sure the player's DOM Node reference in gridModel.canvas is correct.
                gridModel.removeNodeReference(actorPos.x, actorPos.y);
                gridModel.addNodeReference(this.node, newPos.x, newPos.y);

                /// Set relevant logic variables.
                this.moving = false;
                window.clearInterval(this.anim);
                this.anim = null;
            }
        }

        /// Execute animation, binding this as the current GameActor model.
        this.anim = window.setInterval(animationFunc.bind(this), 50);
    }
}