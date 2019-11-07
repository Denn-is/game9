window.addEventListener('load', () => {
    const $canvasNode = document.getElementById("canvas");
    const game = new Game($canvasNode);
    console.log("started")
    game.start();
});
