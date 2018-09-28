function GoBang() {
	this.listeners = [];
	this.currentPlayer;
	this.currentPlayerIndex = 0;
	this.playerAmount = 2;
	this.chessBoard = new Board();
	this.players = [];
	this.isOver = false;
	this.isAiGame = false;
}

GoBang.prototype.addListener = function (listener) {
	this.listeners.push(listener);
};

GoBang.prototype.broadcast = function (lambda) {
	this.listeners.forEach(listener => lambda(listener));
};

GoBang.prototype.initGame = function () {
	this.chessBoard.initBoard(15, 15);
	this.broadcast(l => l.onGameInit());
};

GoBang.prototype.startGame = function () {
	if (this.listeners.length < 2) 
		throw "Listener 數量少於 2，是否忘記設置?";

	this.broadcast(l => l.onGameStarted());
	for (playerNo = 0; playerNo < this.listeners.length; playerNo++)
		this.listeners[playerNo].onSetPlayerName(playerNo, 
			playerNo == 0 ? ChessName.WHITE : ChessName.BLACK);
	
	this.currentPlayer = this.players[0];
	this.turnNextPlayer();
};

GoBang.prototype.setPlayerName = function (playerNo, name) {
	var chessName = playerNo == 0 ? ChessName.WHITE : ChessName.BLACK;
	this.players[playerNo] = new Player(name, chessName);
};

GoBang.prototype.putDownChess = function (row, column) {
	if (this.chessBoard.hasChess(row, column) || this.isOver)
		this.broadcast(l => l.onChessPutFailed(this.currentPlayer, row, column));
	else {
		this.chessBoard.setChessOnBoard(this.currentPlayer.getChessName(), row, column);
		this.broadcast(l => l.onChessPutSuccessfully(this.currentPlayer, row, column));
		if (!this.chessBoard.hasLine())
			this.turnNextPlayer();
		else {
			this.isOver = true;
			this.broadcast(l => l.onGameOver(this.currentPlayer));
		}
	}
};

GoBang.prototype.turnNextPlayer = function () {
	this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
	this.currentPlayer = this.players[this.currentPlayerIndex];
	this.broadcast(l => l.onPlayerTurn(this.currentPlayer));
};

GoBang.prototype.regretLastStep = function () {
	var chessOrder = this.chessBoard.goBackAndGetChessOrder();
	/*TODO*/
	this.mainView.repaint(chessOrder);
};
