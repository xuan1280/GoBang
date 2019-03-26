function Board() {
	this.row;
	this.column;
	this.chessOrder = [];
	this.intersections;

	this.initBoard = function(row, column) {
		this.row = row;
		this.column = column;
		this.intersections = new Array(row+1);
		for (i = 1; i <= row; i++)
		{
			this.intersections[i] = new Array(column+1);
			for (j = 1; j <= column; j++) 
				this.intersections[i][j] = new Intersection(ChessName.EMPTY, i, j);
		}
	};

	this.getChessNameAt = function(row, column){
		return this.intersections[row][column].getChessName();
	};
	this.hasChess = function(row, column) {
		return !this.intersections[row][column].isEmpty();
	};
	this.setChessOnBoard = function(chessName, row, column) {
		this.intersections[row][column].setChessName(chessName);
		this.chessOrder.push(this.intersections[row][column]);
	};

	this.hasLine = function() {
		if (this.chessOrder.length < 1)
			return false;
		var lastChess = this.chessOrder[this.chessOrder.length-1];
		row = lastChess.getRow();
		column = lastChess.getColumn();
		console.log(row + ", " + column);
		return this.judgeHorizontal(row, column) || this.judgeVertical(row, column) || this.judgeLeftOblitue(row, column) || this.judgeRightOblitue(row, column);
	};

	this.judgeLeftOblitue = function(row, column) {
		var count = 0;
		for (i = row-4, j = column-4; i <= row+4, j <= column+4; i++, j++) {
			if (i < 1 || j < 1 || i > this.row || j > this.column)
				continue;
			if (this.intersections[i][j].getChessName() === this.intersections[row][column].getChessName())
				count+=1;
			else
				count = 0;
			if (count == 5)
				return true;
		}
		return false;
	};

	this.judgeRightOblitue = function(row, column) {
		var count = 0;
		for (i = row-4, j = column+4; i <= row+4, j >= column-4; i++, j--) {
			if (i < 1 || j < 1 || i > this.row || j > this.column)
				continue;
			if (this.intersections[i][j].getChessName() === this.intersections[row][column].getChessName())
				count+=1;
			else
				count = 0;
			if (count == 5)
				return true;
		}
		return false;
	};
	this.judgeHorizontal = function(row, column) {
		var count = 0;
		for (i = column-4; i <= column+4; i++) {
			if (i < 1 || i > this.column)
				continue;
			if (this.intersections[row][i].getChessName() === this.intersections[row][column].getChessName())
				count+=1;
			else
				count = 0;
			if (count == 5)
				return true;
		}
		return false;
	};
	this.judgeVertical = function(row, column) {
		var count = 0;
		for (i = row-4; i <= row+4; i++) {
			if (i < 1 || i > this.row)
				continue;
			if (this.intersections[i][column].getChessName() === this.intersections[row][column].getChessName())
				count+=1;
			else
				count = 0;
			if (count === 5)
				return true;
		}
		return false;
	};
	this.goBackAndGetChessOrder = function() {
		var lastIntersection = this.chessOrder.pop();
		this.intersections[lastIntersection.getRow()][lastIntersection.getColumn()].setChessName(ChessName.EMPTY);
		return this.chessOrder;
	};
	this.getChessOrder = function() {
		return this.chessOrder;
	};
}

Board.prototype.toString = function() {
	str = "";
	for (i = 1; i <= this.row; i++) {
		for (j = 1; j <= this.column; j++)
			str += this.intersections[i][j].toString();
		str += "\n";
	}
	return str;
}