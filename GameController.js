function GameController() {
	var gameCallBack;
	var currentPlayer;
	var chessBosrd;
	var players;
	setPlayer1Name = function(name) {
		players[0] = new Player(name, ChessName.BLACK);
	};
	setPlayer2Name = function(name) {
		players[1] = new Player(name, ChessName.WHITE);
	};
	setGameCallBack = function(gameCallBack) {
		this.gameCallBack = gameCallBack;
	};
	startGame = function() {
		
	};
}