//----------------------------------------------------------------------------//
//-------------------------------CANVAS---------------------------------------//
//----------------------------------------------------------------------------//

let canvas = document.getElementById("canvas")
context = canvas.getContext("2d");
width = 2000;
height = 1000;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//-----------------------------BACKGROUND IMAGE-------------------------------//
//----------------------------------------------------------------------------//

document.body.style.backgroundImage = "url(images/backgroundImg.jpg)";
document.body.style.backgroundSize = "1000px 1000px";
document.body.style.backgroundSize = 'cover';

(function () {
    let requestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//----------------------------GRAVITY + FRICTION------------------------------//
//----------------------------------------------------------------------------//

const friction = 0.7;
const gravity = 0.25;
//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//----------------------------PLAYER OBJECT-----------------------------------//
//----------------------------------------------------------------------------//

let player = {
  x: width - 100,
  y: height - 15,
  width: 50,
  height: 50,
  speed: 5,
  velocity_X: 0,
  velocity_Y: 0,

  jumping: false,
  grounded: false
};

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//-------------------------------STAR OBJECT----------------------------------//
//----------------------------------------------------------------------------//

let winningStar = {
  x: 110,
  y: 95,
  width: 100,
  height: 100
}

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//------------------------LION OBJECTS AND FIREBALL---------------------------//
//----------------------------------------------------------------------------//

let rocketObj1 = {
  x: 200,
  y: 900,
  width: 75,
  height: 75
}

let eagleObj2 = {
  x: 600,
  y: 900,
  width: 50,
  height: 50
}

let fireObj3 = {
  x: 700,
  y: 900,
  width: 41,
  height: 41
}

let fireBall = {
  x: 600,
  y: 800,
  width: 50,
  height: 50
}

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//-------------------------------STAR OBJECT----------------------------------//
//----------------------------------------------------------------------------//

star = {
  x: width - 300,
  y: height - 700,
  width: 100,
  height: 100,
  touched: false
};

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//------------------------------KEYS ARRAY------------------------------------//
//----------------------------------------------------------------------------//

keys = [];

//----------------------------------------------------------------------------//

//============================================================================//
//================================PLATFORMS===================================//
//============================================================================//

let platforms = [];

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//------------------------------LEFT BOUND------------------------------------//
//----------------------------------------------------------------------------//

platforms.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//------------------------------TOP BOUND-------------------------------------//
//----------------------------------------------------------------------------//

platforms.push({
    x: 0,
    y: 0,
    width: width,
    height: 10
});
//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//------------------------------RIGHT BOUND-----------------------------------//
//----------------------------------------------------------------------------//

platforms.push({
    x: width -10,
    y: 0,
    width: 50,
    height: height
});
//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//------------------------------BOTTOM BOUND----------------------------------//
//----------------------------------------------------------------------------//

platforms.push({
    x: 0,
    y: height - 10,
    width: width,
    height: 50
});

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//-------------------------------PLATFORMS------------------------------------//
//----------------------------------------------------------------------------//

platforms.push({
    x: 1500,
    y: 900,
    width: 120,
    height: 40
});
platforms.push({
    x: 1300,
    y: 800,
    width: 120,
    height: 40
});
platforms.push({
    x: 1100,
    y: 700,
    width: 120,
    height: 40
});
platforms.push({
    x: 900,
    y: 600,
    width: 120,
    height: 40
});
platforms.push({
    x: 700,
    y: 500,
    width: 120,
    height: 40
});
platforms.push({
    x: 500,
    y: 400,
    width: 120,
    height: 40
});
platforms.push({
    x: 300,
    y: 300,
    width: 120,
    height: 40
});
platforms.push({
    x: 100,
    y: 200,
    width: 120,
    height: 40
});

platforms.push({
    x: 850,
    y: 700,
    width: 40,
    height: 120
});

//----------------------------------------------------------------------------//

//============================================================================//
//============================================================================//
//-----------------------------MOVEMENT FUNCTION------------------------------//
//============================================================================//
//============================================================================//


function movementFunc() {

//--------------------------------JUMPING-------------------------------------//

    if (keys[38] || keys[32] || keys[87]) {
        if ((player.jumping) == false && (player.grounded == true) ) {
          player.jumping = true;
          player.grounded = false;
          // USE NEGATIVE VALUE TO MOVE UP ON CANVAS
          player.velocity_Y = -(player.speed * 2);
        }
    }

//-------------------------------MOVE RIGHT-----------------------------------//

    if (keys[39] || keys[68]) {
        if (player.velocity_X < player.speed) {
          player.velocity_X++;
        }
    }

//-------------------------------MOVE LEFT------------------------------------//

    if (keys[37] || keys[65]) {
        if ( player.velocity_X > -(player.speed) ) {
          // USE NEGATIVE VALUE TO MOVE LEFT ON CANVAS
          player.velocity_X--;
        }
    }

//----------------------------------------------------------------------------//
//---------------REALISM EFFECTS OF GRAVITY AND FRICTION----------------------//
//---------------------X VELOCITY WILL APPROACH 0-----------------------------//
//--------------Y VELOCITY WILL GO DOWN WITH POSITIVE VALUES------------------//
//----------------------------------------------------------------------------//

    player.velocity_X *= friction;
    player.velocity_Y += gravity;

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//-------------------------GROUNDED STOPS ALL Y MOVEMENT----------------------//
//----------------------------------------------------------------------------//

    if (player.grounded == true) {
         player.velocity_Y = 0;
    }

//----------------------------------------------------------------------------//
//-------------------------UPDATE X AND Y POSITION----------------------------//
//--------------------------EACH ANIMATION FRAME------------------------------//
//----------------------------------------------------------------------------//

    player.x += player.velocity_X;
    player.y += player.velocity_Y;

//----------------------------------------------------------------------------//
//-------------------DELETE OLD FRAMES WITH CLEAR RECT ()---------------------//
//-----------------------------AND BEGIN PATH ()------------------------------//
//----------------------------------------------------------------------------//

    context.clearRect(0, 0, width, height);
    context.fillStyle = "Aquamarine";

    context.beginPath();

//----------------------------------------------------------------------------//
//---------------------PREVENT WALKING OFF PLATFORMS--------------------------//
//----------------------------------------------------------------------------//

    player.grounded = false;

//----------------------------------------------------------------------------//
//--------------------LOOP FOR COLLISIONS ON EACH PLATFORM--------------------//
//----------------------------------------------------------------------------//

    for (let i = 0; i < platforms.length; i++) {
        context.rect(platforms[i].x,
          platforms[i].y,
          platforms[i].width,
          platforms[i].height);

        let direction = collisionCheck(player, platforms[i]);

        if (direction === "left" || direction === "right") {
            // STOP VELOCITYX IF COLLISION LEFT OR RIGHT
            player.velocity_X = 0;
            player.jumping = false;
        }
        else if (direction === "bottom") {
            // IF BOTTOM COLLISION GO BACK TO GROUNDED
            player.grounded = true;
            player.jumping = false;
        }
        else if (direction === "top") {
            // PLAYER HIT HEAD BY JUMPING
            // SWITCH VELOCITYY IF TOP COLLISION
            player.velocity_Y *= -1;
        }

    }

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//-------------------------HOW TO WIN AND HOW TO LOSE-------------------------//
//----------------------------------------------------------------------------//

    let winningCondition = collisionCheck(player, winningStar);

    if (winningCondition == "left" || winningCondition == "right" ||
      winningCondition == "top" || winningCondition == "bottom") {
      alert("YOU WIN! --- press enter to RESTART");
      // throw new Error(); is one way to end the program
      location.reload(); // reload is better though
    }

    let lionOneDeath = collisionCheck(player, rocketObj1);
    let lionTwoDeath = collisionCheck(player, eagleObj2);
    let lionThreeDeath = collisionCheck(player, fireObj3);
    let fireBallCollision = collisionCheck(player, fireBall);

    if (lionOneDeath == "left" || lionOneDeath == "right" ||
      lionOneDeath == "top" || lionOneDeath == "bottom") {
      alert("YOU LOSE! --- press enter to RESTART");
      location.reload();
    }
    if (lionTwoDeath == "left" || lionTwoDeath == "right" ||
      lionTwoDeath == "top" || lionTwoDeath == "bottom") {
      alert("YOU LOSE! --- press enter to RESTART");
      location.reload();
    }
    if (lionThreeDeath == "left" || lionThreeDeath == "right" ||
      lionThreeDeath == "top" || lionThreeDeath == "bottom") {
      alert("YOU LOSE! --- press enter to RESTART");
      location.reload();
    }
    if (fireBallCollision == "left" || fireBallCollision == "right" ||
      fireBallCollision == "top" || fireBallCollision == "bottom") {
      alert("YOU LOSE! --- press enter to RESTART");
      location.reload();
      // throw new Error();
    }

//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//--------------------DRAW THE PLAYER AND OBJECTS-----------------------------//
//----------------------------------------------------------------------------//

    context.fill();

    // THIS WILL DRAW A BASIC RECTANGLE

    // context.fillStyle = "gold";
    // context.fillRect(player.x,
    //   player.y,
    //   player.width,
    //   player.height);

    let playerImg = new Image();
    playerImg.src = "images/walrus.svg";
    context.drawImage(playerImg,
      player.x,
      player.y,
      player.width,
      player.height);

//----------------------------------------------------------------------------//

    let winningTouch = new Image();
    winningTouch.src = "images/star.svg";
    context.drawImage(winningTouch, 110, 95, 100, 100);

    let rocket1 = new Image();
    rocket1.src = "images/rocket.png";
    context.drawImage(rocket1, rocketObj1.x, rocketObj1.y, fireBall.width, fireBall.height);

    let eagle2 = new Image();
    eagle2.src = "images/eagle.svg";
    context.drawImage(eagle2, 600, 900, 75, 75);

    let fireBall3 = new Image();
    fireBall3.src = "images/betterFire.svg";
    context.drawImage(fireBall3, fireObj3.x, fireObj3.y, fireBall.width, fireBall.height);

//----------------------------------------------------------------------------//
//-------------------------MAKE LION ONE MOVE---------------------------------//
//----------------------------------------------------------------------------//

    let lionOnevelocity_Y = 15;

    if (rocketObj1.y == 105)
    {
      rocketObj1.y = 900;
    }

    rocketObj1.y -= lionOnevelocity_Y;


//----------------------------------------------------------------------------//


//----------------------------------------------------------------------------//
//-------------------------MAKE FIREBALL MOVE---------------------------------//
//----------------------------------------------------------------------------//

    let fireBallImg = new Image();
    fireBallImg.src = "images/betterFire.svg";
    context.drawImage(fireBallImg,
      fireBall.x, fireBall.y,
      fireBall.width,
      fireBall.height);

    let fireBallvelocity_Y = 5;

    if (fireBall.y == 250)
    {
      fireBall.y = 800;
    }

    fireBall.y -= fireBallvelocity_Y;


//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//------------------------MAKE FIREBALL THREE MOVE----------------------------//
//----------------------------------------------------------------------------//

  let lionThreevelocity_X = 5;

  if (fireObj3.x == 1400) {
    fireObj3.x = 700;
  }

  fireObj3.x += lionThreevelocity_X;

// CIRCULAR MOVEMENT LOGIC
// NEEDS REPAIR TO WORK


// let angle = Math.PI / 2;
// function animate(time, lastTime) {
//   if (lastTime != null) {
//     angle += (time - lastTime) * 0.001;
//   }
//   fireObj3.y = (Math.sin(angle) * 20) + "px";
//   fireObj3.x = (Math.cos(angle) * 200) + "px";
//   requestAnimationFrame(newTime => animate(newTime, time));
// }
// requestAnimationFrame(animate);

//----------------------------------------------------------------------------//
//------------------------MAKE PLATFORM MOVE----------------------------------//
//----------------------------------------------------------------------------//

  let lastPlatform = platforms.length - 1;
  let platformVelocity = 2;

  platforms[lastPlatform].y -= platformVelocity;

  if (platforms[lastPlatform].y == 300) {
     platforms[lastPlatform].y = 700;
   }


//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//---------------------------REQUEST ANIMATION FRAME--------------------------//
//----------------------------------------------------------------------------//

  requestAnimationFrame(movementFunc);

} // end movementFunc

//============================================================================//
//=========================END MOVEMENT FUNCTION==============================//
//============================================================================//

//============================================================================//
//============================================================================//
//===========================COLLISION DETECTION==============================//
//============================================================================//
//============================================================================//

//----------------------------------------------------------------------------//
//----------------------------X AND Y VECTORS---------------------------------//
//----------------------------------------------------------------------------//

function collisionCheck(playerObj, inanimateObj) {
    // get the vectors to check against
    // use Half Widths and Half Heights to get the center of each shape
    let X_Vector = (playerObj.x + (playerObj.width / 2)) -
      (inanimateObj.x + (inanimateObj.width / 2));

    let Y_Vector = (playerObj.y + (playerObj.height / 2)) -
      (inanimateObj.y + (inanimateObj.height / 2));

//----------------------------------------------------------------------------//
//----------------------HALF WIDTH AND HALF HEIGHT----------------------------//
//----------------------------------------------------------------------------//

    let halfWidths = (playerObj.width / 2) + (inanimateObj.width / 2);
    let halfHeights = (playerObj.height / 2) + (inanimateObj.height / 2);
    let directionection = null;

//----------------------------------------------------------------------------//
//---------If X AND Y VECTORS ARE LESS THAN HALF WIDTH OR HALF HEIGHT---------//
//----------------THEN THE OBJECTS MUST BE COLLIDING--------------------------//
//---------SINCE THE DISTANCE BETWEEN OBJECTS CANNOT BE LESS------------------//
//--------------------THAN THEIR HALF WIDTHS OR HEIGHTS-----------------------//
//----------------------------------------------------------------------------//

// HALF WIDTH MINUS X VECTOR --> OFFSET_VECTOR_X
// HALF HEIGHT MINUS Y VECTOR --> OFFSET_VECTOR_Y
// IN OTHER WORDS ---->
// THE OFFSET VECTORS ARE THE X AND Y DISTANCES LEFT OVER
// FROM A COLLISION

// THUS ---->
// IF THERE IS MORE X LEFT OVER --> IT COLLIDED ON TOP OR BOTTOM
// IF THERE IS MORE Y LEFT OVER --> IT COLLIDED ON THE RIGHT OR LEFT


    if ( (Math.abs(X_Vector) < halfWidths) && (Math.abs(Y_Vector) < halfHeights) ) {

        let offset_X = halfWidths - Math.abs(X_Vector);
        let offset_Y = halfHeights - Math.abs(Y_Vector);

        // IF Y OFFSET VECTOR IS LESS THAN X OFFSET VECTOR
        if (offset_X >= offset_Y) {

          // IF Y VECTOR IS POSITIVE WITH RESPECT TO THE PLAYER
          // COLLISION IS ON TOP
            if (Y_Vector > 0) {
                directionection = "top";
                playerObj.y += offset_Y;
            }
            // IF Y VECTOR IS NEGATIVE WITH RESPECT TO THE PLAYER
            // COLLISION IF ON BOTTOM
            else {
                directionection = "bottom";
                playerObj.y -= offset_Y;
            }
        }
        // IF X OFFSET IS LESS THAN Y OFFSET

        else {
            // IF X VECTOR IS POSITIVE WITH RESPECT TO THE PLAYER
            // COLLISION IS ON LEFT
            if (X_Vector > 0) {
                directionection = "left";
                playerObj.x += offset_X;
            }
            else {
            // IF X VECTOR IS NEGATIVE WITH RESPECT TO THE PLAYER
            // COLLISION IS ON LEFT
                directionection = "right";
                playerObj.x -= offset_X;
            }
        }
    }

    return directionection;

} //  end collisionCheck

//============================================================================//
//=========================END COLLISION DETECTION============================//
//============================================================================//

//----------------------------------------------------------------------------//
//------------------------------EVENT LISTENERS-------------------------------//
//----------------------------------------------------------------------------//


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    movementFunc();
});

//----------------------------------------------------------------------------//




















// end all
