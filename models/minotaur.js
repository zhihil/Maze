//////////////////////////////////////////////////////////////////////
///
/// minotaur.js
///
/// Models the Minotaur, the big monster of the game. Handles movement,
///   player tracking, health, attack, and respawn.
///
//////////////////////////////////////////////////////////////////////

class MinotaurModel extends AnimateObject {
    constructor(name) {
        super(name, 2, 1);

        $(this.node).attr("id", "minotaur")
                    .attr("z-index", "10");
    }
}