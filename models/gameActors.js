function MakeNode()
{
    /// Constructor for a DOM Node representing a generic tile on the board.

    var newNode = document.createElement("div");
    grid.appendChild(newNode);
    return newNode;
}