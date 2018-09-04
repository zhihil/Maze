# Maze

======================================== How to Play ========================================

- Open main.html to play the game.
    - Click the button to load a custom map from the browser's localStorage variable.
- Open mazemaster.html to make your own maps.
    - Click save and the map data will added to localStorage.
    - When you run main.html again, your custom map will be retrieved from local storage




======================================== Developer ========================================

==================== Chrome : List of Known Bugs ====================
- audio tag in main.html does not play the minotaur roar.

==================== Safari : List of Known Bugs ====================
- Clicking to move the Player tile is less responsive than in Chrome.

==================== TO-DO ====================
- Add some way to export maps created in MazeMaster and load it in main.html.
    - Maybe use some kind of backend? It might be impractical but it would be good practice.
- Create a Minotaur enemy.
    - Add Minotaur health.
    - Give players health.
    - Create a "Game Over" state when player health goes to 0.
    - Implement player attacks and minotaur attacks.
    - Implement Minotaur enemy movement.
        - Approach 1 : Plain Breadth-First Search.
        - Approach 2 : Every three turns, detect the player's current position. Then perform BFS on this position. This means there's a two turn lag before the Minotaur figures out your current position. This prevents a perfect AI that acquires your exact location.
        - Approach 3 : Implement "Torch" and "Darkness" gameplay mechanics. The entire map is shrouded in Darkness, but the Player has a Torch that allows them to see in a small region around them. While the Torch is active, the Minotaur will apply Approach 2. If the Torch is inactive, the Minotaur will finish path to the player's last known position, afterwards, it will follow a patrol path algorithm (TBD)
            - Gameplay challenge for the player : the Minotaur gives some kind of visual indicator when they acquire the player's position and perform BFS. So the only way the Player can pinpoint the location of the Minotaur is by putting themselves at risk with the torch. The Minotaur, when it detects the player will attack the player in the dark. 
            - Skill : Players test their memorization skills. Maps are shrouded in darkness, so the Players needs to use the Torch to reveal the map. However, if they have memorized the map, they can proceed without a torch, which may minimize the risk of bumping into the Minotaur.
- Create a Golden Fleece treasure object.
    - Minotaur will automatically acquire the Player if they've pick the Golden Fleece.
    - Create an Exit which the Player should move to, once they get the Fleece.
- Create Health Potions distributed across the maze. 
