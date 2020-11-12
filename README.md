This is my platform game. PLAY IT HERE: https://haroldsoftware.github.io/platformGame_2D/

The languages used to build this game are static JavaScript, HTML, and CSS. 

The player is a walrus that needs to jump on platforms up to the star.

If the player gets to the star, they win.

--------------------------------------------------------------------------------

This uses collision detection on the canvas element. Since canvas has an x and
y position for each object, if two objects have vectors equal to zero, then
those objects collided. However, this would check for center collision. To check
for side collision the widths and heights must be added into the vectors.

My graphics rely on using the methods rect() and clearRect() from canvas.
These draw 2-D rectangles on the screen. Separate objects are given the same
corresponding coordinates and drawn on the canvas with drawImage, which are
then checked for collisions.

Checking if the player and an object collide uses a loop that goes over all
of the existing objects. This seems like an inefficient way to do collision
detection but it works with a program this size, however, this is a common method.

Moving enemies were removed from the game. Objects coordinates are updated each
animation frame, which is about 1 milli second.
--------------------------------------------------------------------------------

To make this game better, more moving platforms could be added. Adding circular or
elliptical movement to enemy objects would make this harder and more
interesting. Adding new features in general is the next stage. For instance,
jumping on top of an enemy (having a bottom collision) could beat the enemy.
Another aspect is graphics. Using symbols that are mapped to image objects seems
like a good way to deploy artistic effects. This is related to sprite animations
or adding the appearance of movement to a player or object. Instead of doing a
reload when the player wins or loses, there should be a menu that prompts the
user if they want to continue or quit. Perhaps adding a score for each round
won or lost would be nice. There can be a few tweaks on the movement controls
like reversing direction when a right or left collision occurs. This would
make the game more "bouncy" and fun. 
