function GoBang() {
	this.gameCallBack;
	this.currentPlayerSite = 0;
	this.playerAmount = 2;
	this.chessBosrd;
	this.players;
	this.setPlayer1Name = function(name) {
        console.log("setPlayer1Name...");
		players[0] = new Player(name, ChessName.BLACK);
	};
	this.setPlayer2Name = function(name) {
        console.log("setPlayer2Name...");
		players[1] = new Player(name, ChessName.WHITE);
	};
	this.setGameCallBack = function(gameCallBack) {
        console.log("setGameCallBack...");
		this.gameCallBack = gameCallBack;
	};
	this.startGame = function() {
		
	};
	this.putDownChess = function(player, row, column) {
        console.log("putDownChess...");
		if(chessBosrd.hasChess(row, column))
			gameCallBack.onChessPutFailed(player, row, column);
		else {
			chessBosrd.setChessOnBoard(player.getChessName(), row, column);
			gameCallBack.onChessPutSuccessfully(player, row, column);
		}
	};
	this.turnNextPlayer = function() {
        console.log("turnNextPlayer...");
		currentPlayerSite = (currentPlayerSite++) % playerAmount;
	};
}