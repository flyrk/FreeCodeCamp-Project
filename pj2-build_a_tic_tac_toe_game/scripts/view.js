function changeStartView() {
    if(!start) {
        document.getElementsByClassName('startView')[0].style.display = "none";
        start = true;
    } else {
        document.getElementsByClassName('startView')[0].style.display = "block";
        start = false;
    }
}

function singlePlayerView() {
    hasStart = true;
    changeStartView();
    singlePlayer = true;
    if(hasReset && document.querySelector('.singleChose')) {
        document.querySelector('.singleChose').style.display = "block";
    } else {
        chooseSide();
    }
}

function twoPlayerView() {
    hasStart = true;
    changeStartView();
    twoPlayer = true;
    if(hasReset && document.querySelector('.twoChose')) {
        document.querySelector('.twoChose').style.display = "block";
    } else {
        chooseSide();
    }
}

function showMarkBoard(type) {
    var markBoard = document.createElement('div');
    markBoard.className = 'mark-board';
    var leftBoard = document.createElement('span');
    var rightBoard = document.createElement('span');
    var midSpan = document.createElement('span');
    if(singlePlayer) {
        leftBoard.innerHTML = type === 'X' ? 'You:' + player1Marks : 'Computer:' + player1Marks;
        rightBoard.innerHTML = type === 'O' ? 'You:' + player2Marks : 'Computer:' + player2Marks;
    } else {
        leftBoard.innerHTML = 'Player1:' + player1Marks;
        rightBoard.innerHTML = 'Player2:' + player2Marks;
    }
    midSpan.innerHTML = "        |        ";
    markBoard.appendChild(leftBoard);
    markBoard.appendChild(midSpan);
    markBoard.appendChild(rightBoard);
    var gameBackground = document.getElementsByClassName('game-background')[0];
    document.getElementsByClassName('game-platform')[0].insertBefore(markBoard, gameBackground);
}

function updateMarks(type) {
    var markBoard = document.getElementsByClassName('mark-board')[0];
    var leftBoard = markBoard.firstChild;
    var rightBoard = markBoard.lastChild;
    if(singlePlayer) {
        leftBoard.innerHTML = type === 'X' ? 'You:' + player1Marks : 'Computer:' + player1Marks;
        rightBoard.innerHTML = type === 'O' ? 'You:' + player2Marks : 'Computer:' + player2Marks;
    } else {
        leftBoard.innerHTML = 'Player1:' + player1Marks;
        rightBoard.innerHTML = 'Player2:' + player2Marks;
    }
}
function showGrids() {
    if(singlePlayer) {
        document.getElementsByClassName("singleChose")[0].style.display = "none";
    } else if(twoPlayer) {
        document.getElementsByClassName("twoChose")[0].style.display = "none";
    }
    var drawBoard = document.createElement("div");
    drawBoard.className = "drawBoard";
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            var box = document.createElement("div");
            box.className = "cell-" + i + "-" + j;
            drawBoard.appendChild(box);
            updateGrids(box, i, j);
        }
    }
    backBoad[0].appendChild(drawBoard);
}

function updateGrids(box, row, column) {
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.position = "absolute";
    box.style.border = "1px solid white";
    box.style.top = row * 100 + "px";
    box.style.left = column * 100 + "px";
}

function clearText() {
    var backBoad = document.getElementsByClassName('game-background')[0];
    var res = document.getElementsByClassName('result')[0];
    var shadow = document.getElementsByClassName('shadow-box')[0];
    backBoad.removeChild(res);
    backBoad.removeChild(shadow);
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            var box = document.getElementsByClassName("cell-" + i + "-" + j)[0];
            box.innerText = '';
            board[i][j] = 7;
        }
    }
}
function showResult(info) {
    var shadow = document.createElement('div');
    shadow.className = 'shadow-box';
    var end = document.createElement('div');
    end.className = 'result';
    end.innerText = info;
    document.getElementsByClassName('game-background')[0].appendChild(end);
    document.getElementsByClassName('game-background')[0].appendChild(shadow);
}
