//////////////////////////////////////////////////////////////////////
///
/// gameActors.js
///
/// Defines the GameActor object, which is a parent class for all
///     game pieces in Maze.
///
//////////////////////////////////////////////////////////////////////

function GameActor()
{
    /// Constructor for a DOM Node representing a generic tile.

    var newNode = document.createElement("div");
    newNode.className = "tile";
    return newNode;
}