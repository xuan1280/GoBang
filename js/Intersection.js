function Intersection(chessName, row , column) {
	this.chessName = chessName;
	this.row = row;
	this.column = column;
	this.getChessName = function() {
		return this.chessName;
	};
	this.setChessName = function(chessName) {
		this.chessName = chessName;
	};
	this.isEmpty = function() {
		return this.chessName == ChessName.EMPTY;
	};
	this.setSite = function(row, column) {
		this.row = row;
		this.column = column;
	};
	this.getRow = function() {
		return this.row;
	};
	this.getColumn = function() {
		return this.column;
	};
	this.toString = function() {
		return this.chessName.img;
	}
}