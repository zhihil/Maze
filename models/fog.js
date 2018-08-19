//////////////////////////////////////////////////////////////////////
///
/// fog.js
///
/// Defines the FogModel object, which manages the "Fog of War" mechanic
///     in Maze.
///
//////////////////////////////////////////////////////////////////////

class FogModel {
    constructor(sideLength) {
        this.gridLength   = 1000;
        this.tileLength   = 50;
        this.tilesPerSide = this.gridLength / this.tileLength;

        this.lightSources = [];

        /// Generate a 2D array of fog objects.
        this.fogTiles = new Array(sideLength);

        for (let y = 0; y < sideLength; ++y) {
            this.fogTiles[y] = new Array(sideLength);

            for (let x = 0; x < sideLength; ++x) {
                this.fogTiles[y][x] = new FogTile();
            }
        }

    }

    shroud(coordinates) {
        /// Fills all tiles in fogTiles specified by coordinates with 
        ///     GameActor nodes.
        /// shroud: Arrayof({ x : int, y : int }) -> void
        /// time: O(n) : n is the length of coordinates
        /// effects: modifies this.fogTiles.

        for (let coord of coordinates) {
            if (this.fogTiles[coord.y][coord.x] === null) {
                this.fogTiles[coord.y][coord.x] = new FogTile();
            }
        }
    }

    reveal(coordinates) {
        /// Sets any tiles in fogTiles specified by coordinates to null.
        /// reveal: Arrayof({ x : int, y : int }) -> void
        /// time: O(n) : n is the length of coordinates
        /// effects: modifies this.fogTiles.

        for (let coord of coordinates) {
            if (this.fogTiles[coord.y][coord.x] !== null) {
                this.fogTiles[coord.y][coord.x] = null;
            }
        }
    }

    addLightSource(newSource) {
        /// Adds a new LightSource object to FogModel and dynamically updates
        ///     the .fogTiles grid.
        /// addLightSource : LightSource -> void
        /// requires: LightSource != null
        /// time : O(1)
        /// effects: modifies FogModel

        if (newSource === null) throw new Error("addLightSource was given null reference");
        if (newSource.x < 0 || newSource.x >= this.tilesPerSide)
            throw new Error("addLightSource was given an LightSource with x property out-of-range");
        if (newSource.y < 0 || newSource.y >= this.tilesPerSide)
            throw new Error("addLightSource was given an LightSource with y property out-of-range");

        this.lightSources.push(newSource);
        this.reveal(newSource.lightShape());

    }

    removeLightSource(id) {
        /// Removes the LightSource in FogModel with specified id. If there is more
        ///     than one LightSource with the same id, then the first one is removed.
        /// time : O(n) : n is the number of LightSources in FogModel
        /// effects: modifies FogModel.lightSources

        for (let i = 0; i < this.lightSources.length; ++i) {
            if (this.lightSources[i].id === id) {
                this.shroud(this.lightSources[i].lightShape());
                this.lightSources.splice(i, 1);
            }
        }
    }

    getLightSource(id) {
        /// Finds and returns a LightSource in FogModel by id.
        /// getLightSource : str -> LightSource
        /// time : O(n) : n is the number of LightSources in FogModel.
        
        for (let src of this.lightSources) {
            if (src.id === id) return src;
        }
        return null;
    }

    moveLightSource(id, newX, newY) {
        /// Finds a LightSource by id, then moves that LightSource to the 
        ///     position specified at (newX, newY)
        /// moveLightSource : str int int -> void
        /// requires: 0 <= newX, newY < this.tilesPerSide
        /// effects: modifies LightSource specified by id, and FogModel.fogTiles

        let src = this.getLightSource(id);
        this.shroud(src.lightShape());
        src.x = newX;
        src.y = newY;
        this.reveal(src.lightShape());
    }

}

class FogTile extends GameActor {
    constructor() {
        super("fog", 0);

        $(this.node).attr("id", "fog");
    }
}

class LightSource {
    constructor(id, x, y) {
        this.id = id;
        this.x  = x;
        this.y  = y;

        /// Default light shape.s
        this.lightShape = () => {
            let revealedTiles = [];
            for (let dx = -1; dx <= 1; ++dx) {
                for (let dy = -1; dy <= 1; ++dy) {
                    revealedTiles.push({
                        x : this.x + dx,
                        y : this.y + dy
                    })
                }
            }
            return revealedTiles;
        }
    }
}

