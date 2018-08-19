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
        this.gridLength   = 1000;
        this.tileLength   = 50;
        this.node         = null;
        this.player       = null;
        this.monster      = null;
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

    validateCoordinates(coordX, coordY) {
        /// Checks that the given position (coordX, coordY) is within bounds of the grid.
        /// validateCoordinates: int int-> void

        if (0 > coordX)
            throw new Error("validateCoordinates() was given a negative x-coordinate");
        if (coordX >= this.tilesPerSide)
            throw new Error("validateCoordinates() was given an out-of-range x-coordinate");
        if (0 > coordY)
            throw new Error("validateCoordinates() was given a negative y-coordinate");
        if (coordY >= this.tilesPerSide)
            throw new Error("validateCoordinates() was given an out-of-range xy-coordinate");
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
            throw new Error("getCoordinates() received posX out-of-range");
        if ((0 > posY - yGridOffset) || (posY - yGridOffset > this.gridLength))
            throw new Error("getCoordinates() received posY out-of-range");

        return {
            x : Math.floor((posX - xGridOffset) / this.tileLength),
            y : Math.floor((posY - yGridOffset) / this.tileLength)
        };
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

    addActor(tileCode, coordX, coordY) {
        /// Adds a newActor at (coordX, coordY), where (0, 0) is the top-left square on
        ///   the board and the positive axis go downward and rightward.
        /// addActor: tileCode (see this.isValidTileCode) int int -> void
        /// requires: 0 <= coordX, coordY < maxNumTiles
        
        if (!this.isValidTileCode(tileCode))
            throw new Error("removeActor() was given an invalid tileCode");
        this.validateCoordinates(coordX, coordY);

        this.actorsGrid[coordY][coordX] = tileCode;
    }

    removeActor(coordX, coordY) {
        /// Removes the actor at (coordX, coordY), where (0, 0) is the top-left square on
        ///   the board and the positive axis go downward and rightward.
        /// removeActor: int int -> void
        /// requires: 0 <= coordX, coordY < maxNumTiles

        this.addActor('N', coordX, coordY);
    }

    getActor(coordX, coordY) {
        /// Returns the actor at (coordX, coordY), where (0, 0) is the top-left square on
        ///   the board and the positive axis go downward and rightward.
        /// removeActor: int int -> void
        /// requires: 0 <= coordX, coordY < maxNumTiles

        this.validateCoordinates(coordX, coordY);

        return this.actorsGrid[coordY][coordX];
    }

    isOccupied(coordX, coordY) {
        /// Determines if the tile at (coordX, coordY) is occupied or not.
        /// isOccupied: int int -> void
        /// requires: 0 <= coordX, coordY < maxNumTiles

        let tile = this.getActor(coordX, coordY);
        return tile != 'N';
    }

    addNodeReference(newNode, coordX, coordY) {
        /// Adds a new node reference at(coordX, coordY) of canvas.
        /// addNodeReference: DOMNode int int ->void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        ///           newNode != null, undefined 
        /// time: O(1)
        /// effects: modifies this.canvas

        this.validateCoordinates(coordX, coordY);
        this.canvas[coordY][coordX] = newNode;
    }

    removeNodeReference(coordX, coordY) {
        /// Sets the node reference at (coordX, coordY) of canvas to null.
        /// removeNodeReference: int int -> void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        /// time: O(1)
        /// effects: modifies this.canvas
        
        this.addNodeReference(null, coordX, coordY);
    }

    getNodeReference(coordX, coordY) {
        /// Returns the node reference at (coordX, coordY) of canvas.
        /// getNodeRederence: int int -> void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide

        this.validateCoordinates(coordX, coordY);
        return this.canvas[coordY][coordX];
    }

    addComplete(tilecode, newnode, coordX, coordY) {
        /// Adds both the tilecode and the DOM Node to grid at the specified
        ///     coordinates (coordX, coorY).
        /// requires: tilecode DOMNode int int -> void;
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        ///           newnode has the correct tilecode.

        this.addNodeReference(newnode, coordX, coordY);
        this.addActor(tilecode, coordX, coordY);
    }

    removeComplete(coordX, coordY) {
        /// Removes both the node reference on canvas and actor tile on actorsGrid
        ///     of the specified tile at (coordX, coordY)
        /// removeEntirely: int int -> void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        /// effects: modifies canvas and actorsGrid

        this.removeNodeReference(coordX, coordY);
        this.removeActor(coordX, coordY);
    }
    
    resetActorsGrid() {
        /// Sets all elements in actorsGrid to tileCode 'N'.
        /// resetActorsGrid: void -> void
        /// time: O(N^2) : N = this.tilesPerSide
        /// effects: modifies this.actorsGrid
    
        for (let y = 0; y < this.tilesPerSide; ++y) {
            for (let x = 0; x < this.tilesPerSide; ++x) {
                if (this.actorsGrid[y][x] == 'P') 
                    this.player = null;
                this.removeActor(x, y);
                this.removeNodeReference(x, y);
            }
        }
    }

    isOccupiedBy(tilecode, coordX, coordY) {
        /// Determines if the position (coordX, coordY) is occupied by
        ///     the specified tilecode.
        /// isOccupiedBy: tilecode (see this.isValidTileCode) int int -> bool
        /// requires: 0 <= coordX, coordY < this.tilesPerSide
        
        if (!this.isValidTileCode(tilecode))
            throw new Error("removeActor() was given an invalid tileCode");

        return this.getActor(coordX, coordY) == tilecode;
    }
}