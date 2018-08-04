//////////////////////// Player Movement ////////////////////////

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
