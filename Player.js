function Player(name, chessName) {
	this.name = name;	
	this.chessName = chessName;
	
	this.getName = function(){
		return this.name;
	};
}