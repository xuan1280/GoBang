document.body.onload = function() {
    var mainView = new MainView(new GoBang());
    document.body.onresize = mainView.adjustContainerToReduceVacancy;
};

function modeSelected() {
    var mode = $('#modeSelect').find(":selected").val();
    if (mode == 'duel') {
        $('#inputName').html('玩家1 : <input type="text" name="p1Name" /><br/>玩家2 : <input type="text" name="p2Name" />');
    }
    else if (mode == 'ai') {
        $('#inputName').html('玩家 :  <input type="text" name="p1Name" />');
    }
    else {
        alert('請選擇模式');
    }
}

function MainView(gobang) {
    this.goBang = gobang;
    this.initView();
}

MainView.prototype = Object.create(GoBangListener.prototype);
MainView.prototype.constructor = MainView;


MainView.prototype.initView = function(){
	this.canvas = document.getElementById("checkerboard");
    this.painter = new Painter(this.canvas);
    this.historyBoard = document.getElementById("historyBoard");
    this.winnerHistoryBoard = document.getElementById("winnerHistoryBoard");
    this.newGameBtn = document.getElementById("newGameBtn");
    this.confirmBtn = document.getElementById("confirmBtn");
    this.cancelBtn = document.getElementById("cancelBtn");
    this.regretBtn = document.getElementById("regretBtn");
    this.regretBtn.disabled = true;
    this.adjustContainerToReduceVacancy();
    this.addCanvasListeners();
    this.addButtonListeners();
    this.getWinnerHistory();
    this.painter.drawCheckerBoard();
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
        mainView.goBang.putDownChess(mainView.player, y, x);
    });
};

MainView.prototype.addButtonListeners = function(){
    var mainView = this;
    var goBang = this.goBang;

    this.newGameBtn.addEventListener('click', function(e) {
        document.getElementById("modeDialog").showModal();
        mainView.repaintCheckerBoard();
        goBang.initGame();
    });

    this.confirmBtn.addEventListener('click', function(e) {
        mainView.newGameBtn.disabled = true;
        var mode = $('#modeSelect').find(":selected").val();
        var formData = $('form').serializeArray();
        goBang.setGameMode(mode);
        goBang.addListener(mainView, formData[0]["value"]);
        
        if (mode == 'duel') {
            goBang.addListener(new Player2Delegatee(mainView), formData[1]["value"]);
            mainView.regretBtn.disabled = false;
        }
        else if (mode == 'ai') {
            goBang.addListener(new AI(goBang), AI.name);
            mainView.regretBtn.disabled = true;  //AI模式暫時不支援悔棋
        }
        goBang.startGame();
    });

    this.cancelBtn.addEventListener('click', function (e) {
        mainView.newGameBtn.disabled = false;
    });

    this.regretBtn.addEventListener("click", function(e) {
        mainView.goBang.regretLastStep();
    });
};

MainView.prototype.getWinnerHistory = function () {
    var mainView = this;
    $.get("/getWinnerHistory", function (data) {
        console.log(data);
        mainView.winnerRecords = data;
        for (var i in data) {
            var name = data[i]["player"]["name"];
            var options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false,
                timeZone: 'Asia/Shanghai' 
            };
            var time = new Intl.DateTimeFormat('ja-JP', options).format(new Date(data[i]["time"]));
            var content = name + " " + time;
            mainView.winnerHistoryBoard.appendChild(mainView.createWinnerRecordMessageElement(content, data[i]["record"]));
        }
    });
};

MainView.prototype.createWinnerRecordMessageElement = function(content, data){
    var painter = this.painter;
    var newMessageElm = document.createElement("P");
    var newButtonElm = document.createElement("BUTTON");
    newButtonElm.innerHTML = "點擊觀看";
    newButtonElm.className = "watchWinnerHistoryButton";
    newButtonElm.addEventListener("click", function (e) {
        console.log(data);
        // todo 增加時間延遲
        for (var i in data) {
            var record = data[i];
            console.log(record);
            painter.drawCircle(record["chessName"]["color"], record.row, record.column);
        }
    });
    newMessageElm.innerText = content;
    newMessageElm.appendChild(newButtonElm);
    return newMessageElm;
};

MainView.prototype.repaintCheckerBoard = function() {
    this.painter.clearCanvas();
    this.painter.drawCheckerBoard();
};

MainView.prototype.onGameInit = function() {
    console.log('onGameInit');
};

MainView.prototype.onGameStarted = function(player) {
    this.player = player;
};

MainView.prototype.onPlayerTurn = function(player) {
    console.log(this.goBang.getGameMode());
    
    if (this.goBang.getGameMode() == 'duel')
        this.player = player;
    console.log("turn %s", player.getName());
    var chess = document.getElementById("chess")
    document.getElementById("playerName").innerText = player.getName();
    chess.src = player.getChessName().imgPath;
};

MainView.prototype.onChessPutFailed = function(player, row, column) {
    console.log(player.getName() + " put failed, (" + row + ", " + column + ")");
};

MainView.prototype.onChessPutSuccessfully = function(player, row, column) {
    var content = player.getName() + " 選擇了 (" + row + ", " + column + ")";
    var audio = new Audio('sounds/put_chess.mp3');
    audio.play();
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
    this.newGameBtn.disabled = false;
};

MainView.prototype.onChessRemoveSuccessfully = function(intersections) {
    this.repaintCheckerBoard();
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