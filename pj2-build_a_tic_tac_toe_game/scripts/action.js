var start = false;
var singlePlayer = false;
var twoPlayer = false;
var backBoad = document.getElementsByClassName("game-background");
var turn = null;
var board = [];
var player1 = 0;
var player2 = 0;
var player1Marks = 0;
var player2Marks = 0;
var hasReset = false;
var hasStart = false;

function init() {
    start = false;
    singlePlayer = false;
    twoPlayer = false;
    player1 = 0;
    player2 = 0;
    player1Marks = 0;
    player2Marks = 0;
    for(var i = 0; i < 3; i++) {
        board[i] = [];
        for(var j = 0; j < 3; j++) {
            board[i][j] = 7;
        }
    }
}

window.addEventListener("load", function() {
    init();
    var player = document.getElementsByClassName("player");
    player[0].addEventListener("click", singlePlayerView);
    player[1].addEventListener("click", twoPlayerView);

});

function resetAll() {
    if(!hasStart) {
        return false;
    }
    hasReset = true;
    var gameBackground = document.getElementsByClassName('game-background')[0];
    var gamePlatform = document.getElementsByClassName('game-platform')[0];
    var drawBoard = document.getElementsByClassName('drawBoard')[0] ? document.getElementsByClassName('drawBoard')[0] : null;
    var markBoard = document.getElementsByClassName('mark-board')[0] ? document.getElementsByClassName('mark-board')[0] : null;
    if(drawBoard) {
        gameBackground.removeChild(drawBoard);
    }
    if(markBoard) {
        gamePlatform.removeChild(markBoard);
    }
    changeStartView();
    init();
    var player = document.getElementsByClassName("player");
    player[0].addEventListener("click", singlePlayerView);
    player[1].addEventListener("click", twoPlayerView);
}
function inRow(i, value, turn) {
    if(board[i][0] + board[i][1] + board[i][2] === value) {
        if(turn === 'X') {
            searchBlankRow(i, 1, turn);
        } else {
            searchBlankRow(i, 0, turn);
        }
        return true;
    }
    return false;
}

function inCol(i, value, turn) {
    if(board[0][i] + board[1][i] + board[2][i] === value) {
        if(turn === 'X') {
            searchBlankCol(i, 1, turn);
        } else {
            searchBlankCol(i, 0, turn);
        }
        return true;
    }
    return false;
}
function searchBlankRow(i, value, turn) {
    for(var j = 0; j < 3; j++) {
        if(board[i][j] === 7) {
            board[i][j] = value;
            drawBox(i, j, turn);
        }
    }
}

function searchBlankCol(i, value, turn) {
    for(var j = 0; j < 3; j++) {
        if(board[j][i] === 7) {
            board[j][i] = value;
            drawBox(j, i, turn);
        }
    }
}

function searchBlankDeg(value, turn) {
    for(var k = 0; k < 3; k++) {
        if(board[k][k] === 7) {
            board[k][k] = value;
            drawBox(k, k, turn);
        }
    }
}

