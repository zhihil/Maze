//////////////////////////////////////////////////////////////////////
///
/// player.js
///
/// Provides a model for a wall tile.
///
//////////////////////////////////////////////////////////////////////

function Wall(x, y, src) {
    /// Constructor for the a Wall game actor.

    /// Create the DOM Node
    this.node = GameActor();
    var $node = $(this.node);
    $node.attr("id", "wall")
        .css("left", (50 * x) + "px")
        .css("top", (50 * y) + "px")
        .css("z-index", "10")
        .attr("src", src)
        .appendTo("#grid");
    
    /// Set the Wall's internal coordinates.
    this.x = x;
    this.y = y;

    /// Assign a reference to the gridModel
    gridModel.addActor('W', x, y);
}