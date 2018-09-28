/**
 * @author Airing
 * https://github.com/airingursb/AiringGo
 * 此演算法之解說
 * https://www.jianshu.com/p/83fa8cc31a38
 */

function AI(gobang) {
    this.name = "AiringGo";
    this.player = undefined;
    this.gobang = gobang;
    this.chessBoard = gobang.chessBoard;
    this.wins = []; // 赢法统计数组  3-d boolean array 
    this.count = 0; // 赢法统计数组的计数器
    this.myWin = [];
    this.airingWin = [];
    this.firstTurn = true;

    this.init();
}

AI.prototype = Object.create(GoBangListener.prototype);
AI.prototype.constructor = AI;

AI.prototype.init = function () {
    // 初始化赢法统计数组
    for (var i = 0; i < 15; i++) {
        this.wins[i] = [];
        for (var j = 0; j < 15; j++) {
            this.wins[i][j] = []
        }
    }

    // 横向90°的赢法
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                this.wins[i][j + k][this.count] = true;
            }
            this.count++;
        }
    }

    // 縱向0°的赢法
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                this.wins[j + k][i][this.count] = true;
            }
            this.count++;
        }
    }

    // 阴线斜向135°的赢法
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                this.wins[i + k][j + k][this.count] = true;
            }
            this.count++;
        }
    }

    // 阴线斜向45°的赢法
    for (var i = 0; i < 11; i++) {
        for (var j = 14; j > 3; j--) {
            for (var k = 0; k < 5; k++) {
                this.wins[i + k][j - k][this.count] = true;
            }
            this.count++;
        }
    }
    
    for (var i = 0; i < this.count; i++) {
        this.myWin[i] = 0;
        this.airingWin[i] = 0;
    }
};

AI.prototype.onSetPlayerName = function (playerNo) {
    this.gobang.setPlayerName(playerNo, this.name);
};

AI.prototype.onGameStarted = function(player){
    this.player = player;
};

AI.prototype.onPlayerTurn = function (player) {
    if (this.firstTurn) 
    {
        this.firstTurn = false;
        this.gobang.putDownChess(this.player, 8, 8);
    }
    else if (player === this.player) {
        var selection = this.executeMinMaxAlgorithm();
        this.gobang.putDownChess(this.player, selection.y+1, selection.x+1);
    }
};

AI.prototype.executeMinMaxAlgorithm = function(){
    var u = 0;              // 电脑预落子的y位置
    var v = 0;              // 电脑预落子的x位置
    var playerScore = [];       // 玩家的分数
    var airingScore = [];   // 电脑的分数
    var max = 0;            // 最优位置的分数

    // 初始化分数的二维数组
    for (var i = 0; i < 15; i++) {
        playerScore[i] = [];
        airingScore[i] = [];
        for (var j = 0; j < 15; j++) {
            playerScore[i][j] = 0;
            airingScore[i][j] = 0;
        }
    }

    // 通过赢法统计数组为两个二维数组分别计分
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (this.chessBoard.getChessNameAt(i+1, j+1) === ChessName.EMPTY) {
                for (var k = 0; k < this.count; k++) {
                    if (this.wins[i][j][k]) {
                        if (this.myWin[k] == 1) {
                            playerScore[i][j] += 200;
                        } else if (this.myWin[k] == 2) {
                            playerScore[i][j] += 400;
                        } else if (this.myWin[k] == 3) {
                            playerScore[i][j] += 2000;
                        } else if (this.myWin[k] == 4) {
                            playerScore[i][j] += 10000;
                        }
                        if (this.airingWin[k] == 1) {
                            airingScore[i][j] += 220;
                        } else if (this.airingWin[k] == 2) {
                            airingScore[i][j] += 420;
                        } else if (this.airingWin[k] == 3) {
                            airingScore[i][j] += 2100;
                        } else if (this.airingWin[k] == 4) {
                            airingScore[i][j] += 20000;
                        }
                    }
                }
                
                // 如果玩家(i,j)处比目前最优的分数大，则落子在(i,j)处
                if (playerScore[i][j] > max) {
                    max = playerScore[i][j];
                    u = i;
                    v = j;
                } else if (playerScore[i][j] == max) {
                    // 如果玩家(i,j)处和目前最优分数一样大，则比较电脑在该位置和预落子的位置的分数
                    if (airingScore[i][j] > airingScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                
                // 如果电脑(i,j)处比目前最优的分数大，则落子在(i,j)处
                if (airingScore[i][j] > max) {
                    max  = airingScore[i][j];
                    u = i;
                    v = j;
                } else if (airingScore[i][j] == max) {
                    // 如果电脑(i,j)处和目前最优分数一样大，则比较玩家在该位置和预落子的位置的分数
                    if (playerScore[i][j] > playerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }

    return {y: u, x: v};
};

AI.prototype.onChessPutFailed = function (player, row, column) { };

AI.prototype.onChessPutSuccessfully = function (player, row, column) {
    this.updateWinStates(player, row, column, false);
};

AI.prototype.onChessRemoveSuccessfully =  function (player, row, column) {
    this.updateWinStates(player, row, column, true);

};
/* TODO 悔棋 不相容 AI演算法 */
AI.prototype.updateWinStates = function(player, row, column, regretful){
    var adjust = regretful ? -1 : 1;
    for (var k = 0; k < this.count; k++) {
        if (this.wins[row-1][column-1][k]) {
            if (player === this.player)
            {
                this.airingWin[k] += adjust;
                this.myWin[k] = 6;  //設值6代表此贏法不可能實現
            }
            else
            {
                this.myWin[k] += adjust;
                this.airingWin[k] = 6;
            }
        }
    }
}

