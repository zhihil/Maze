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
gridModel.setGridNode("#grid");


///////////////// DISPLAYING ELEMENTS /////////////////

function addNode(newNode, coordX, coordY) {
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
            if (gridModel.canvas[y][x] !== null)
            {
                addNode(gridModel.canvas[y][x], x, y);
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
            if (gridModel.canvas[y][x] !== null)
            {
                $(gridModel.canvas[y][x]).remove();
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
["N", "W", "N", "N", "N", "N", "N", "N", "W", "N", "N", "W", "N", "N", "W", "N", "W", "N", "N", "N"],
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
gridModel.readMazeLayout(layout);
displayGrid();

///////////////// EVENT LISTENERS /////////////////

$("#grid").on("click", function(event) {
    const target = gridModel.getCoordinates(event.clientX, event.clientY);
    let playerModel = gridModel.player;
    if (!playerModel.moving && playerModel.isValidMove(target.x, target.y))
    {
        const playerPos = playerModel.getPosition();
        const diff = getDiffVector([target.x, target.y], [playerPos.x, playerPos.y]);
        playerModel.playerMove(target.x, target.y, diff[0], diff[1]);
    }
});

$("#loadButton").on("click", function() {
    clearGrid();
    gridModel.readMazeLayout(JSON.parse(localStorage["mazeSavedCustomMap"]));
    displayGrid();
});