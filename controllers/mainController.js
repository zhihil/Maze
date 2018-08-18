//////////////////////////////////////////////////////////////////////
///
/// mainController.js
///
/// Detects user input for main.html and passes it into the relevant
///   Models to handle the information.
///
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////// SETTING UP THE MODELS /////////////////////////////////////////////////////////////////////

let gridModel = new GridModel();
gridModel.node = $("#grid")[0];


//////////////////////////////////////////////////// DISPLAYING ELEMENTS ////////////////////////////////////////////////////

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
makeCheckerBoard();
readMazeLayout(layout);
displayGrid();


//////////////////////////////////////////////////// MOVEMENT ////////////////////////////////////////////////////

function isValidMove(targetX, targetY) {
    /// Determines if the target position (targetX, targetY) is a valid
    ///   place to go to, based on the given actor's starting position.
    /// isValidMove : int int -> bool
    /// requires: gridModel.tilesPerSide > targetX, targetY >= 0

    if ((0 > targetX) || (targetX >= gridModel.tilesPerSide))
        throw new Error("isValidMove() received targetX out-of-range");
    if ((0 > targetY) || (targetY >= gridModel.tilesPerSide))
        throw new Error("isValidMove() received targetY out-of-range");

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


//////////////////////////////////////////////////// GAME LOGIC ////////////////////////////////////////////////////

function playerNearEnemy() {
    /// Determines if the player is in a space one tile away from the
    ///     enemy.
    /// playerNearEnemy: void -> bool

    const pos = gridModel.monster.getPosition(gridModel);
    if      (pos.x - 1 >= 0                      &&  gridModel.getActor(pos.x - 1, pos.y) === "P")
        return true;
    else if (pos.x + 1 < gridModel.tilesPerSide  &&  gridModel.getActor(pos.x + 1, pos.y) === "P")
        return true;
    else if (pos.y - 1 >= 0                      &&  gridModel.getActor(pos.x, pos.y - 1) === "P")
        return true;
    else if (pos.y + 1 < gridModel.tilesPerSide  &&  gridModel.getActor(pos.x, pos.y + 1) === "P")
        return true;
    return false;
    
}

//////////////////////////////////////////////////// MINOTAUR MOVEMENT ////////////////////////////////////////////////////

/// Contains functions used by the Minotaur to find a path to the player and follow it.

/// Stores an array of movements that the monster should take, e.g., [ { dx : 1, dy : 0 }, { dx : 0, dy : 1} ]
let monsterMovement = [];

function addMovement(x, y) {
    /// Adds a new direction object { dx : x , dy : y } to the beginning of monsterMovement.
    /// addMovement: int int -> void
    /// requires: -1 <= x, y <= 1
    ///           one of x, y must be 0, one is not 0.
    /// effects: modifies monsterMovement

    if (x < -1 || x > 1) 
        throw new Error("addMovement was given invalid x");
    else if (y < -1 || y > 1)
        throw new Error("addMovement was given invalid y");
    else if (x != 0 && y != 0)
        throw new Error("addMovement was given an invalid movement pair");
    monsterMovement.unshift({ dx : x, dy : y});
}


//////////////////////////////////////////////////// EVENT LISTENERS ////////////////////////////////////////////////////

$("#grid").on("click", function(event) {

    /// Check Player status
    if (gridModel.player === null) 
    {
        /// Player is dead.

        alert("Placeholder: Player dead!");
        return;
    }


    /// Player's turn
    const target    = gridModel.getCoordinates(event.clientX, event.clientY);
    if (gridModel.isOccupiedBy('M', target.x, target.y))
    {
        /// Attack the monster.

        alert("Placeholder: Player attacks!");
        gridModel.monster.takeDamage(gridModel.player.attack);
    }
    else if (!gridModel.player.moving && isValidMove.call(gridModel.player, target.x, target.y))
    {
        /// Move the player.

        const playerPos = gridModel.player.getPosition(gridModel);
        const diff      = getDiffVector([target.x, target.y], [playerPos.x, playerPos.y]);

        actorMove.call(gridModel.player, target.x, target.y, diff[0], diff[1]);
    }


    /// Check Enemy Status

    if (gridModel.monster !== null && !gridModel.monster.isAlive()) {
        let minotaurPos = gridModel.monster.getPosition(gridModel);
        $(gridModel.getNodeReference(minotaurPos.x, minotaurPos.y)).remove();
        gridModel.removeComplete(minotaurPos.x, minotaurPos.y);
        gridModel.monster = null;
    }

    if (gridModel.monster === null) 
    {
        /// Monster is dead.

        alert("Placeholder: Monster dead!");
        return;
    }


    /// Minotaur Turn
    if (playerNearEnemy())
    {
        /// Attack the Player 

        alert("Placeholder: Monster attacks!");
        gridModel.player.takeDamage(gridModel.monster.attack);
    }
    else
    {
        /// Move the Monster.
    }


    /// Check Player status
    if (gridModel.player !== null && !gridModel.player.isAlive()) {
        const playerPos = gridModel.player.getPosition(gridModel);
        $(gridModel.getNodeReference(playerPos.x, playerPos.y)).remove();
        gridModel.removeComplete(playerPos.x, playerPos.y);
        gridMode.player = null;
    }
});

$("#loadButton").on("click", function() {
    clearGrid();
    readMazeLayout(JSON.parse(localStorage["mazeSavedCustomMap"]));
    displayGrid();
});

