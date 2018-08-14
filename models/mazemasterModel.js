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

        this.palette['P'] = function(coordX, coordY) {
            /// Adds a Player to this.actorsGrid and attaches its DOM Node
            ///     to grid. Assumes that player.node == Player() already exists.
            /// anon: int int -> void
            /// requires: 0 <= coordX, coordY < this.tilesPerSide
        
            if (this.tileCount['P'] === 0 && this.canvas[coordY][coordX] === null)
            {
                this.addActor('P', coordX, coordY);
                this.player = new PlayerModel("Theseus");
                $(this.player.node).css("left", (50 * coordX) + "px")
                                   .css("top", (50 * coordY) + "px")
                                   .css("z-index", 10)
                                   .appendTo("#grid");
                                   this.canvas[coordY][coordX] = player.node;
                this.tileCount[this.paintbrushTile] += 1;
            }
        }.bind(this);

        this.palette['W'] = function(coordX, coordY) {
            /// Adds a Wall to this.actorsGrid and attaches its DOM Node
            ///     to grid. Assumes that player.node == Player() already
            ///     exists.
            /// anon : int int -> void
            /// requires: 0 <= coordX, coordY < this.tilesPerSide
        
            if (this.canvas[coordY][coordX] === null)
            {
                this.addActor('W', coordX, coordY);
                let newWall = new Wall(coordX, coordY);
                this.addNode(newWall.node, coordX, coordY);
                this.canvas[coordY][coordX] = newWall.node;
                this.tileCount[this.paintbrushTile] += 1;
            }
        }.bind(this);

        this.palette['N'] = function(coordX, coordY) {
            if (this.canvas[coordY][coordX] !== null)
            {
                $(this.canvas[coordY][coordX]).remove();
                this.tileCount[this.getActor(coordX, coordY)] -= 1;
                this.canvas[coordY][coordX] = null;
                this.removeActor(coordX, coordY);
            }
        }.bind(this);
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

