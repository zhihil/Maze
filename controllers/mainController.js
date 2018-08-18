//////////////////////////////////////////////////////////////////////
///
/// mainController.js
///
/// Detects user input for main.html and passes it into the relevant
///   Models to handle the information.
///
//////////////////////////////////////////////////////////////////////

///////////////// SETTING UP THE MODELS /////////////////

let gridModel = new GridModel();
gridModel.node = $("#grid")[0];


///////////////// DISPLAYING ELEMENTS /////////////////

function readMazeLayout(layout) {
    /// Fills the gridModel's actorsGrid with the elements specified in
    ///   layout.
    /// readMazeLayout: Arrayof(tileCode) -> void
    /// requires: layout is a square grid with length gridModel.tilesPerSide
    /// time: O(N^2) : N = gridModel.tilesPerSide
    /// effects: modifies gridModel.actorsGrid

    for (let y = 0; y < layout.length; ++y) {
        for (let x = 0; x < layout.length; ++x) {
            gridModel.addActor(layout[y][x], x, y);
            
            if (gridModel.getActor(x, y) == 'N') {
                gridModel.removeNodeReference(x, y);

            }
            else if (gridModel.getActor(x, y) == 'P') {
                gridModel.player = new PlayerModel("Theseus");
                gridModel.addNodeReference(gridModel.player.node, x, y);

            } else if (gridModel.getActor(x, y) == 'W') {
                let wall = new Wall(x, y);
                gridModel.addNodeReference(wall.node, x, y);

            } else if (gridModel.getActor(x, y) == 'M') {
                gridModel.monster = new MinotaurModel("Moo-moo");
                gridModel.addNodeReference(gridModel.monster.node, x, y);

            }
        }
    }
}

function displayNode(newNode, coordX, coordY) {
    /// Adds the given DOM Node to (coordX, coordY) of canvas..
    /// detachNode: DOMNode int int -> void
    /// requires: 0 <= coordX, coordY < this.tilesPerSide
    ///           newNode != null, undefined
    /// time: O(1)
    /// effects: modifies this.canvas
    ///          modifies main.html.

    $(newNode).css("top", 50 * coordY + "px")
              .css("left", 50 * coordX + "px")
              .appendTo("#grid");
}

function displayGrid() {
    /// Displays all DOM Nodes in the grid.
    /// displayGrid: void -> void

    for (let y = 0; y < gridModel.tilesPerSide; ++y)
    {
        for (let x = 0; x < gridModel.tilesPerSide; ++x)
        {
            if (gridModel.getNodeReference(x, y) !== null)
            {
                displayNode(gridModel.getNodeReference(x, y), x, y);
            }
        }
    }
}

function clearGrid() {
    /// Undisplays all DOM nodes in the grid.
    /// clearGrid: void -> void

    for (let y = 0; y < gridModel.tilesPerSide; ++y)
    {
        for (let x = 0; x < gridModel.tilesPerSide; ++x) 
        {
            if (gridModel.getNodeReference(x, y) !== null)
            {
                $(gridModel.getNodeReference(x, y)).remove();
            }
        }
    }
}

/// Create the checkboard pattern.
makeCheckerBoard();

