//////////////////////////////////////////////////////////////////////
///
/// grid.js
///
/// Provides a model for the game grid.
///
//////////////////////////////////////////////////////////////////////

/////////////////////////// Grid ///////////////////////////

class GridModel {
    constructor() {
        this.gridLength = 1000;
        this.tileLength = 50;
        this.node = document.getElementById("grid");
        this.player = null;
        this.tilesPerSide = this.gridLength / this.tileLength;


        /// The actorsGrid is used to track what elements are on the grid. 
        /// The elements of actorsGrid are of type "tileCode"

        /// List of possible values for "tileCodes" is found in this.isValidTileCode()

        this.actorsGrid = new Array(this.tilesPerSide);
        for (let i = 0; i < this.tilesPerSide; ++i)
        {
            this.actorsGrid[i] = new Array(this.tilesPerSide);
            for (let j = 0; j < this.tilesPerSide; ++j)
            {
                this.actorsGrid[i][j] = 'N';
            }
        }

        /// Generate a 2D array of references to DOM nodes, which will be used
        ///     by the Erase paintbrush option to delete DOM nodes on the screen.
        this.canvas = new Array(this.tilesPerSide);
        for (let y = 0; y < this.tilesPerSide; ++y)
        {
            this.canvas[y] = new Array(this.tilesPerSide);
            for (let x = 0; x < this.tilesPerSide; ++x)
            {
                this.canvas[y][x] = null;
            }
        }
    }

    getCoordinates(posX, posY) {
        /// Given the absolute position (posX, posY) in pixels, calculate the
        ///   the coordinates of the position relative to #grid's origin (top-left corner)
        /// getCoordinates: float float -> {int, int}
        /// requires: gridLength >= posX - xGridOffset >= 0
        ///           gridLength >= posY - yGridOffset >= 0

        const rect = this.node.getBoundingClientRect();
        const xGridOffset = rect.left;
        const yGridOffset = rect.top;

        if ((0 > posX - xGridOffset) || (posX - xGridOffset > this.gridLength))
            throw Error("getCoordinates() received posX out-of-range");
        if ((0 > posY - yGridOffset) || (posY - yGridOffset > this.gridLength))
            throw Error("getCoordinates() received posY out-of-range");

        return {
            x : Math.floor((posX - xGridOffset) / this.tileLength),
            y : Math.floor((posY - yGridOffset) / this.tileLength)
        };
    }

    addActor(tileCode, coordX, coordY) {
        /// Adds a newActor at (coordX, coordY), where (0, 0) is the top-left square on
        ///   the board and the positive axis go downward and rightward.
        /// addActor: tileCode (this.isValidTileCode) int int -> void
        /// requires: 0 <= coordX, coordY < maxNumTiles
        
        if (!this.isValidTileCode(tileCode))
            throw Error("removeActor() was given an invalid tileCode");
        if (0 > coordX)
            throw Error("removeActor() was given a negative x-coordinate");
        if (coordX >= this.tilesPerSide)
            throw Error("removeActor() was given an out-of-range x-coordinate");
        if (0 > coordY)
            throw Error("removeActor() was given a negative y-coordinate");
        if (coordY >= this.tilesPerSide)
            throw Error("removeActor() was given an out-of-range y-coordinate");

            this.actorsGrid[coordY][coordX] = tileCode;
    }
    
    isValidTileCode(code) {
        /// Determines if the given code is an example of a tileCode. A valid tileCode is
        ///   one of:
        ///     - 'N' - Null
        ///     - 'P' - Player
        ///     - 'M' - Monster or Minotaur
        ///     - 'W' - Wall
        ///     - 'T' - Treasure (Fleece)

        return code === 'N' || code === 'P' || code === 'M' || code === 'W' || code === 'T';
    }

    removeActor(coordX, coordY) {
        /// Removes the actor at (coordX, coordY), where (0, 0) is the top-left square on
        ///   the board and the positive axis go downward and rightward.
        /// removeActor: int int -> void
        /// requires: 0 <= coordX, coordY < maxNumTiles

        if (0 > coordX)
            throw Error("removeActor() was given a negative x-coordinate");
        if (coordX >= this.tilesPerSide)
            throw Error("removeActor() was given an out-of-range x-coordinate");
        if (0 > coordY)
            throw Error("removeActor() was given a negative y-coordinate");
        if (coordY >= this.tilesPerSide)
            throw Error("removeActor() was given an out-of-range y-coordinate");

            this.actorsGrid[coordY][coordX] = 'N';
    }

