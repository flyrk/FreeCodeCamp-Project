var start = false;
var singlePlayer = false;
var twoPlayer = false;

function init() {

}

window.addEventListener("load", function() {
    init();
    var player = document.getElementsByClassName("player");
    player[0].addEventListener("click", singlePlayerView);
    player[1].addEventListener("click", twoPlayerView);

});

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