/// The default map
var layout =
[
["N", "N", "N", "N", "N", "N", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
["N", "N", "N", "N", "N", "N", "W", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "W"],
["N", "N", "N", "N", "N", "N", "W", "N", "N", "N", "N", "N", "N", "N", "N", "N", "W", "W", "W", "W"],
["N", "W", "W", "W", "W", "W", "W", "W", "W", "N", "N", "W", "W", "W", "W", "N", "N", "N", "N", "N"],
["N", "W", "N", "N", "N", "N", "N", "N", "W", "N", "N", "W", "N", "N", "W", "N", "W", "M", "N", "N"],
["N", "W", "N", "N", "N", "N", "N", "N", "W", "N", "N", "W", "N", "N", "W", "N", "W", "N", "N", "N"],
["N", "W", "N", "N", "N", "N", "N", "W", "W", "N", "N", "W", "W", "N", "W", "N", "W", "N", "N", "N"],
["N", "W", "W", "N", "W", "W", "W", "W", "N", "N", "N", "N", "W", "W", "W", "N", "W", "W", "W", "W"],
["N", "N", "N", "N", "N", "N", "N", "N", "N", "W", "W", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
["N", "N", "N", "N", "N", "N", "N", "N", "N", "W", "W", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
["N", "W", "W", "W", "W", "W", "W", "W", "N", "N", "N", "N", "W", "W", "W", "W", "W", "W", "W", "W"],
["N", "W", "N", "N", "N", "N", "N", "W", "W", "N", "N", "W", "W", "N", "N", "W", "N", "N", "N", "N"],
["N", "W", "N", "N", "N", "N", "N", "N", "W", "N", "N", "W", "N", "N", "N", "W", "N", "N", "N", "N"],
["N", "W", "N", "N", "N", "N", "N", "N", "W", "N", "N", "W", "N", "N", "N", "W", "N", "N", "N", "N"],
["N", "W", "W", "N", "W", "W", "W", "W", "W", "N", "N", "W", "W", "N", "W", "W", "N", "N", "N", "N"],
["N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"],
["W", "W", "W", "N", "W", "W", "W", "W", "W", "N", "N", "W", "W", "W", "W", "W", "N", "N", "N", "N"],
["N", "N", "N", "N", "N", "N", "W", "N", "W", "N", "N", "W", "N", "N", "N", "W", "W", "N", "W", "W"],
["N", "N", "N", "P", "N", "N", "N", "N", "W", "N", "N", "W", "N", "N", "N", "N", "W", "W", "W", "N"],
["N", "N", "N", "N", "N", "N", "W", "N", "W", "N", "N", "W", "N", "N", "N", "N", "N", "N", "N", "N"]
]

/// Read and display layout.
readMazeLayout(layout);
displayGrid();


/////////////////////////// MOVEMENT //////////////////////////

function isValidMove(targetX, targetY) {
    /// Determines if the target position (targetX, targetY) is a valid
    ///   place to go to, based on the given actor's starting position.
    /// isValidMove : int int -> bool
    /// requires: gridModel.tilesPerSide > targetX, targetY >= 0

    if ((0 > targetX) || (targetX >= gridModel.tilesPerSide))
        throw Error("isValidMove() received targetX out-of-range");
    if ((0 > targetY) || (targetY >= gridModel.tilesPerSide))
        throw Error("isValidMove() received targetY out-of-range");

    if (gridModel.isOccupied(targetX, targetY)) return false;

    const actorPos = this.getPosition(gridModel);
    const diffX = targetX - actorPos.x;
    const diffY = targetY - actorPos.y;
    if (Math.abs(diffX) == 1 && diffY == 0)
        return true;
    else if (diffX == 0 && Math.abs(diffY) == 1)
        return true;
    return false;
}

function actorMove(targetX, targetY, direcX, direcY) {
    /// Animates the GameActor's movement from their starting tile to a
    ///   selected tile (targetX, targetY), assuming the vector of 
    ///   their movement is (direcX, direcY)
    /// actorMove: int int int int -> void
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

    /// Get the Actor's origin position
    const actorPos = this.getPosition(gridModel);
    
    /// Define the function that performs the animation logic. 
    let animationFunc = function() {
        const actorRect = this.node.getBoundingClientRect();
        if (Math.abs(actorRect.left - targetLeft) >= epsilon)
        {
            /// Actor must be moving horizontally. 

            this.node.style.left = parseFloat(this.node.style.left) + (movespeed * direcX) + "px";
        }
        else if (Math.abs(actorRect.top - targetTop) >= epsilon)
        {
            /// Actor must be moving vertically.

            this.node.style.top = parseFloat(this.node.style.top) + (movespeed * direcY) + "px";
        }
        else 
        {
            /// Actor is at the target position, so we complete the animation.

            /// Make sure the Actor is in the proper position on the screen.
            this.node.style.left = targetLeft;
            this.node.style.top  = targetTop;

            /// Make sure the Actor is in the proper position programmatically. 
            gridModel.removeActor(actorPos.x, actorPos.y);
            const newPos = this.getPosition(gridModel);
            gridModel.addActor('P', newPos.x, newPos.y);

            /// Make sure the Actor's DOM Node reference in gridModel.canvas is correct.
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


///////////////// GAME LOGIC /////////////////

function evaluateMinotaurStatus() {
    /// Returns information about the state of the Minotaur enemy. 
    /// evaluteMinotaurStatus: void -> { bool }

    return {
        dead : !gridModel.monster.isAlive(),
    }

}

function evaluatePlayerStatus() {
    /// Returns information about the state of the player.
    /// evalutePlayerStatus: void -> { bool }

    return {
        dead : !gridModel.player.isAlive(),
    }
}


///////////////// EVENT LISTENERS /////////////////

$("#grid").on("click", function(event) {

    /// Player's turn
    const target    = gridModel.getCoordinates(event.clientX, event.clientY);
    let playerModel = gridModel.player;

    if (gridModel.isOccupiedBy('M', target.x, target.y))
    {
        /// Attack the monster.

        gridModel.monster.takeDamage(gridModel.player.attack);
    }
    else if (!playerModel.moving && isValidMove.call(playerModel, target.x, target.y))
    {
        /// Move the player.

        const playerPos = playerModel.getPosition(gridModel);
        const diff      = getDiffVector([target.x, target.y], [playerPos.x, playerPos.y]);

        actorMove.call(playerModel, target.x, target.y, diff[0], diff[1]);
    }

    /// Enemy Turns
    let minotaurStatus = evaluateMinotaurStatus();

    if (minotaurStatus.dead) {
        let minotaurPos = gridModel.monster.getPosition(gridModel);
        $(gridModel.getNodeReference(minotaurPos.x, minotaurPos.y)).remove();
        gridModel.removeComplete(minotaurPos.x, minotaurPos.y);
    }

    let playerStatus = evaluatePlayerStatus();
});

$("#loadButton").on("click", function() {
    clearGrid();
    readMazeLayout(JSON.parse(localStorage["mazeSavedCustomMap"]));
    displayGrid();
});

