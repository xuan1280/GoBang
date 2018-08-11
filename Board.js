
function Board(row, column) {
	this.row = row;
	this.column = column;
	var chesses = createBoard(row, column);
	createBoard = function (row, column) {
		for (i in row) {
			for (j in column) {
				chesses[i][j] = new Intersection(ChessName.NULL);
			}
		}
		return chesses;
	}
	hasChess = function(row, column) {
		return chesses[row][column].hasChess;
	}
	isWinOrNot = function(intersection, row, column) {



		return false;
	}
}