function searchBlankAround(val, turn) {
    if(board[0][0] === 7) {
        board[0][0] = val;
        drawBox(0, 0, turn);
        return;
    }
    if(board[0][2] === 7) {
        board[0][2] = val;
        drawBox(0, 2, turn);
        return;
    }
    if(board[2][0] === 7) {
        board[2][0] = val;
        drawBox(2, 0, turn);
        return;
    }
    if(board[2][2] === 7) {
        board[2][2] = val;
        drawBox(2, 2, turn);
        return;
    }
    if(board[0][1] === 7) {
        board[0][1] = val;
        drawBox(0, 1, turn);
        return;
    }
    if(board[1][0] === 7) {
        board[1][0] = val;
        drawBox(1, 0, turn);
        return;
    }
    if(board[1][2] === 7) {
        board[1][2] = val;
        drawBox(1, 2, turn);
        return;
    }
    if(board[2][1] === 7) {
        board[2][1] = val;
        drawBox(2, 1, turn);
        return;
    }
}
function aiPlay(turn) {
    for(var i = 0; i < 3; i++) {
        if(turn === 'X') {
            // 判断自己是否已经有2个连续
            //
            // 行判断
            if(inRow(i, 9, turn)) {
                return;
            }
            // 列判断
            if(inCol(i, 9, turn)) {
                return;
            }
            // 斜判断
            if(board[0][0] + board[1][1] + board[2][2] === 9) {
                searchBlankDeg(1, turn);
                return;
            }
            if(board[2][0] + board[1][1] + board[0][2] === 9) {
                if(board[2][0] === 7) {
                    board[2][0] = 1;
                    drawBox(2, 0, turn);
                }
                if(board[1][1] === 7) {
                    board[1][1] = 1;
                    drawBox(1, 1, turn);
                }
                if(board[0][2] === 7) {
                    board[0][2] = 1;
                    drawBox(0, 2, turn);
                }
                return;
            }
            // 判断对面是否已经有2个连续
            //
            // 行判断
            if(inRow(i, 7, turn)) {
                return;
            }
            // 列判断
            if(inCol(i, 7, turn)) {
                return;
            }
            // 斜判断
            if(board[0][0] + board[1][1] + board[2][2] === 7) {
                searchBlankDeg(1, turn);
                return;
            }
            if(board[2][0] + board[1][1] + board[0][2] === 7) {
                if(board[2][0] === 7) {
                    board[2][0] = 1;
                    drawBox(2, 0, turn);
                }
                if(board[1][1] === 7) {
                    board[1][1] = 1;
                    drawBox(1, 1, turn);
                }
                if(board[0][2] === 7) {
                    board[0][2] = 1;
                    drawBox(0, 2, turn);
                }
                return;
            }
        } else {
            // 判断自己是否已经有2个连续
            //
            // 行判断
            if(inRow(i, 7, turn)) {
                return;
            }
            // 列判断
            if(inCol(i, 7, turn)) {
                return;
            }
            // 斜判断
            if(board[0][0] + board[1][1] + board[2][2] === 7) {
                searchBlankDeg(0, turn);
                return;
            }
            if(board[2][0] + board[1][1] + board[0][2] === 7) {
                if(board[2][0] === 7) {
                    board[2][0] = 0;
                    drawBox(2, 0, turn);
                }
                if(board[1][1] === 7) {
                    board[1][1] = 0;
                    drawBox(1, 1, turn);
                }
                if(board[0][2] === 7) {
                    board[0][2] = 0;
                    drawBox(0, 2, turn);
                }
                return;
            }
            // 判断对面是否已经有2个连续
            //
            // 行判断
            if(inRow(i, 9, turn)) {
                return;
            }
            // 列判断
            if(inCol(i, 9, turn)) {
                return;
            }
            // 斜判断
            if(board[0][0] + board[1][1] + board[2][2] === 9) {
                searchBlankDeg(0, turn);
                return;
            }
            if(board[2][0] + board[1][1] + board[0][2] === 9) {
                if(board[2][0] === 7) {
                    board[2][0] = 0;
                    drawBox(2, 0, turn);
                }
                if(board[1][1] === 7) {
                    board[1][1] = 0;
                    drawBox(1, 1, turn);
                }
                if(board[0][2] === 7) {
                    board[0][2] = 0;
                    drawBox(0, 2, turn);
                }
                return;
            }
        }
    }
    var flag = 0;  // 标记
    if(turn === 'X') {
        // 如果对面在中心下了一手
        //
        if(board[1][1] === 0) {
            searchBlankAround(1, turn);
            return;
        } else {        // 如果对面没在中心下了一手
            if(board[1][1] === 7) {
                flag = 1;
                board[1][1] = 1;
                drawBox(1, 1, turn);
            } else {
                if(board[0][1] === 0 && board[1][0] === 0 && board[0][0] === 7) {
                    board[0][0] = 1;
                    flag = 1;
                    drawBox(0, 0, turn);
                } else if(board[0][1] === 0 && board[1][2] === 0 && board[0][2] === 7) {
                    board[0][2] = 1;
                    flag = 1;
                    drawBox(0, 2, turn);
                } else if(board[1][0] === 0 && board[2][1] === 0 && board[2][0] === 7) {
                    board[2][0] = 1;
                    flag = 1;
                    drawBox(2, 0, turn);
                } else if(board[1][2] === 0 && board[2][1] === 0 && board[2][2] === 7) {
                    board[2][2] = 1;
                    flag = 1;
                    drawBox(2, 2, turn);
                } else if(board[0][1] === 7 && board[0][0] === 7 && board[0][2] === 7) {
                    board[0][1] = 1;
                    flag = 1;
                    drawBox(0, 1, turn);
                } else if(board[1][0] === 7 && board[0][0] === 7 && board[2][0] === 7) {
                    board[1][0] = 1;
                    flag = 1;
                    drawBox(1, 0, turn);
                } else if(board[1][2] === 7 && board[0][2] === 7 && board[2][2] === 7) {
                    board[1][2] = 1;
                    flag = 1;
                    drawBox(1, 2, turn);
                } else if(board[2][1] === 7 && board[2][0] === 7 && board[2][2] === 7) {
                    board[2][1] = 1;
                    flag = 1;
                    drawBox(2, 1, turn);
                }
                if(!flag) {
                    if(board[0][1] === 7) {
                        board[0][1] = 1;
                        drawBox(0, 1, turn);
                    } else if(board[1][0] === 7) {
                        board[1][0] = 1;
                        drawBox(1, 0, turn);
                    } else if(board[1][2] === 7) {
                        board[1][2] = 1;
                        drawBox(1, 2, turn);
                    } else if(board[2][1] === 7) {
                        board[2][1] = 1;
                        drawBox(2, 1, turn);
                    }
                }
            }
            return;
        }
    } else {
        // 如果对面在中心下了一手
        //
        if(board[1][1] === 1) {
            searchBlankAround(0, turn);
            return;
        } else {        // 如果对面在中心没有下一手
            if(board[1][1] === 7) {   // 如果自己没有在中心下一手
                board[1][1] = 0;
                flag = 1;
                drawBox(1, 1, turn);
            } else {
                if(board[0][1] === 1 && board[1][0] === 1 && board[0][0] === 7) {
                    board[0][0] = 0;
                    flag = 1;
                    drawBox(0, 0, turn);
                } else if(board[0][1] === 1 && board[1][2] === 1 && board[0][2] === 7) {
                    board[0][2] = 0;
                    flag = 1;
                    drawBox(0, 2, turn);
                } else if(board[1][0] === 1 && board[2][1] === 1 && board[2][0] === 7) {
                    board[2][0] = 0;
                    flag = 1;
                    drawBox(2, 0, turn);
                } else if(board[1][2] === 1 && board[2][1] === 1 && board[2][2] === 7) {
                    board[2][2] = 0;
                    flag = 1;
                    drawBox(2, 2, turn);
                } else if(board[0][1] === 7 && board[0][0] === 7 && board[0][2] === 7) {
                    board[0][1] = 0;
                    flag = 1;
                    drawBox(0, 1, turn);
                } else if(board[1][0] === 7 && board[0][0] === 7 && board[2][0] === 7) {
                    board[1][0] = 0;
                    flag = 1;
                    drawBox(1, 0, turn);
                } else if(board[1][2] === 7 && board[0][2] === 7 && board[2][2] === 7) {
                    board[1][2] = 0;
                    flag = 1;
                    drawBox(1, 2, turn);
                } else if(board[2][1] === 7 && board[2][0] === 7 && board[2][2] === 7) {
                    board[2][1] = 0;
                    flag = 1;
                    drawBox(2, 1, turn);
                }
                console.log(flag);
                if(!flag) {
                    if(board[0][1] === 7) {
                        board[0][1] = 0;
                        drawBox(0, 1, turn);
                    } else if(board[1][0] === 7) {
                        board[1][0] = 0;
                        drawBox(1, 0, turn);
                    } else if(board[1][2] === 7) {
                        board[1][2] = 0;
                        drawBox(1, 2, turn);
                    } else if(board[2][1] === 7) {
                        board[2][1] = 0;
                        drawBox(2, 1, turn);
                    }
                }
            }
            return;
        }
    }
}
/**
 * [chooseSide description]
 * Purpose:
 * Choosing Playing side, X or O,
 * then changing the view
 *
 * Return: none
 */
