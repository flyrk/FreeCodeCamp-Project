function changeStartView() {
    // console.log("CheckBugs");
    if(!start) {
        document.getElementsByClassName('startView')[0].style.display = "none";
        start = true;
    } else {
        document.getElementsByClassName('startView')[0].style.display = "block";
        start = false;
    }
}

function singlePlayerView() {
    changeStartView();
    singlePlayer = true;
    chooseSide();

}

function twoPlayerView() {
    changeStartView();
    twoPlayer = true;
    chooseSide();
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
