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
        /// Generate a 2D array of fog objects.
        this.fog = new Array(sideLength);

        for (let y = 0; y < sideLength; ++y) {
            this.fog[y] = new Array(sideLength);

            for (let x = 0; x < sideLength; ++x) {
                this.fog[y][x] = new GameActor("fog", 0);
                $(this.fog[y][x]).attr("class", "tile")
                                 .attr("id", "fog");

            }
        }

    }
}