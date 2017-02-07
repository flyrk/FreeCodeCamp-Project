var start = false;
var singlePlayer = false;
var twoPlayer = false;
var backBoad = document.getElementsByClassName("game-background");
var turn = null;

function init() {
    start = false;
    singlePlayer = false;
    twoPlayer = false;
}

window.addEventListener("load", function() {
    init();
    var player = document.getElementsByClassName("player");
    player[0].addEventListener("click", singlePlayerView);
    player[1].addEventListener("click", twoPlayerView);

});

function chooseSide() {
    if(singlePlayer) {
        var singleChose = document.createElement("div");
        singleChose.className = "singleChose";
        var ask = document.createElement("h1");
        ask.innerText = "You wanna X or O?";
        singleChose.appendChild(ask);
        var x = document.createElement("div");
        x.className = "sideX";
        x.innerText = "X";
        singleChose.appendChild(x);
        var o = document.createElement("div");
        o.className = "sideO";
        o.innerText = "O";
        singleChose.appendChild(o);
        backBoad[0].appendChild(singleChose);
        x.addEventListener("click", playWithX);
        o.addEventListener("click", playWithO);
    } else if (twoPlayer) {
        var twoChose = document.createElement("div");
        twoChose.className = "twoChose";
        var ask = document.createElement("h1");
        ask.innerText = "You wanna X or O to move first?";
        twoChose.appendChild(ask);
        var x = document.createElement("div");
        x.className = "sideX";
        x.innerText = "X";
        twoChose.appendChild(x);
        var o = document.createElement("div");
        o.className = "sideO";
        o.innerText = "O";
        twoChose.appendChild(o);
        backBoad[0].appendChild(twoChose);
        x.addEventListener("click", playWithX);
        o.addEventListener("click", playWithO);
    }
}

function playWithX() {
    showGrids();
    turn = "X";
    if(singlePlayer) {

    } else if(twoPlayer) {
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                var box = document.getElementsByClassName("cell-" + i + "-" + j);
                if(turn === "X") {
                    box[0].addEventListener("click", setTimeOut(drawX(box), 500));
                    turn = "O";
                } else if(turn === "O") {
                    box[0].addEventListener("click", setTimeOut(drawO(box), 500));
                    turn = "X";
                }
            }
        }
    }
}

function playWithO() {
    turn = "O";
    showGrids();
    if(singlePlayer) {

    } else if(twoPlayer) {

    }
}

function drawX(box) {
    box.innerText = "X";
}
