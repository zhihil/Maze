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

/// Used to track when minotaur acquires player position.
let turnsSinceAcquire = 0;
const acquireCooldown = 3;

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

function MoveNode(x, y) {
    this.pos = { 
        x : x, 
        y : y
    };
    this.parent = null;
    this.children = [];
}

function acquirePath() {

    /// Strategy : 

    /// In order to find the shortest path the Minotaur would take to reach the player,
    ///     we can apply Breadth-First Search (BFS).
    /// At any moment, the Program State does not give information on which route leads 
    ///     to the Player, so we are forced to track every single route. 
    /// One way to represent all possible routes is with a Tree. This tree has :
    ///     - Multiple children
    ///     - Nodes that represent a coordinate pair on the grid.
    ///     - A root that is "empty" or has "no movement"
    /// As we move along the graph via BFS, we can construct this Tree.
    /// If we start from a leaf and move all the way up to the root. Then this traversal
    ///     gives us the shortest path from the Minotaur to the Player. Then if the Player's
    ///     tile is a leaf in this tree, doing the traversal gives us the required shortest
    ///     path.
    /// The leaves of this tree is equivalent to the queue used in BFS. So we need to
    ///     iterate through all the leaves and add adjacent tiles to the tree, until we
    ///     find the player.
    
    /// Assumptions:
    ///     1. The Minotaur can reach the Player. That is, the Player and Minotaur are
    ///         not located on two disconnected grpahs.
    
    /// The procedure:
    ///
    /// Node: [ Need a Node object ] 
    ///  - { coordX : x, coordY : y }
    ///  - Parent node
    ///  - Child nodes
    ///
    /// Initiaization:
    ///     - Put in the Minotaur's initial position as a Node object into the queue.
    ///
    /// Loop:
    ///     - Dequeue to node       [ Need a queue ]
    ///     - Mark node as visited. [ Need a visited array ] 
    ///     - If the current Node's tile is a 'P', then stop the loop.
    ///     - Enqueue node's neighbours as Nodes    [ Need a enqueueing helper function ]
    ///   
    /// Recurse:
    ///     - Starting from the current Node (which should correspond to 'P') recurse up parents.
    ///     - Store two positions: p1 and p2. Find their difference and use addMovement to enqueue this value.
    ///     - Stop when parent == null

    let visited = new Array(gridModel.tilesPerSide);
    for (let y = 0; y < gridModel.tilesPerSide; ++y)
    {
        visited[y] = new Array(gridModel.tilesPerSide);
        for (let x = 0; x < gridModel.tilesPerSide; ++x)
        {
            visited[y][x] = false;
        }
    }

    let monsterPos = gridModel.monster.getPosition(gridModel);
    let queue = [new MoveNode(monsterPos.x, monsterPos.y)];
    visited[monsterPos.y][monsterPos.x] = true;

    let isValidNeighbor = (neighX, neighY) => {
        /// Determines if the tile specified at (neighX, neighY) is a valid
        ///     neighbour to the given node. Assuming that the tile specified
        ///     shares a side with the tile of node.
        /// isValidNeighbour: int int -> bool
        /// requires: node != null

        return 0 <= neighX && neighX < gridModel.tilesPerSide &&
               0 <= neighY && neighY < gridModel.tilesPerSide &&
               !visited[neighY][neighX] && 
               gridModel.getActor(neighX, neighY) != "W";
    }

    let getNeighbors = (node) => {
        /// Returns a list of neighbours to node.

        let neighborsList = [];
        if (isValidNeighbor(node.pos.x - 1, node.pos.y)) {
            neighborsList.push(new MoveNode(node.pos.x - 1, node.pos.y));
        }
        if (isValidNeighbor(node.pos.x + 1, node.pos.y)) {
            neighborsList.push(new MoveNode(node.pos.x + 1, node.pos.y));
        }
        if (isValidNeighbor(node.pos.x, node.pos.y - 1)) {
            neighborsList.push(new MoveNode(node.pos.x, node.pos.y - 1));
        }
        if (isValidNeighbor(node.pos.x, node.pos.y + 1)) {
            neighborsList.push(new MoveNode(node.pos.x, node.pos.y + 1));
        }

        return neighborsList;
    }

    let curNode = null;
    do {
        curNode = queue.shift();

        let neighbors = getNeighbors(curNode);
        curNode.children = neighbors;

        for (let neighbor of neighbors) {
            visited[neighbor.pos.y][neighbor.pos.x] = true
            neighbor.parent = curNode;
            queue.push(neighbor);
        }
    } while (gridModel.getActor(curNode.pos.x, curNode.pos.y) !== "P");

    let path = [];
    let n2 = curNode;
    let n1 = curNode.parent;
    while (n1 !== null) {
        path.shift({
            dx : n2.x - n1.x, 
            dy : n2.y - n1.y
        })
        n2 = n1;
        n1 = curNode.parent;
    };

    return path;
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

