var ChessName = {
	NULL = {name: "NULL", code: 0, src: ""},
	BLACK = {name: "BLACK", code: 1, src: "black.png"},
	WHITE = {name: "WHITE", code: 2, src: "white.png"}
};

function Player(name, chessName) {
	this.name = name;	
	this.chessName = chessName;
	
	this.getName = function(){
		return this.name;
	};
};

function Intersection(chessName) {
	this.chessName = chessName;
	hasChess = function() {
		return !(chessName == ChessName.NULL);
	};
}

function Board(row, height) {
	this.row = row;
	this.height = height;
	this.chesses = setBoard();
	setBoard = function (row, height) {
		for (i in row) {
			for (j in column) {
				
			}

		}
		return;
	}
	hasChess = function(row, column) {
		return chesses[row][column].hasChess;
	}
	isWinOrNot = function(intersection, row, column) {
		return false;
	}
};

function GameController() {
	var players;
	setPlayer1Name = function(name) {
		players[0] = new Player(name, ChessName.BLACK);
	};
	setPlayer2Name = function(name) {
		players[1] = new Player(name, ChessName.WHITE);
	};
}