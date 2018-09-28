
document.body.onload = function() {
    var mainView = new MainView(new GoBang());
    document.body.onresize = mainView.adjustContainerToReduceVacancy;
};

function MainView(gobang) {
    this.goBang = gobang;
    this.initView();
    this.goBang.addListener(this);
    this.goBang.initGame();
}

MainView.prototype = Object.create(GoBangListener.prototype);
MainView.prototype.constructor = MainView;


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
    /*TODO 這邊若不用jquery，只依靠基礎DOM一值失敗，必須了解！*/
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

MainView.prototype.addButtonListeners = function(){
    var mainView = this;
    var goBang = this.goBang;

    this.newGameP2pBtn.addEventListener('click', function(e) {
        //mainView.repaint();
        goBang.initGame();
        goBang.addListener(new Player2Delegatee(mainView));
        goBang.startGame();
    });

    this.newGameAiBtn.addEventListener('click', function(e) {
        //mainView.repaint();
        goBang.initGame();
        goBang.addListener(new AI());
        goBang.startGame();
    });

    this.regretBtn.addEventListener("click", function(e) {
        mainView.goBang.regretLastStep();
    });
};

MainView.prototype.onSetPlayerName = function(playerNo) {
    console.log("Set plalyer" + playerNo + "'s name.");
    var name;
    do {
        name = prompt("Please enter plalyer " + playerNo + " name", "");
    } while(name == null || name == "");
    this.goBang.setPlayerName(playerNo, name);
};

MainView.prototype.onGameInit = function() {
    this.painter.drawCheckerBoard();
};

MainView.prototype.onGameStarted = function() {
};

MainView.prototype.onPlayerTurn = function(player) {
    console.log("turn %s", player.getName());
    var chess = document.getElementById("chess")
    document.getElementById("playerName").innerText = player.getName();
    chess.src = player.getChessName().imgPath;
};

MainView.prototype.onChessPutFailed = function(player, row, column) {
    console.log(player.getName() + " put failed, (" + row + ", " + column + ") has chess");
};

MainView.prototype.onChessPutSuccessfully = function(player, row, column) {
    var content = player.getName() + " 選擇了 (" + row + ", " + column + ")";
    this.painter.drawCircle(player.getChessName().color, row, column);
    this.historyBoard.appendChild(this.createMessageElement(content));
    this.historyBoard.scrollTop = historyBoard.scrollHeight;
    console.log(content);
};

MainView.prototype.createMessageElement = function(content){
    var newMessageElm = document.createElement("P");
    newMessageElm.innerHTML = content;
    newMessageElm.className = "historyMessage";
    newMessageElm.style.display = "block";
    return newMessageElm;
};

MainView.prototype.onGameOver = function(player) {
    console.log("game over, winner is " + player.getName());
    alert("Game over!! The winner is " + player.getName());
};

MainView.prototype.onChessRemoveSuccessfully = function(intersections) {
    this.painter.clearCanvas();
    this.painter.drawCheckerBoard();
    for (i = 0; i < intersections.length; i++) {
        var chessName = intersections[i].getChessName();
        painter.drawCircle(chessName.color, intersections[i].getRow(), intersections[i].getColumn());
    }
};


/* 若要進行 P2P遊戲，由於GoBang需要兩個Listener才能運作，
但若向GoBang註冊兩個MainView的話，則所有事件都會被呼叫/繪製兩次。
因此由Player2Delegatee擔任除MainView之第二個Listener。
 */
function Player2Delegatee(mainView){
    this.mainView = mainView;
}

Player2Delegatee.prototype = Object.create(GoBangListener.prototype);
Player2Delegatee.prototype.constructor = Player2Delegatee;

Player2Delegatee.prototype.onSetPlayerName = function(playerNo){
    this.mainView.onSetPlayerName(playerNo);
}