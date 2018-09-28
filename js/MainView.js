
document.body.onload = function() {
    var mainView = new MainView();
    mainView.goBang = new GoBang();
    mainView.initView();
    mainView.goBang.setMainView(mainView);
    mainView.goBang.init();
    mainView.goBang.startGame();
    document.body.onresize = mainView.adjustContainerToReduceVacancy;
};

MainView.prototype.initView = function(){
	this.canvas = document.getElementById("checkerboard");
    this.painter = new Painter(this.canvas);
    this.historyBoard = document.getElementById("historyBoard");
    this.newGameP2pBtn = document.getElementById("newGameP2pBtn");
    this.newGameAiBtn = document.getElementById("newGameAiBtn");
    this.regretBtn = document.getElementById("regretBtn");
    this.adjustContainerToReduceVacancy();
    this.addCanvasListeners();
    this.addButtonListeners();
}

MainView.prototype.adjustContainerToReduceVacancy = function(){
    var screenWidth = document.documentElement.clientWidth;
    var checkerboardWidth = document.getElementById("checkerboard").clientWidth;
    var remainderWidth = screenWidth - checkerboardWidth;
    /*TODO 這邊不用jquery，只依靠基礎DOM一值失敗，必須了解！*/
    $("#left").width(remainderWidth/2 - 2);
    $("#right").width(remainderWidth/2 - 2);
};

MainView.prototype.getMousePos = function(e){
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,	//相對於Canvas左上角的X座標
        y: e.clientY - rect.top,	//相對於Canvas左上角的Y座標
        rectLeft : rect.left,
        rectTop : rect.top,
        clientX : e.clientX,
        clientY : e.clientY
    }
};

MainView.prototype.addCanvasListeners = function(){
    var mainView = this;
    this.canvas.addEventListener('mousemove', function(e) {
        var pos = mainView.getMousePos(e);
        var x = Math.ceil(pos.x / 30), y = Math.ceil(pos.y / 30);
        var coordinate = "座標值: (" + y + "," + x + ")";
    });
    this.canvas.addEventListener("mousedown", function(e) {
        var pos = mainView.getMousePos(e);
        var x = Math.ceil(pos.x / 30), y = Math.ceil(pos.y / 30);
        var coordinate = "點擊 座標值: (" + y + "," + x + ")";
        mainView.goBang.putDownChess(y, x);
    });
};

/* TODO 開始新遊戲 與悔棋 */
MainView.prototype.addButtonListeners = function(){
    var mainView = this;
    this.newGameP2pBtn.addEventListener('click', function(e) {
        mainView.repaint();
        mainView.goBang.init();
        mainView.goBang.startGame();
    });
    this.newGameAiBtn.addEventListener('click', function(e) {
    });
    this.regretBtn.addEventListener("click", function(e) {
        mainView.goBang.regretLastStep();
    });
};

function MainView() {
    this.goBang = undefined;

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
        var chess = document.getElementById("chess")
        document.getElementById("playerName").innerText = player.getName();
        chess.src = player.getChessName().imgPath;
    };
    this.onChessPutFailed = function(player, row, column) {
        console.log(player.getName() + " put failed, (" + row + ", " + column + ") has chess");
    };
    this.onChessPutSuccessfully = function(player, row, column) {
        var content = player.getName() + " 選擇了 (" + row + ", " + column + ")";
        this.painter.drawCircle(player.getChessName().color, row, column);
        this.historyBoard.appendChild(this.createMessageElement(content));
        this.historyBoard.scrollTop = historyBoard.scrollHeight;
        console.log(content);
    };
    this.createMessageElement = function(content){
        var newMessageElm = document.createElement("P");
        newMessageElm.innerHTML = content;
        newMessageElm.className = "historyMessage";
        newMessageElm.style.display = "block";
        return newMessageElm;
    }
    this.onNextPlayer = function(player) {
        console.log("turn to " + player.getName());
    };
    this.onGameOver = function(player) {
        console.log("game over, winner is " + player.getName());
        alert("Game over!! The winner is " + player.getName());
    };
    this.paintBoard = function() {
        this.painter.drawCheckerBoard();
    };
    this.onChessRemoveSuccessfully = function(intersections) {
        this.painter.clearCanvas();
        this.painter.drawCheckerBoard();
        for (i = 0; i < intersections.length; i++) {
            var chessName = intersections[i].getChessName();
            painter.drawCircle(chessName.color, intersections[i].getRow(), intersections[i].getColumn());
        }
    };
}