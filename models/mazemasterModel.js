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

        this.palette = {};
    }

    changePaintbrush(newTile) {
        /// Sets the value of this.paintbrushTile
        /// changePaintbrush: tileCode -> void
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
}