    getActor(coordX, coordY) {
        /// Returns the actor at (coordX, coordY), where (0, 0) is the top-left square on
        ///   the board and the positive axis go downward and rightward.
        /// removeActor: int int -> void
        /// requires: 0 <= coordX, coordY < maxNumTiles

        if (0 > coordX)
            throw Error(".getActor() was given a negative x-coordinate");
        if (coordX >= this.tilesPerSide)
            throw Error("getActor() was given an out-of-range x-coordinate");
        if (0 > coordY)
            throw Error("getActor() was given a negative y-coordinate");
        if (coordY >= this.tilesPerSide)
            throw Error("getActor() was given an out-of-range y-coordinate");

        return this.actorsGrid[coordY][coordX];
    }

    isOccupied(coordX, coordY) {
    /// Determines if the chosen tile (coordX, coordY) on the grid is occupied or not.
    /// isOccupied: int int -> bool
    /// requires: 0 <= coordX, coordY < this.tilesPerSide

        if (0 > coordX || coordX >= this.tilesPerSide)
            throw Error("this.isOccupied() received x out-of-range.");
        if (0 > coordY || coordY >= this.tilesPerSide)
            throw Error("this.isOccupied() received y out-of-range.");

        return this.actorsGrid[coordY][coordX] != 'N';
    }

    removeNodeReference(coordX, coordY) {
        /// Sets the node reference of canvas at (coordX, coordY) to null.
        /// removeNodeReference: int int -> void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        /// time: O(1)
        /// effects: modifies this.canvas
        this.canvas[coordY][coordX] = null;
    }

    addNodeReference(newNode, coordX, coordY) {
        /// Adds a new node reference for canvas at (coordX, coordY).
        /// addNodeReference: DOMNode int int ->void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        ///           newNode != null, undefined 
        /// time: O(1)
        /// effects: modifies this.canvas

        this.canvas[coordY][coordX] = newNode;
    }

    detachNode(coordX, coordY) {
        /// Removes the DOM Node at (coordX, coordY) from the DOM Node.
        /// detachNode: int int -> void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        /// time: O(1)
        /// effects: modifies this.canvas
        ///          modifies main.html.

        if (this.canvas[coordY][coordX] !== null)
        {
            $(this.canvas[coordY][coordX]).remove();
        }
        this.removeNodeReference(coordX, coordY);
    }

    addNode(newNode, coordX, coordY) {
        /// Adds the given DOM Node to (coordX, coordY) of canvas..
        /// detachNode: DOMNode int int -> void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        ///           newNode != null, undefined
        /// time: O(1)
        /// effects: modifies this.canvas
        ///          modifies main.html.

        this.addNodeReference(newNode, coordX, coordY);
        $(newNode).css("top", 50 * coordY + "px")
                .css("left", 50 * coordX + "px")
                .appendTo("#grid");
    }

    resetActorsGrid() {
        /// Sets all elements in actorsGrid to tileCode 'N' and removes
        ///   all game tiles from view.
        /// resetActorsGrid: void -> void
        /// time: O(N^2) : N = this.tilesPerSide
        /// effects: modifies this.actorsGrid

        for (let y = 0; y < this.tilesPerSide; ++y) {
            for (let x = 0; x < this.tilesPerSide; ++x) {
                if (this.actorsGrid[y][x] == 'P') 
                    this.player = null;
                this.removeActor(x, y);
                this.detachNode(x, y);
            }
        }
    }

    readMazeLayout(layout) {
        /// Fills the this's actorsGrid with the elements specified in
        ///   layout.
        /// readMazeLayout: Arrayof(tileCode) -> void
        /// requires: layout is a square grid with length this.tilesPerSide
        /// time: O(N^2) : N = this.tilesPerSide
        /// effects: modifies this.actorsGrid

        this.resetActorsGrid();
        for (let y = 0; y < layout.length; ++y) {
            for (let x = 0; x < layout.length; ++x) {
                this.addActor(layout[y][x], x, y);

                if (this.getActor(x, y) == 'P') {
                    this.player = new PlayerModel("Theseus");
                    this.addNode(this.player.node, x, y);

                } else if (this.getActor(x, y) == 'W') {
                    let wall = new Wall(x, y);
                    this.addNode(wall.node, x, y);

                } else if (this.getActor(x, y) == 'M') {
                    alert("Minotaur has not been implemented yet.");

                }
            }
        }
    }
}