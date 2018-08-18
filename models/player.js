//////////////////////////////////////////////////////////////////////
///
/// player.js
///
/// Manages the data and logic of a Player tile.
///
//////////////////////////////////////////////////////////////////////

class PlayerModel extends AnimateObject {
    constructor(name) {
        super(name, 3, 1);

        $(this.node).attr("id", "player")
                    .css("z-index", "10");
    }
}

