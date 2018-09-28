/**
 * @author Airing
 * https://github.com/airingursb/AiringGo
 */

function AiringGo(gobang) {
    this.name = "AiringGo";
    this.gobang = gobang;
    this.chessBoard = gobang.chessBoard;
    this.wins = []; // 赢法统计数组  3-d boolean array 
    this.count = 0; // 赢法统计数组的计数器
    this.myWin = [];
    this.airingWin = [];
}

AI.prototype.init = function () {
    // 初始化赢法统计数组
    for (var i = 0; i < 15; i++) {
        this.wins[i] = [];
        for (var j = 0; j < 15; j++) {
            this.wins[i][j] = []
        }
    }

    // 阳线纵向90°的赢法
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                this.wins[i][j + k][this.count] = true;
            }
            this.count++;
        }
    }

    // 阳线横向0°的赢法
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

AI.prototype.onSetPlayer1Name = function () {
    this.gobang.setPlayer1Name(this.name);
};

AI.prototype.onSetPlayer2Name = function () {
    this.gobang.setPlayer2Name(this.name);
};

AI.prototype.onGameStarted = function () {
};

AI.prototype.onPlayerTurn = function (player) {
    if (player === this) {
        var selection = this.executeMinMaxAlgorithm();
        this.gobang.putDownChess(selection.y, selection.x);
    }
};

AI.prototype.executeMinMaxAlgorithm = function(){
    var u = 0;              // 电脑预落子的x位置
    var v = 0;              // 电脑预落子的y位置
    var myScore = [];       // 玩家的分数
    var airingScore = [];   // 电脑的分数
    var max = 0;            // 最优位置的分数

    // 初始化分数的二维数组
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        airingScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            airingScore[i][j] = 0;
        }
    }

    // 通过赢法统计数组为两个二维数组分别计分
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (this.chessBoard.getChessNameAt(i, j) == ChessName.EMPTY) {
                for (var k = 0; k < this.count; k++) {
                    if (this.wins[i][j][k]) {
                        if (this.myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (this.myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (this.myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (this.myWin[k] == 4) {
                            myScore[i][j] += 10000;
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
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
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
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }

    return {x: u, y: v};
};

AI.prototype.onChessPutFailed = function (player, row, column) { };

AI.prototype.onChessPutSuccessfully = function (player, row, column) { 
    for (var k = 0; k < this.count; k++) {
        if (this.wins[row][column][k]) {
            if (player === this)
            {
                this.airingWin[k] ++;
                this.myWin[k] = 6;
            }
            else
            {
                this.myWin[k] ++;
                this.airingWin[k] = 6;
            }
        }
    }
};

AI.prototype.onNextPlayer = function (player) {
};

AI.prototype.onGameOver = function (player) {
};

AI.prototype.onChessRemoveSuccessfully = function (intersections) {
};
