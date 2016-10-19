var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";
function changeQuote(data) {
    $('.quote').text(data.quoteText);
    if(data.quoteAuthor !== '') {
        $('.author').text("---" + data.quoteAuthor);
    } else {
        $('.author').text("---unknown");
    }
}
function changeColor() {
    var colorPlate = ["rgb(51, 46, 133)", "rgb(44, 209, 70)", "rgb(212, 210, 50)", "rgb(182, 75, 146)", "rgb(255, 49, 43)"];
    var rand = Math.floor(Math.random() * 5);
    while(colorPlate[rand] === $('.text-color').css("color")) {
        rand = Math.floor(Math.random() * 5);
    };
    $('body').css("background-color", colorPlate[rand]);
    $('#change').css("background-color", colorPlate[rand]);
    $('.text-color').css("color", colorPlate[rand]);
}
$(document).ready(function() {
    $.getJSON(url, changeQuote, 'jsonp');
    changeColor();
});
$("#change").on('click', function() {
    $.getJSON(url, changeQuote, 'jsonp');
    changeColor();
});
