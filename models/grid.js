//////////////////////////////////////////////////////////////////////
///
/// grid.js
///
/// Provides a model for the game grid.
///
//////////////////////////////////////////////////////////////////////

/////////////////////////// Grid ///////////////////////////

let gridModel = {
    gridLength : 1000,
    tileLength : 50,
    node : document.getElementById("grid"),
};
gridModel.tilesPerSide = gridModel.gridLength / gridModel.tileLength;

/// The actorsGrid is used to track what elements are on the grid. 
/// The elements of actorsGrid are of type "tileCode"

/// List of possible values for "tileCodes" is found in gridModel.isValidTileCode()

gridModel.actorsGrid = new Array(this.tilesPerSide);
for (let i = 0; i < gridModel.tilesPerSide; ++i)
{
    gridModel.actorsGrid[i] = new Array(this.tilesPerSide);
    for (let j = 0; j < gridModel.tilesPerSide; ++j)
    {
        gridModel.actorsGrid[i][j] = 'N';
    }
}

/// Generate a 2D array of references to DOM nodes, which will be used
///     by the Erase paintbrush option to delete DOM nodes on the screen.
gridModel.canvas = new Array(gridModel.tilesPerSide);
for (let y = 0; y < gridModel.tilesPerSide; ++y)
{
    gridModel.canvas[y] = new Array(gridModel.tilesPerSide);
    for (let x = 0; x < gridModel.tilesPerSide; ++x)
    {
        gridModel.canvas[y][x] = null;
    }
}

gridModel.getCoordinates = function(posX, posY){
    /// Given the absolute position (posX, posY) in pixels, calculate the
    ///   the coordinates of the position relative to #grid's origin (top-left corner)
    /// getCoordinates: float float -> {int, int}
    /// requires: gridLength >= posX - xGridOffset >= 0
    ///           gridLength >= posY - yGridOffset >= 0

    const rect = this.node.getBoundingClientRect();
    const xGridOffset = rect.left;
    const yGridOffset = rect.top;

    if ((0 > posX - xGridOffset) || (posX - xGridOffset > this.gridLength))
        throw Error("gridModel.getCoordinates() received posX out-of-range");
    if ((0 > posY - yGridOffset) || (posY - yGridOffset > this.gridLength))
        throw Error("gridModel.getCoordinates() received posY out-of-range");

    return {
        x : Math.floor((posX - xGridOffset) / this.tileLength),
        y : Math.floor((posY - yGridOffset) / this.tileLength)
    };
}

