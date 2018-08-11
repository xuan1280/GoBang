function GameController() {
	var gameCallBack;
	var currentPlayer;
	var chessBosrd;
	var players;
	setPlayer1Name = function(name) {
        console.log("setPlayer1Name...");
		players[0] = new Player(name, ChessName.BLACK);
	};
	setPlayer2Name = function(name) {
        console.log("setPlayer2Name...");
		players[1] = new Player(name, ChessName.WHITE);
	};
	setGameCallBack = function(gameCallBack) {
        console.log("setGameCallBack...");
		this.gameCallBack = gameCallBack;
	};
	startGame = function() {
		
	};
}