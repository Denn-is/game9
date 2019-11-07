class Controls {
    constructor(game) {
        console.log(game)
        this.game = game;
        this.v= 5;
    }



//     setControls () {
//         window.onkeydown = function(e) {
//             switch (e.keyCode) {
//               case 38: // up arrow
//                 this.speedY = -100;
//                 console.log("moving up")
//                 break;
//               case 40: // down arrow
//                 this.speedY += 1;
//                 break;
//               case 37: // left arrow
//                 this.speedX -= 1;
//                 break;
//               case 39: // right arrow
//                 this.speedX += 1;
//                 break;
//             }
//           };
          
//           window.onkeyup = function(e) {
//             this.speedX = 0;
//             this.speedY = 0;
//           };
//     }
// }


setControls () {
    window.addEventListener('keydown', event => {
        switch (event.keyCode) {
            //LEFT
            case 37:
                    this.game.player.speedX = -this.v
        break;
          //RIGHT
        case 39:
             this.game.player.speedX= this.v
        break;
          //UP
        case 38:
                 this.game.player.speedY = -this.v
        break;
          //DOWN
        case 40:
                 this.game.player.speedY = this.v
        break;
      }
    })
    window.addEventListener('keyup', event => {
      switch (event.keyCode) {
          //LEFT
        case 37:
             this.game.player.speedX= 0
        break;
          //RIGHT
        case 39:
             this.game.player.speedX= 0
        break;
          //UP
        case 38:
                 this.game.player.speedY = 0
        break;
          //DOWN
        case 40:
                 this.game.player.speedY = 0
        break;
  }
})
}
}