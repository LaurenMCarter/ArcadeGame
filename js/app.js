
var Enemy = function() {
    this.x = x;
    thix.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
};

Enemy.prototype.update = function(dt) {
    //this.x += 150 * dt;

    if (this.x > ctx.canvas.width + this.width){
        this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x,y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
    this.height = 75;
    this.width = 65;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

Player.prototype.update = function(dt) {

};

Player.prototype.handleInput = function(direction){
    const horizontal = 101;
    const vertical = 83;

    if (direction === 'left' && this.x - horizontal >= 0){
        this.x -= 100;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width ){
        this.x += 100;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200){
        this.y -= 100;
    } else if (direction === 'up' && thix.y - vertical > 0 - player.height){
        this.y += 100;
    }
}

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

const allEnemies = enemyPosition.map((y,index) => {
    return new Enemy( (-200 * (index + 1)), y);
});

const player = new Player();
