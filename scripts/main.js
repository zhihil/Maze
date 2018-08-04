//////////////////////// Instantiate Basic Elements ////////////////////////

var grid = document.getElementById("grid");
for (var x = 0; x < 1000 / 50; ++x)
{
    for (var y = 0; y < 1000 / 50; ++y)
    {
        var id = "debugTileA";
        if ((x + y) % 2 == 0) id = "debugTileB";
        debugTile(x, y, id);
    }
}
var player = Player();

//////////////////////// Monster Roar ////////////////////////

var audioPlayer = document.createElement("audio");
audioPlayer.src = "minotaurroar.wav";
audioPlayer.autoplay = true;
document.body.appendChild(audioPlayer);


//////////////////////// Grid properties ////////////////////////

let gridLength  = grid.getBoundingClientRect().width;
let tileLength  = player.getBoundingClientRect().width;


//////////////////////// Player Model ////////////////////////

var playerModel = {
    node: player
};

playerModel.getPosition = function() {
    /// Gets the player's position in terms of coordinates on #grid
    /// getPosition : void -> { int, int }

    var rect = player.getBoundingClientRect();
    return getCoordinates(rect.left, rect.top);
}

playerModel.isValidMove = function(targetX, targetY) {
    /// Determines if the target position (targetX, targetY) is a valid
    ///   place to go to, based on the player's current position.
    /// isValidMove : int int -> bool
    /// requires: maxX >= targetX >= 0, maxY >= targetY >= 0

    var playerPos = this.getPosition();
    var diffX = targetX - playerPos.x;
    var diffY = targetY - playerPos.y;
    if (Math.abs(diffX) == 1 && diffY == 0)
        return true;
    else if (diffX == 0 && Math.abs(diffY) == 1)
        return true;
    return false;
}

//////////////////////// Player Movement ////////////////////////

function getCoordinates(posX, posY){
    /// Given the absolute position (posX, posY) in pixels, calculate the
    ///   the coordinates of the position relative to #grid's origin (top-left corner)
    /// getCoordinates: float float -> {int, int}
    /// requires: posX >= xGridOffset, posY >= yGridOffset

    let rect = grid.getBoundingClientRect();
    let xGridOffset = rect.left;
    let yGridOffset = rect.top;

    console.log("Offsets: { " + xGridOffset + ", " + yGridOffset + " }");

    return {
        x : Math.floor((posX - xGridOffset) / tileLength),
        y : Math.floor((posY - yGridOffset) / tileLength)
    }
}

function getMoveVector(endVector, startVector) {
    /// Calculates the difference vector between endVector and startVector.
    /// getMoveVector: [int, int] [int, int] -> [int, int]

    if (endVector.length != startVector.length)
        return Error("getMoveVector() was given two vectors of unmatching length.");
    var diffVector = new Array(endVector.length);
    for (var i = 0; i < endVector.length; ++i)
    {
        diffVector[i] = endVector[i] - startVector[i];
    }
    return diffVector;
}

$("#grid").on("click", function(event) {
    var target = getCoordinates(event.clientX, event.clientY);
    var playerPos = playerModel.getPosition();
    if (playerModel.isValidMove(target.x, target.y))
    {
        var diff = getMoveVector([target.x, target.y], [playerPos.x, playerPos.y]);
        player.style.left = parseFloat(player.style.left) + (50 * diff[0]) + "px";
        player.style.top  = parseFloat(player.style.top) + (50 * diff[1]) + "px";
    }
})
