function Board(row, column) {
	this.row = row;
	this.column = column;
	this.chesses = createBoard(row, column);
	
	createBoard = function (row, column) {
		for (i in row) 
			for (j in column) 
				this.chesses[i][j] = new Intersection(ChessName.NULL);
		return this.chesses;
	};
	this.hasChess = function(row, column) {
		return this.chesses[row][column].hasChess;
	};
	this.setChessOnBoard = function(chessName, row, column) {
		return this.chesses[row][column].setChessName(chessName);
	};
	this.isWinOrNot = function(row, column) {
		return judgeHorizontal(row, column) || judgeVertical(row, column) || judgeLeftOblitue(row, column) || judgeRightOblitue(row, column);
	};
	this.judgeLeftOblitue = function(row, column) {
		count = 0
		for (i = row-2, j = column-2; i < 2, j < 2; i++, j++)
			if (this.chesses[i][j].getChessName() == this.chesses[row][column].getChessName())
				count++;
			else
				count = 0;
		return count == 5;
	};
	this.judgeRightOblitue = function(row, column) {
		count = 0
		for (i = row-2, j = column+2; i < 2, j >= -2; i++, j--)
			if (this.chesses[i][j].getChessName() == this.chesses[row][column].getChessName())
				count++;
			else
				count = 0;
		return count == 5;
	};
	this.judgeHorizontal = function(row, column) {
		count = 0
		for (i = column-2; i < 2; i++)
			if (this.chesses[row][i].getChessName() == this.chesses[row][column].getChessName())
				count++;
			else
				count = 0;	
		return count == 5;
	};
	this.judgeVertical = function(row, column) {
		count = 0
		for (i = row-2; i < 2; i++)
			if (this.chesses[i][column].getChessName() == this.chesses[row][column].getChessName())
				count++;
			else
				count = 0;	
		return count == 5;
	};
}