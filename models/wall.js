//////////////////////////////////////////////////////////////////////
///
/// wall.js
///
/// Provides a model for a wall tile.
///
//////////////////////////////////////////////////////////////////////

class Wall extends GameActor {
    constructor(name) {
        super(name);
        
        $(this.node).attr("id", "wall")
                    .css("z-index", "10");
    }
}