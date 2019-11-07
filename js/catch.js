class Catch {
    constructor(game) {
        this.game = game;
        this.height = 50;
        this.width = 50;
        this.color = "green";
        this.x = game.width;
        this.y = Math.floor((Math.random() * this.game.height)-this.height);
        this.speedX = 1;
        this.myCatches = [];
    }

    draw() {
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
  
    updateCatches() {
        for (let i = 0; i < this.myObstacles.length; i++) {
          this.myCatches[i].x += -1;
          this.myCatches[i].this.draw();
        }
    }
    newPos() {
      this.x -= this.speedX;
    }

    left() {
      return this.x;
    }
    right() {
      return ;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
}
