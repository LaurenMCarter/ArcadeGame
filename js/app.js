// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
    this.speed = 200;
};


Enemy.prototype.update = function(dt) {
//Thank you Lloan for this 
    if (this.x > ctx.canvas.width + this.width){
        this.x = -300 * Math.floor(Math.random() * 4) + 1;
    }   else {
        this.x += this.speed * dt;
    }
    
    //Adapted from the MDN web docs https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (player.x < this.x + this.width-35 &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.y + player.height > this.y) {
            this.collision = true;
            player.reset(202, 402);
        }
    };

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 65;
    this.positionX = 2;
    this.positionY = 5;
}

Player.prototype.update = function(dt){
    if (this.y <= -13 && this.positionY === 0){
        this.winGame();
    }    
}; 

//Show 'win' popup
Player.prototype.winGame = function(){
        window.alert("You win! Play again?");
        this.reset(202, 402);
};

//Resets player to start position.
Player.prototype.reset = function(x, y){
    this.x = x;
    this.y = y;
    this.positionX = 2;
    this.positionY = 5;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Handle user input to move character and keep character in bounds.
Player.prototype.handleInput = function(direction){
    switch(direction) {
        case 'left':
            if (this.positionX > 0) {
                this.x -= 100;
                this.positionX--;
            }
            break;
        case 'right':
            if (this.positionX < 4){
                this.x += 100;
                this.positionX ++;
            } 
            break;
        case 'down':
            if (this.positionY < 5){
                this.y += 83;
                this.positionY ++;
                }
            break;
        case 'up':
            if (this.positionY > 0){
                this.y -= 83;
                this.positionY --;
            }
            break;
    };
}

//Handles user input for player movement
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const enemyPosition = [55, 140, 230];

const player = new Player(202, 402);

//Provided by Lloan. Randomized enemy position.
const allEnemies = enemyPosition.map((y, index) => {
    const x = -200 * (index + 1);
    return new Enemy(x, y);
});