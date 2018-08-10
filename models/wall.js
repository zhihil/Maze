//////////////////////////////////////////////////////////////////////
///
/// wall.js
///
/// Provides a model for a wall tile.
///
//////////////////////////////////////////////////////////////////////

function Wall(x, y) {
    /// Constructor for the a Wall game actor.

    /// Create the DOM Node
    this.node = GameActor();
    let $node = $(this.node);
    $node.attr("id", "wall")
        .css("z-index", "10")
}