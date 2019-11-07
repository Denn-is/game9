class Player {
    constructor(game) {
      this.width = 35;
      this.height = 35;
      this.color = "blue";
      this.x = 0;
      this.y = 110;
      // new speed properties
      this.speedX = 0;
      this.speedY = 0;
      this.game = game;
      this.obstacle = this.game.obstacle;
    }
  
    draw() {
      // var ctx = myGameArea.context;
      this.game.context.fillStyle = this.color;
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    newPos() {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
}


// ------- change the box to an image
// const jumperIMG = new Image();
// jumperIMG.src = "./img/jumper.png";
// drawImage(jumperIMG, 20, 110, 50, 50);

