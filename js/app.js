/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.y = getRandomInt(1, 3)*83;
    this.startTime = getRandomInt(1, 30)*80;
    this.wait = 0;
    this.speed = getRandomInt(200, 500);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Check if this enemy should move, if not update the wait parameter
    if (this.wait>this.startTime && this.x<700) {
      this.x  += this.speed*dt;
    }else {
      ++this.wait;
    }
    // Check if this bug and the player is on the same tile
    if (player.y === this.y && this.x >= player.x && this.x  <= (player.x+101)) {
      player.x = 2*101;
      player.y = 5*83;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    this.sprite = 'images/char-boy.png';
    // Position character in the middle of the bottom row.
    this.x = 2*101;
    this.y = 5*83;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {
  switch (arguments[0]) {
    case "left":
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case "right":
      if (this.x < 404) {
        this.x += 101;
      }
      break;
    case "up":
      if (this.y > 0) {
        this.y -= 83;
      }
      break;
    case "down":
      if (this.y < 415) {
        this.y += 83;
      }
      break;

    default:

  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numberOfEnemies = 100, allEnemies = [], newEnemy, player;

for (var i = 0; i < numberOfEnemies; i++) {
  newEnemy = new Enemy();
  allEnemies.push(newEnemy);
}
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
