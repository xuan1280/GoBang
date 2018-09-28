function Player(playerNo, name, chessName) {
	this.playerNo = playerNo;
	this.name = name;	
	this.chessName = chessName;
	this.setName = function(name){
		this.name = name;
	};
	this.setChessName = function(chessName){
		this.chessName = chessName;
	};
	this.getName = function(){
		return name;
	};
	this.getChessName = function(){
		return chessName;
	};
}