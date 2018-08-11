function Player(name, chessName) {
	this.name = name;	
	this.chessName = chessName;
	setName = function(name){
		this.name = name;
	};
	getName = function(){
		return name;
	};
}