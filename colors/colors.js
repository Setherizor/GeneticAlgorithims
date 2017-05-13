var hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var genome = [];
    genome[0] = parseInt(result[1], 16);
    genome[1] = parseInt(result[2], 16);
    genome[2] = parseInt(result[3], 16);
    return genome
}

var getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return hexToRgb(color);
}

var truelyRandomColor = function () {
    var genome = [];
    for (var i = 0; i < 3; i++) {
        genome[i] = Math.random() * 256 | 0;
    }
    return genome; //genome.join(",");;
}