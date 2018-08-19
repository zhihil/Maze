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

let playerModel = null;
let minotaurModel = null;
let treasureModel = null;

let win = false;


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
                playerModel = new PlayerModel("Theseus");
                gridModel.addNodeReference(playerModel.node, x, y);

            } else if (gridModel.getActor(x, y) == 'W') {
                let wall = new Wall("Dungeon Wall");
                gridModel.addNodeReference(wall.node, x, y);

            } else if (gridModel.getActor(x, y) == 'M') {
                minotaurModel = new MinotaurModel("Moo-moo");
                gridModel.addNodeReference(minotaurModel.node, x, y);

            } else if (gridModel.getActor(x, y) == "T") {
                treasureModel = new TreasureModel("Golden Fleece");
                gridModel.addNodeReference(treasureModel.node, x, y);
                

            }
        }
    }
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
                $(gridModel.getNodeReference(x, y)).css("top", 50 * y + "px")
                                                   .css("left", 50 * x + "px")
                                                   .appendTo("#grid");
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
["N", "W", "N", "N", "N", "N", "N", "N", "W", "N", "N", "W", "N", "N", "W", "N", "T", "M", "N", "N"],
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


//////////////////////////////////////////////////// MOVEMENT ////////////////////////////////////////////////////

function isValidMove(targetX, targetY) {
    /// Determines if the target position (targetX, targetY) is a valid
    ///   place to go to, based on the given actor's starting position.
    /// isValidMove : int int -> bool
    /// requires: gridModel.tilesPerSide > targetX, targetY >= 0

    if ((0 > targetX) || (targetX >= gridModel.tilesPerSide))
        return false;
    if ((0 > targetY) || (targetY >= gridModel.tilesPerSide))
        return false;

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

function actorMove(actorTile, targetX, targetY, direcX, direcY) {
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
            gridModel.addActor(actorTile, newPos.x, newPos.y);

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

    const pos = minotaurModel.getPosition(gridModel);
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

    let monsterPos = minotaurModel.getPosition(gridModel);
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
               !gridModel.isOccupiedBy('W', neighX, neighY) &&
               !gridModel.isOccupiedBy('T', neighX, neighY);
    }

    let getNeighbors = (node) => {
        /// Returns a list of neighbours to node.
        /// getNeighbors : MoveNode -> Arrayof(MoveNode)

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
        path.unshift({
            dx : n2.pos.x - n1.pos.x, 
            dy : n2.pos.y - n1.pos.y
        })
        n2 = n1;
        n1 = n1.parent;
    };

    return path;
}

//////////////////////////////////////////////////// INITIALIZE GAME ////////////////////////////////////////////////////

/// Read and display layout.
makeCheckerBoard();
readMazeLayout(layout);
displayGrid();

/// Stores an array of movements that the monster should take, e.g., [ { dx : 1, dy : 0 }, { dx : 0, dy : 1} ]
let monsterMovement = acquirePath();

/// Used to track when minotaur acquires player position.
let turnsSinceAcquire = 0;
const acquireCooldown = 3;

//////////////////////////////////////////////////// EVENT LISTENERS ////////////////////////////////////////////////////

$("#grid").on("click", function(event) {

    /// Game is done.
    if (win) return;

    /// Player is dead.
    if (playerModel === null) return;


    /// Player's turn
    const target    = gridModel.getCoordinates(event.clientX, event.clientY);
    if (playerModel.moving || !isValidMove.call(playerModel, target.x, target.y))
    {
        alert("Invalid move.");
        return;
    }
    else if (gridModel.isOccupiedBy('M', target.x, target.y))
    {
        /// Attack the monster.

        minotaurModel.takeDamage(playerModel.attack);
        alert("Placeholder: Player attacks!");
    }
    else if (gridModel.isOccupiedBy('T', target.x, target.y)) 
    {
        win = true;
        alert("You Win!");
    }
    else
    {
        /// Move the player.

        const playerPos = playerModel.getPosition(gridModel);
        const diff      = getDiffVector([target.x, target.y], [playerPos.x, playerPos.y]);

        actorMove.call(playerModel, "P", target.x, target.y, diff[0], diff[1]);
    }


    /// Check Enemy Status
    if (minotaurModel !== null && !minotaurModel.isAlive()) {
        let minotaurPos = minotaurModel.getPosition(gridModel);
        $(gridModel.getNodeReference(minotaurPos.x, minotaurPos.y)).remove();
        gridModel.removeComplete(minotaurPos.x, minotaurPos.y);
        minotaurModel = null;

        alert("Placeholder: Monster dead!");
    } else if (turnsSinceAcquire === acquireCooldown) {
        turnsSinceAcquire = 0;
        monsterMovement = acquirePath();
    }


    /// Monster is dead.
    if (minotaurModel === null) return;


    /// Minotaur Turn
    if (playerNearEnemy())
    {
        /// Attack the Player 

        alert("Placeholder: Monster attacks!");
        turnsSinceAcquire += 1;
        playerModel.takeDamage(minotaurModel.attack);
    }
    else if (monsterMovement.length == 0)
    {
        /// Reacquire the player.

        turnsSinceAcquire = 0;
        monsterMovement = acquirePath();
    }
    else 
    {
        /// Move the Monster.

        turnsSinceAcquire += 1;
        let move = monsterMovement.shift();
        let monsterPos = minotaurModel.getPosition(gridModel);
        actorMove.call(minotaurModel, "M", monsterPos.x + move.dx, monsterPos.y + move.dy, move.dx, move.dy);
    }


    /// Check Player status
    if (playerModel !== null && !playerModel.isAlive()) {
        const playerPos = playerModel.getPosition(gridModel);
        $(gridModel.getNodeReference(playerPos.x, playerPos.y)).remove();
        gridModel.removeComplete(playerPos.x, playerPos.y);
        playerModel = null;

        alert("Placeholder: Player dead!");
    }
});

$("#loadButton").on("click", function() {
    clearGrid();
    readMazeLayout(JSON.parse(localStorage["mazeSavedCustomMap"]));
    displayGrid();

    win = false;

    /// Make sure we aren't using the path from the old map onto the new one.
    monsterMovement = acquirePath();
});

