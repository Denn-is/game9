class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.player = new Player (this);
    this.catch = new Catch (this);
    this.catches = new Catch (this);
    this.controls = new Controls(this);
    this.obstacle = new Obstacle (this);
    this.controls.setControls();
    this.myObstacles = [];
    this.myCatches = [];
    this.catchScore = 0;
    this.obstacleTimer = 0;
    this.catchTimer = 0;
    this.speed = 3000;
    this.scoreSpeed = 3500;
    this.loop;
    this.scoreObstaclesCounter = 0;
    this.points = 0;
    this.pointsCatch = 0;
    this.energy = this.pointsCatch - this.points;
  }

  start () {
    this.animation()
  }

  animation(timestamp) {
    //console.log(this.scoreObstaclesCounter)
    //this.scoreObstaclesCounter = 0;
    // this.updateEverything(timestamp)
    this.loop = window.requestAnimationFrame((timestamp) => this.animation(timestamp));
    this.updateEverything(timestamp);
    // console.log("timestamp",Math.round(timestamp,2) )
    // console.log("this.scoreObstaclesCounter", this.scoreObstaclesCounter)
    // console.log("this.scoreObstaclesCounter + timestamp",this.scoreObstaclesCounter + Math.round(timestamp,2))
    // this.scoreObstaclesCounter = this.scoreObstaclesCounter + parseInt((timestamp/1000).value);
    //console.log("this.scoreObstaclesCounter",typeof this.scoreObstaclesCounter, this.scoreObstaclesCounter)
    this.drawEverything();
  }

  drawEverything() {
    this.clear();
    this.scorePassedObstacles2();
    this.scoreCharger();
    for (let i = 0; i < this.myCatches.length; i++) {
      this.myCatches[i].draw();
    }
    for (let i = 0; i < this.myObstacles.length; i++) {
      this.myObstacles[i].draw();
    }
    this.player.draw();
    
  }

  updateEverything(timestamp) {
    this.player.newPos();

    if(this.obstacleTimer < timestamp - this.speed){
      this.myObstacles.push(new Obstacle(this));
      this.obstacleTimer = timestamp;
    }

    for (let i = 0; i < this.myObstacles.length; i++) {
      this.myObstacles[i].newPos();
    }

    // -------------------------

    if(this.catchTimer < timestamp - this.scoreSpeed){
      this.myCatches.push(new Catch(this));
      this.catchTimer = timestamp;
    }

    for (let i = 0; i < this.myCatches.length; i++) {
      this.myCatches[i].newPos();
    }

    // --------------------


    this.checkCrashObstacle();
    this.scorePassedObstacles2();

    this.checkCrashCatch();
    this.checkEnergy()

    this.speedOfGame();
  }

  clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  stop () {
    this.reset();
  }

  checkEnergy() {
    if ((Math.floor(this.pointsCatch) - this.points)<0) {
      this.stop()
    }
  }

  reset () {
    cancelAnimationFrame(this.loop)
  }

  checkCrashObstacle() {
    for(let i = 0; i<this.myObstacles.length; i++) {
      const obstacle = this.myObstacles[i];
      if (
          this.player.bottom() < obstacle.y ||
          this.player.top() > (obstacle.y + obstacle.height) ||
          this.player.right() < obstacle.x ||
          this.player.left() > (obstacle.x + obstacle.width)
      ) {
        // this.updateEverything()
      } else {
        this.stop()
      }
    }
  }

  checkCrashCatch() {
    for(let i = 0; i<this.myCatches.length; i++) {
      if (
          this.player.bottom() < this.myCatches[i].y ||
          this.player.top() > (this.myCatches[i].y + this.myCatches[i].height) ||
          this.player.right() < this.myCatches[i].x ||
          this.player.left() > (this.myCatches[i].x + this.myCatches[i].width)
      ) {
        // do nothing
      } else {
        this.pointsCatch = this.pointsCatch + 1/100;
        console.log("i am counting catches")
      }
    }
  }
  
  scorePassedObstacles2 () {
    for(let i = 0; i<this.myObstacles.length; i++) {
      if (0 === (this.myObstacles[i].x)
      ) {
        this.points = this.points + 1/2;
        console.log(this.points);
      } 
    }
    this.context.font = "18px serif";
    this.context.fillStyle = "black";
    this.context.fillText("Energy loss: " + this.points, this.width/20, this.height*3/4);
    // console.log("scoring!")
    }
  
  scoreCharger() {
      this.context.font = "18px serif";
      this.context.fillStyle = "black";
      this.context.fillText("Energy gain " + Math.floor(this.pointsCatch), this.width/20, this.height*2/3);
      this.context.fillText("Reserves " + (Math.floor(this.pointsCatch) - this.points), this.width/20, this.height*5/6);
    };

  speedOfGame() {
    if ((Math.floor(this.pointsCatch) - this.points)<=3) {
      this.speed = 4000;
      this.scoreSpeed = 2500;
    } else if ((Math.floor(this.pointsCatch) - this.points)<=6) {
      this.speed = 2000;
      this.scoreSpeed = 3500;
      this.obstacle.speedX = 4;
    } else {
      this.speed = 1500;
      this.scoreSpeed = 4500;
      this.catch.speedX = 2;
    }
  }
}
