//////////////////////////////////////////////////////////////////////
///
/// mainController.js
///
/// Stores data and manages the logic of the MazeNaster maze-creation
///     tool.
///
//////////////////////////////////////////////////////////////////////

//////////////////////// MazeMaster Model ////////////////////////

class MazemasterModel extends GridModel {
    constructor() {
        super();

        this.paintbrushTile = 'W';

        /// Generate a dictionary that counts the number of each tile that has been
        ///     drawn on the screen.
        this.tileCount = {};

        /// Use a for loop to iterate through both lowercase and uppercase alphabet to
        ///     add valid tileCode. This approach is less efficient but is more robust
        ///     because you don't need to manually add new entries.

        for (let c = 0; c < 26; ++c)
        {
            if (this.isValidTileCode(String.fromCharCode(97 + c)))
            {
                this.tileCount[String.fromCharCode(97 + c)] = 0;
            }
            if (this.isValidTileCode(String.fromCharCode(65 + c)))
            {
                this.tileCount[String.fromCharCode(65 + c)] = 0;
            }
        }

        // Generate a 2D array of references to DOM nodes, which will be used
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

        /// This is intended to be a dictionary of functions, where the key is some
        ///     tilecode and the function contains logic to display the tile onto the screen.
        /// see also this.paint() and this.changePaintbrush().
        this.palette = {};
    }

    changePaintbrush(newTile) {
        /// Sets the value of this.paintbrushTile
        /// changePaintbrush: tileCode (see this.isValidTileCode) -> void
        /// time: O(1)
        /// effects: modifies this.paintbrushTile.
    
        if (!this.isValidTileCode(newTile))
            throw new TypeError("this.changePaintbrush was not given a valid tileCode.");
    
        this.paintbrushTile = newTile;
    }
    
    paint(coordX, coordY) {
        /// Modifies the this.actorsGrid and places a new DOM Node
        ///   at the coordinates specified at (coordX, coordY)
        /// paint: int int -> void
        /// requires: 0 <= coordX, coordY < this.tilesPerSide

        this.palette[this.paintbrushTile](coordX, coordY);
    }

    incrementTile(tileCode) {
        /// Increases the count of the specified tileCode by 1.
        /// incrementTile : tileCode (see this.isValidTileCode) -> void
        /// time: O(1)
        /// effects: modifies this.tileCount[tileCode]

        if (!this.isValidTileCode(tileCode))
            throw new TypeError("this.changePaintbrush was not given a valid tileCode.");

        this.tileCount[tileCode] += 1;
    }

    decrementTile(tileCode) {
        /// Decreases the count of the specified tileCode by 1.
        /// decrementTile : tileCode (see this.isValidTileCode) -> void
        /// time: O(1)
        /// effects: modifies this.tileCount[tileCode]

        if (!this.isValidTileCode(tileCode))
            throw new TypeError("this.changePaintbrush was not given a valid tileCode.");

        this.tileCount[tileCode] -= 1;
    }
}

