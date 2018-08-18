//////////////////////////////////////////////////////////////////////
///
/// player.js
///
/// Manages the data and logic of a Player tile.
///
//////////////////////////////////////////////////////////////////////

class PlayerModel extends GameActor {
    constructor(name) {
        super(name);

        $(this.node).attr("id", "player")
                    .css("z-index", "10");
    }
}

