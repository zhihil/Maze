//////////////////////////////////////////////////////////////////////
///
/// mainController.js
///
/// Detects user input for mazemaster.html and passes it into the relevant
///   Models to handle the information.
///
//////////////////////////////////////////////////////////////////////

////////////////////// SETTING UP MODELS //////////////////////

/// Add the associated models.
let mazemasterModel = new MazemasterModel();
mazemasterModel.node = $("#grid")[0];

mazemasterModel.palette['P'] = function(coordX, coordY) {
    /// Adds a Player to this.actorsGrid and attaches its DOM Node
    ///     to grid. 
    /// mazemasterModel.palette["P"] : int int -> void
    /// requires: 0 <= coordX, coordY < this.tilesPerSide

    if (this.tileCount['P'] === 0 && this.getNodeReference(coordX, coordY) === null)
    {
        this.addActor('P', coordX, coordY);
        this.player = new PlayerModel("Theseus");
        $(this.player.node).css("left", (50 * coordX) + "px")
                           .css("top", (50 * coordY) + "px")
                           .css("z-index", 10)
                           .appendTo("#grid");
        this.addNodeReference(this.player.node, coordX, coordY);
        this.incrementTile(this.paintbrushTile);
    }
}.bind(mazemasterModel);

mazemasterModel.palette['W'] = function(coordX, coordY) {
    /// Adds a Wall to this.actorsGrid and attaches its DOM Node
    ///     to grid. 
    /// mazemasterModel.palette["W"] : int int -> void
    /// requires: 0 <= coordX, coordY < this.tilesPerSide

    if (this.getNodeReference(coordX, coordY) === null)
    {
        this.addActor('W', coordX, coordY);
        let newWall = new Wall(coordX, coordY);
        $(newWall.node).css("left", (50 * coordX) + "px")
                            .css("top", (50 * coordY) + "px")
                            .appendTo("#grid");
        this.addNodeReference(newWall.node, coordX, coordY);
        this.incrementTile(this.paintbrushTile);
    }
}.bind(mazemasterModel);

mazemasterModel.palette['M'] = function(coordX, coordY) {
    /// Adds a Minotaur to this.actorsGrid and attaches it DOM
    ///     Node to grid. 
    /// mazemasterModel.palette["M"] : int int -> void
    /// requires: 0 <= coordX, coordY < this.tilesPerSide

    if (this.tileCount['M'] === 0 && this.getNodeReference(coordX, coordY) === null)
    {
        this.addActor("M", coordX, coordY);
        this.monster = new MinotaurModel("Moo-moo");
        $(this.monster.node).css("left", (50 * coordX) + "px")
                            .css("top", (50 * coordY) + "px")
                            .css("z-index", 10)
                            .appendTo("#grid");
        this.addNodeReference(this.monster.node, coordX, coordY);
        this.incrementTile(this.paintbrushTile);
    }
}.bind(mazemasterModel);

mazemasterModel.palette['N'] = function(coordX, coordY) {
    /// Erases the tile at the specified coordinates (coordX, coordY)
    /// mazemasterModel.palette["N"] : int int -> void
    /// requires: 0 <= coordX, coordY < this.tilesPerSide

    if (this.getNodeReference(coordX, coordY) !== null)
    {
        $(this.getNodeReference(coordX, coordY)).remove();
        this.decrementTile(this.getActor(coordX, coordY));
        this.removeNodeReference(coordX, coordY);
        this.removeActor(coordX, coordY);
    }
}.bind(mazemasterModel);


////////////////////// DISPLAYING ELEMENTS //////////////////////

/// Create the checkboard pattern.
makeCheckerBoard();

/// Remove any existing tiles on the board.
mazemasterModel.resetActorsGrid();


////////////////////// EVENT LISTENERS //////////////////////

$("#grid").on("click", function(event) {
    let coord = mazemasterModel.getCoordinates(event.clientX, event.clientY);
    mazemasterModel.paint(coord.x, coord.y);
})

$("#playerButton").on("click", function() {
    mazemasterModel.changePaintbrush("P");
})

$("#wallButton").on("click", function() {
    mazemasterModel.changePaintbrush("W");
})

$("#minotaurButton").on("click", function() {
    mazemasterModel.changePaintbrush("M");
})

$("#fleeceButton").on("click", function() {
    mazemasterModel.changePaintbrush("T");
})

$("#eraseButton").on("click", function() {
    mazemasterModel.changePaintbrush('N');
})

$("#saveButton").on("click", function() {
    localStorage["mazeSavedCustomMap"] = JSON.stringify(mazemasterModel.actorsGrid);
})