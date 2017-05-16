var anchor = document.getElementById('body');
var lines = [];
var fitness = [];
var DISTANCETOP = 0;

var purge = function () {
    lines = [];
    do {
        var myElem = document.getElementById("DeleteMe");
        if (myElem != null) myElem.remove();
    } while (myElem != null);
}

var updatePage = function () {
    i = 0;
    lines.forEach(function (item) {
        // Put on page
        anchor.appendChild(item);
        //window.setTimeout(append(item), 0);
    });
}

function divide(pool) {
    // purge already printed squares
    if (lines != []) purge();
    var i = 0;

    var styles = "margin-top: " + DISTANCETOP + "%; " +
        "width: " + INCREMENT + "%; " +
        "height:" + INCREMENT + "%; ";

    pool.forEach(function (rawColor) {
        var color = "rgb(" + rawColor.join(",") + ")";
        var g = document.createElement('div');
        // Needed for purge()
        g.id = "DeleteMe";
        g.style = styles + "background-color: " + color + ";" +
            "color: " + color + ";";

        // Fittness Attribute & text ID
        // g.setAttribute('fitness', getFitness(pool[i]));
        // g.innerHTML = "id: " + 'D' + i.toString();;
        lines.push(g);
        // Increment pool inex
        i++;
    });
    updatePage();
}