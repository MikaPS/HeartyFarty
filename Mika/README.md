# Scene Flow Prototype Requirements
## Non-interactive cinematic 
1. Flash screen - fades in and fades out without user input. <br>
2. Introduction - a short animation that shows the player the background of the game. The orb splitting into two also splits the screen into two. <br>
3. Ending - another short animation that will show at the end of the game. The orb is fixed, so the screens merge into 1. <br><br>

## Interactive cinematic 
1. Main menu - doesn't switch to the next scene until the player presses play. To show the player that the game is not stuck, the orbs move around the title. Pressing 'play' moves the orbs off screen and moves to the next scene. <br><br>

## Choreography in code
1. Our source code is based on tween chains that will execute onComplete functions and onward. <br><br>