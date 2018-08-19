//////////////////////////////////////////////////////////////////////
///
/// animateObject.js
///
/// Defines the animateObject class, which are game tiles which 
///     represent animate objects.
///
//////////////////////////////////////////////////////////////////////

class AnimateObject extends GameActor {
    constructor(name, health, attack) {
        super(name, health);

        this.attack = attack;
    }
}