gridModel.addActor = function(tileCode, coordX, coordY) {
    /// Adds a newActor at (coordX, coordY), where (0, 0) is the top-left square on
    ///   the board and the positive axis go downward and rightward.
    /// addActor: tileCode (gridModel.isValidTileCode) int int -> void
    /// requires: 0 <= coordX, coordY < maxNumTiles
    
    if (!gridModel.isValidTileCode(tileCode))
        throw Error("gridModel.removeActor() was given an invalid tileCode");
    if (0 > coordX)
        throw Error("gridModel.removeActor() was given a negative x-coordinate");
    if (coordX >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range x-coordinate");
    if (0 > coordY)
        throw Error("gridModel.removeActor() was given a negative y-coordinate");
    if (coordY >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range y-coordinate");

    gridModel.actorsGrid[coordY][coordX] = tileCode;
}

gridModel.isValidTileCode = function(code) {
    /// Determines if the given code is an example of a tileCode. A valid tileCode is
    ///   one of:
    ///     - 'N' - Null
    ///     - 'P' - Player
    ///     - 'M' - Monster or Minotaur
    ///     - 'W' - Wall
    ///     - 'T' - Treasure (Fleece)

    return code === 'N' || code === 'P' || code === 'M' || code === 'W' || code === 'T';
}

gridModel.removeActor = function(coordX, coordY) {
    /// Removes the actor at (coordX, coordY), where (0, 0) is the top-left square on
    ///   the board and the positive axis go downward and rightward.
    /// removeActor: int int -> void
    /// requires: 0 <= coordX, coordY < maxNumTiles

    if (0 > coordX)
        throw Error("gridModel.removeActor() was given a negative x-coordinate");
    if (coordX >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range x-coordinate");
    if (0 > coordY)
        throw Error("gridModel.removeActor() was given a negative y-coordinate");
    if (coordY >= gridModel.tilesPerSide)
        throw Error("gridModel.removeActor() was given an out-of-range y-coordinate");

    gridModel.actorsGrid[coordY][coordX] = 'N';
}

gridModel.getActor = function(coordX, coordY) {
    /// Returns the actor at (coordX, coordY), where (0, 0) is the top-left square on
    ///   the board and the positive axis go downward and rightward.
    /// removeActor: int int -> void
    /// requires: 0 <= coordX, coordY < maxNumTiles

    if (0 > coordX)
        throw Error("gridModel.getActor() was given a negative x-coordinate");
    if (coordX >= gridModel.tilesPerSide)
        throw Error("gridModel.getActor() was given an out-of-range x-coordinate");
    if (0 > coordY)
        throw Error("gridModel.getActor() was given a negative y-coordinate");
    if (coordY >= gridModel.tilesPerSide)
        throw Error("gridModel.getActor() was given an out-of-range y-coordinate");

    return gridModel.actorsGrid[coordY][coordX];
}

gridModel.isOccupied = function(x, y) {
    /// Determines if the chosen tile (x, y) on the grid is occupied or not.
    /// isOccupied: int int -> bool
    /// requires: 0 <= x, y < gridModel.tilesPerSide

    if (0 > x || x >= gridModel.tilesPerSide)
        throw Error("gridModel.isOccupied() received x out-of-range.");
    if (0 > y || y >= gridModel.tilesPerSide)
        throw Error("gridModel.isOccupied() received y out-of-range.");

    return gridModel.actorsGrid[y][x] != 'N';
}

gridModel.removeNodeReference = function(coordX, coordY) {
    /// Sets the node reference of canvas at (coordX, coordY) to null.
    /// removeNodeReference: int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide
    /// time: O(1)
    /// effects: modifies gridModel.canvas
    this.canvas[coordY][coordX] = null;
}

gridModel.addNodeReference = function(newNode, coordX, coordY) {
    /// Adds a new node reference for canvas at (coordX, coordY).
    /// addNodeReference: DOMNode int int ->void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide
    ///           newNode != null, undefined 
    /// time: O(1)
    /// effects: modifies gridModel.canvas

    this.canvas[coordY][coordX] = newNode;
}

gridModel.detachNode = function(coordX, coordY) {
    /// Removes the DOM Node at (coordX, coordY) from the DOM Node.
    /// detachNode: int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide
    /// time: O(1)
    /// effects: modifies gridModel.canvas
    ///          modifies main.html.

    if (gridModel.canvas[coordY][coordX] !== null)
    {
        $(this.canvas[coordY][coordX]).remove();
    }
    this.removeNodeReference(coordX, coordY);
}

gridModel.addNode = function(newNode, coordX, coordY) {
    /// Adds the given DOM Node to (coordX, coordY) of canvas..
    /// detachNode: DOMNode int int -> void
    /// requires: 0 <= coordX, coordY < gridModel.tilesPerSide
    ///           newNode != null, undefined
    /// time: O(1)
    /// effects: modifies gridModel.canvas
    ///          modifies main.html.

    this.addNodeReference(newNode, coordX, coordY);
    $(newNode).css("top", 50 * coordY + "px")
              .css("left", 50 * coordX + "px")
              .appendTo("#grid");
}

gridModel.resetActorsGrid = function() {
    /// Sets all elements in actorsGrid to tileCode 'N' and removes
    ///   all game tiles from view.
    /// resetActorsGrid: void -> void
    /// time: O(N^2) : N = gridModel.tilesPerSide
    /// effects: modifies gridModel.actorsGrid

    for (let y = 0; y < gridModel.tilesPerSide; ++y) {
        for (let x = 0; x < gridModel.tilesPerSide; ++x) {
            this.removeActor(x, y);
            this.detachNode(x, y);
        }
    }
}

gridModel.readMazeLayout = function(layout) {
    /// Fills the gridModel's actorsGrid with the elements specified in
    ///   layout.
    /// readMazeLayout: Arrayof(tileCode) -> void
    /// requires: layout is a square grid with length gridModel.tilesPerSide
    /// time: O(N^2) : N = gridModel.tilesPerSide
    /// effects: modifies gridModel.actorsGrid

    gridModel.resetActorsGrid();
    for (let y = 0; y < layout.length; ++y) {
        for (let x = 0; x < layout.length; ++x) {
            gridModel.addActor(layout[y][x], x, y);

            if (gridModel.getActor(x, y) == 'P') {
                this.addNode(playerModel.node, x, y);

            } else if (gridModel.getActor(x, y) == 'W') {
                let wall = new Wall(x, y);
                this.addNode(wall.node, x, y);

            } else if (gridModel.getActor(x, y) == 'M') {
                alert("Minotaur has not been implemented yet.");

            }
        }
    }
}