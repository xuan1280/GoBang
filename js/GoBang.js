function GoBang() {
    this.mainView;
    this.currentPlayerSite = 0;
    this.playerAmount = 2;
    this.chessBoard = new Board(7, 7);
    this.players = [];
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
		this.mainView.onSetPlayer1Name();
		this.mainView.onSetPlayer2Name();
	};
	this.startGame = function() {
		console.log("startGame...");
		do {
			this.mainView.onSetChessPut(this.players[this.currentPlayerSite]);
			turnNextPlayer();
		} while(!this.chessBoard.hasLine());
	};
	this.putDownChess = function(player, row, column) {
        console.log("putDownChess...");
		if(this.chessBoard.hasChess(row, column))
			mainView.onChessPutFailed(player, row, column);
		else {
			this.chessBoard.setChessOnBoard(player.getChessName(), row, column);
			this.mainView.onChessPutSuccessfully(player, row, column);
		}
	};
	turnNextPlayer = function() {
        console.log("turnNextPlayer...");
		this.currentPlayerSite = (this.currentPlayerSite++) % this.playerAmount;
	};
}