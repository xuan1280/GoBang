document.getElementById("body").onload = function() {
    var goBang = new GoBang();
    var mainView = new MainView(goBang);
    goBang.setMainView(mainView);
    goBang.init();
    goBang.startGame();
}

function MainView(goBang) {
	var canvas = document.getElementById("checkerboard");
    this.goBang = goBang;
    var painter = new Painter(canvas);
    var getMousePos = function(e){
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,	//相對於Canvas左上角的X座標
			y: e.clientY - rect.top,	//相對於Canvas左上角的Y座標
			rectLeft : rect.left,
			rectTop : rect.top,
			clientX : e.clientX,
			clientY : e.clientY
		}
	};
	canvas.addEventListener('mousemove', function(e) {
		var pos = getMousePos(e);
		var x = Math.ceil(pos.x / 30), y = Math.ceil(pos.y / 30);
		var coordinate = "座標值: (" + y + "," + x + ")";
		document.getElementById("site").innerHTML = coordinate;
    });
    canvas.addEventListener("mousedown", function(e) {
        var pos = getMousePos(e);
		var x = Math.ceil(pos.x / 30), y = Math.ceil(pos.y / 30);
		var coordinate = "點擊 座標值: (" + y + "," + x + ")";
        document.getElementById("mousedownsite").innerHTML = coordinate;
        goBang.putDownChess(y, x);
    });
    this.onSetPlayer1Name = function() {
        console.log("set plalyer1 name");
        var name;
        do {
            name = prompt("Please enter plalyer 1 name", "");
        } while(name == null || name == "");
        this.goBang.setPlayer1Name(name);
    };
    this.onSetPlayer2Name = function() {
        console.log("set plalyer2 name");
        var name;
        do {
            name = prompt("Please enter plalyer 2 name", "");
        } while(name == null || name == "");
        this.goBang.setPlayer2Name(name);
    };
    this.onGameStarted = function() {
        console.log("game start");
        window.alert("Game start");
    };
    this.onPlayerTurn = function(player) {
        console.log("turn %s", player.getName());
        document.getElementById("playerName").innerHTML = player.getName();
    };
    this.onChessPutFailed = function(player, row, column) {
        console.log(player.getName() + " put failed, (" + row + ", " + column + ") has chess");
    };
    this.onChessPutSuccessfully = function(player, row, column) {
        console.log(player.getName() + " put " + player.getChessName() + " on (" + row + ", " + column + ")");
        painter.drawCircle(player.getChessName().color, row, column);
    };
    this.onNextPlayer = function(player) {
        console.log("turn to " + player.getName());
    };
    this.onGameOver = function(player) {
        console.log("game over, winner is " + player.getName());
        alert("Game over!! The winner is " + player.getName());
    };
    this.paintBoard = function() {
        painter.drawCheckerBoard();
    };
    this.onChessRemoveSuccessfully = function(intersections) {
        painter.clearCanvas();
        painter.drawCheckerBoard();
        for (i = 0; i < intersections.length; i++) {
            var chessName = intersections[i].getChessName();
            painter.drawCircle(chessName.color, intersections[i].getRow(), intersections[i].getColumn());
        }
    };
}