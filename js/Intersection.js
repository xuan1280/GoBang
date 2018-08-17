function Intersection(chessName) {
	this.chessName = chessName;
	this.getChessName = function() {
		return this.chessName;
	};
	this.setChessName = function(chessName) {
		this.chessName = chessName;
	};
	this.hasChess = function() {
		return !(chessName == ChessName.NULL);
	};
}