function chooseSide() {
    if(singlePlayer) {
        var singleChose = document.createElement("div");
        singleChose.className = "singleChose";
        var ask = document.createElement("h1");
        ask.innerText = "You wanna X or O?";
        singleChose.appendChild(ask);
        var x = createXO('X');
        var o = createXO('O');
        singleChose.appendChild(x);
        singleChose.appendChild(o);
        backBoad[0].appendChild(singleChose);
        x.addEventListener("click", function () {
            startPlay('X');
        });
        o.addEventListener("click", function () {
            startPlay('O');
        });
    } else if (twoPlayer) {
        var twoChose = document.createElement("div");
        twoChose.className = "twoChose";
        var ask = document.createElement("h1");
        ask.innerText = "You wanna X or O to move first?";
        twoChose.appendChild(ask);
        var x = createXO('X');
        var o = createXO('O');
        twoChose.appendChild(x);
        twoChose.appendChild(o);
        backBoad[0].appendChild(twoChose);
        x.addEventListener("click", function () {
            startPlay('X');
        });
        o.addEventListener("click", function () {
            startPlay('O');
        });
    }
}

function createXO(type) {
    var questionBox = document.createElement("div");
    questionBox.className = "side" + type;
    questionBox.innerText = type;
    return questionBox;
}

