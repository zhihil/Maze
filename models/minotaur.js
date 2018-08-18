//////////////////////////////////////////////////////////////////////
///
/// minotaur.js
///
/// Models the Minotaur, the big monster of the game. Handles movement,
///   player tracking, health, attack, and respawn.
///
//////////////////////////////////////////////////////////////////////

class MonsterModel extends GameActor {
    constructor(name) {
        super(name, 2);

        $(this.node).attr("id", "monster")
                    .attr("z-index", "10");
    }
}