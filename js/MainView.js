document.getElementById("body").onload = function() {
    var goBang = new GoBang();
    var mainView = new MainView(goBang);
    goBang.setMainView(mainView);
    goBang.init();
    goBang.startGame();
}

function MainView(goBang) {
    this.goBang = goBang;
    this.onSetPlayer1Name = function() {
        console.log("set plalyer1 name");
        this.goBang.setPlayer1Name("A");
    };
    this.onSetPlayer2Name = function() {
        console.log("set plalyer2 name");
        this.goBang.setPlayer2Name("B");
    };
    this.onGameStarted = function() {
        console.log("game start");
    };
    this.onSetChessPut = function(player) {
        console.log("turn %s", player.getName());
    };
    this.onChessPutFailed = function(player, row, column) {
        console.log("{0} chess put failed, ({1}, {2}) has chess".format(player.getName(), row, column));
    };
    this.onChessPutSuccessfully = function(player, row, column) {
        console.log(player.getName() + " put " + player.getChessName() + " on (" + row + ", " + column + ")");
    };
    this.onNextPlayer = function(player) {
        console.log("turn to " + player.getName());
    };
    this.onGameOver = function(player) {
        console.log("game over");
    };
}