function GoBang() {
    this.mainView;
	this.currentPlayer;
	this.currentPlayerIndex = 0;
	this.playerAmount = 2;
    this.chessBoard = new Board();
	this.players = [];
	this.isOver = false;
    this.setPlayer1Name = function(name) {
        console.log("setPlayer1Name..." + name);
        this.players[0] = new Player(name, ChessName.BLACK);
    };
    this.setPlayer2Name = function(name) {
        console.log("setPlayer2Name..." + name);
		this.players[1] = new Player(name, ChessName.WHITE);
	};
	this.setMainView = function(mainView) {
    	console.log("setMainView...");
		this.mainView = mainView;
	};
	this.init = function() {
		this.chessBoard.initBoard(15, 15);
		this.mainView.paintBoard();
		this.mainView.onSetPlayer1Name();
		this.mainView.onSetPlayer2Name();
	};
	this.startGame = function() {
		console.log("startGame...");
		this.currentPlayer = this.players[0];
		this.mainView.onPlayerTurn(this.currentPlayer);
	};
	this.putDownChess = function(row, column) {
		console.log("putDownChess..." + " on (" + row + ", " + column + ")");
		if (this.chessBoard.hasChess(row, column) || this.isOver)
			this.mainView.onChessPutFailed(this.currentPlayer, row, column);
		else {
			this.chessBoard.setChessOnBoard(this.currentPlayer.getChessName(), row, column);
			this.mainView.onChessPutSuccessfully(this.currentPlayer, row, column);
			if (!this.chessBoard.hasLine())
				this.turnNextPlayer();
			else {
				this.isOver = true;
				this.mainView.onGameOver(this.currentPlayer);
			}
		}
	};
	this.turnNextPlayer = function() {
        console.log("turnNextPlayer...");
		this.currentPlayer = this.players[++this.currentPlayerIndex % this.playerAmount];
		this.mainView.onPlayerTurn(this.currentPlayer);
	};
	this.remove = function() {
		var chessOrder = this.chessBoard.goBackAndGetChessOrder();
		this.mainView.repaint(chessOrder);
	};
}