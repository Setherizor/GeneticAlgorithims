var TARGET = [119, 190, 119]
var INCREMENT = 5;
var GENE_POOL = (100 / INCREMENT) * (100 / INCREMENT);
var MUT_PROB = 100;
var GEN_SKIP = 1;
var GEN = 0;     

var prompter = function() {
     INCREMENT = prompt("Increment?", 5);
     reset('M');
}

var generateGenome = function () {
    var prettyColor = true;

    // Uses index.js color function
    if (prettyColor) {
        return getRandomColor();
    }
    // Uses completely random colors.
    else {
        return truelyRandomColor();
    }
};

var getGenePool = function (genome, instructions) {
    var pool = [];

    // Copies Genome into pool
    if (instructions == 'C') {
        for (var i = 0; i < GENE_POOL; i++) {
            pool[i] = genome;
        }
    }
    // Mutates into pool
    if (instructions == 'M') {
        for (var i = 0; i < GENE_POOL; i++) {
            pool[i] = doMutation(genome);
        }
    }

    divide(pool);
    return pool;
};

var doMutation = function (genome) {
    var newGenome = [];
    var currIndex = 0;
    genome.forEach(function (element) {
        var targetElement = TARGET[currIndex];
        newGenome[currIndex] = element;
        if (Math.random() * 101 < MUT_PROB) {
            if (element != targetElement) {
                newGenome[currIndex] = Math.random() * 256 | 0;
            }
        } else {
            newGenome[currIndex] = element;
        }
        currIndex++;
    });
    return newGenome;
}
var getFitness = function (genome) {
    var fitness = 0;
    var currIndex = 0;

    genome.forEach(function (element) {
        // Gets target matching spot
        var targetElement = TARGET[currIndex];

        fitness += Math.abs(element - targetElement);
        currIndex++;
    });
    // Lower is better
    //if (fitness == 0) alert("IT WORKED OMG");
    return fitness;
}

var getFittest = function (pool) {
    var fittestIndex = 10000;
    var fittest = 10000;
    for (var i = 0; i < pool.length - 1; i++) {
        if (getFitness(pool[i]) < fittest) {
            fittest = getFitness(pool[i]);
            fittestIndex = i;
        }
    }
    return pool[fittestIndex];
}

var evolve = function () {
    var genome = generateGenome();
    var pool = getGenePool(genome, 'M');
    var fittest = getFittest(pool)

    while (getFitness(fittest) != 0) {
        var pool = getGenePool(fittest, 'M');
        var fittest = getFittest(pool);
    }

    // Working
    console.log("GEN: " + GEN + " Fittest= " + fittest.toString());
    return fittest;
}

// This UI code below allows us to step through individual generations with 
// the button and load the page with a population
var reset = function (choice) {
    purge();
    GEN = 1;
    genome = generateGenome();
    pool = getGenePool(genome, choice);
    fittest = getFittest(pool)
}

reset('M');
function doubleGen(choice) {
    for (var i = 0; i < GEN_SKIP; i++) {
        pool = getGenePool(fittest, choice);
        fittest = getFittest(pool);
        // Uncomment for verbose
        // console.log("GEN: " + GEN);
        GEN++;
    }
    // Working
    console.log("GEN: " + GEN + " Fittest(" + getFitness(fittest) + ")= " + fittest.toString());
}

function showColor() {
    purge();
    var d = document.createElement('div');
    var color = "rgb(" + TARGET.join(",") + ")";
    var styles = "margin-top: 0px; " +
        "width: 100%; " +
        "height: 100%; ";

    styles += "background-color: " + color + ";" +
        "color: " + color + ";";

    // Needed for purge()
    d.id = "DeleteMe";
    //  g.innerHTML = "id: " + 'D' + i.toString();;
    d.style = styles;
    anchor.appendChild(d);
}