function startPlay(type) {
    showGrids();
    showMarkBoard(type);
    turn = type;
    var drawBoard = document.getElementsByClassName('drawBoard')[0];
    if(singlePlayer) {
        var aiTurn = turn === 'X' ? 'O' : 'X';
        drawBoard.addEventListener('click', function (e) {
            if(e.target.parentNode === drawBoard) {
                if(e.target.innerText === '') {
                    var i = parseInt(e.target.className.match(/[a-z]+\-(\d)\-(\d)/)[1]);
                    var j = parseInt(e.target.className.match(/[a-z]+\-(\d)\-(\d)/)[2]);
                    drawBox(i, j, turn);
                    board[i][j] = turn === 'X' ? 1 : 0;
                    if(judgeGame(turn)){
                        updateMarks(type);
                        playAgain();
                    } else {
                        setTimeout(function () {
                            aiPlay(aiTurn);
                            if(judgeGame(turn)) {
                                updateMarks(type);
                                playAgain();
                            }
                        }, 1000);
                    }
                }
            }
        });
    } else if(twoPlayer) {
        firstTurn = turn;
        drawBoard.addEventListener('click', function (e) {
            if(e.target.parentNode === drawBoard) {
                if(e.target.innerText === '') {
                    var i = parseInt(e.target.className.match(/[a-z]+\-(\d)\-(\d)/)[1]);
                    var j = parseInt(e.target.className.match(/[a-z]+\-(\d)\-(\d)/)[2]);
                    drawBox(i, j, turn);
                    if(turn === 'X') {
                        board[i][j] = 1;
                        turn = 'O';
                    } else {
                        board[i][j] = 0;
                        turn = 'X';
                    }
                    if(judgeGame(turn)) {
                        updateMarks(turn);
                        playAgain();
                    }
                }
            }
        });
    }
}

function drawBox(r, c, type) {
    var box = document.getElementsByClassName('cell-' + r + '-' + c)[0];
    box.innerText = type;
}

function judgeGame(turn) {
    if(isGameOver()) {
        if(singlePlayer) {
            if(player1 && !player2) {
                player1Marks++;
                if(turn === 'X') {
                    showResult('You Win!');
                } else {
                    showResult('AI Win!');
                }
            } else if(player2 && !player1) {
                player2Marks++;
                if(turn === 'O') {
                    showResult('You Win!');
                } else {
                    showResult('AI Win!');
                }
            } else {
                showResult('Drawn Game!');
            }
        } else {
            if(player1 && !player2) {
                player1Marks++;
                showResult('Player1 Win!');
            } else if(player2 && !player1) {
                player2Marks++;
                showResult('Player2 Win!');
            } else {
                showResult('Drawn Game!');
            }
        }
        return true;
    } else {
        return false;
    }
}
function playAgain() {
    setTimeout( function () {
        clearText(board);
        player1 = player2 = 0;
    }, 1500);
}
function isGameOver() {
    var full = 0;
    for(var i = 0; i < 3; i++) {
        // 行判断
        if(board[i][0] + board[i][1] + board[i][2] === 3) {
            player1 = 1;
        }
        if(board[i][0] + board[i][1] + board[i][2] === 0) {
            player2 = 1;
        }
        // 列判断
        if(board[0][i] + board[1][i] + board[2][i] === 3) {
            player1 = 1;
        }
        if(board[0][i] + board[1][i] + board[2][i] === 0) {
            player2 = 1;
        }
        for(var j = 0; j < 3; j++) {
            if(board[i][j] !== 7) {
                full++;
            }
        }
    }
    if(board[0][0] + board[1][1] + board[2][2] === 3 ||
        board[2][0] + board[1][1] + board[0][2] === 3) {
            player1 = 1;
    }
    if(board[0][0] + board[1][1] + board[2][2] === 0 ||
        board[2][0] + board[1][1] + board[0][2] === 0) {
            player2 = 1;
    }
    if(player1 || player2) {
        return true;
    }
    if(full === 9) {
        return true;
    }
    return false;
}
