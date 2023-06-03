# Scene Flow Prototype Requirements
## Audio 
1. Looping background sound:  <br>
2. Sound effect: <br><br>

## Visual 
1. Image-based assets (sprites). For example, player, background, wall, on-screen controllers. <br>
2. Vector-graphics. Used to draw boundries around the barriers in level 2. Found in intro class.<br><br>

## Motion
1. Our game uses dynamic, physics motion to move the character around the screen. We set the velocity of the player based on the direction the player chooses. <br><br>

## Progression
We use levels to show progression of the game. As the game progress, the levels are getting more difficult and introducing more mechanics. <br> 
1. Level1 - get the player used to feel of the game.<br>
2. Level2 - forces the player to move both in the past and in the present to pass the level.<br>
3. Level3 - introduces water powers. <br><br>

## Prefabs
1. Scene subclass that holds common Tween animations and scene transitions. It simplifies our code as we can call the created functions. <br>
2. Gameobject subclass for the Water prefab. Using the water power summons 3 identical water sprites, so to simplify the process, as they all share common code. <br>