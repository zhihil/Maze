//////////////////////////////////////////////////////////////////////
///
/// treasure.js
///
/// Provides a model for a treasure tile. 
///
//////////////////////////////////////////////////////////////////////

class TreasureModel extends GameActor {
    constructor(name) {
        super(name, 9001);
        
        $(this.node).attr("id", "treasure")
                    .css("z-index", "10");
    }
}