document.write("<script type='text/javascript' src='./GameController.js'></script>");
GoBang();
function GoBang() {
    let gameController = new GameController();
    gameController.setGameCallBack(this);
    gameController.startGame();
    onSetPlayer1Name = function() {
        console.log("set plalyer1 name");
        gameController.setPlayer1Name("A");
    };
    onSetPlayer2Name = function() {
        console.log("set plalyer2 name");
        gameController.setPlayer2Name("B");
    };
    onGameStarted = function() {
        console.log("game start");
    };
    onChessPutFailed = function(player, row, column) {
        console.log("%c chess put failed, (%c, %c) has chess" + player.getName(), row, column);
    };
    onChessPutSuccessfully = function(player, row, column) {
        console.log(player.getName() + " put " + player.getChessName() + " on (" + row + ", " + column + ")");
    };
    onNextPlayer = function(player) {
        console.log("turn to " + player.getName());
    };
    onGameOver = function(player) {
        console.log("game over");
    };
}