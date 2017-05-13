ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890'";
// Uncomment to support symbols as well
//ALPHABET += "{}()[];:<>,.?/|!@#$%^&*()_-+=~`" + '"\\';

var generateGenome = function () {
    var genome = [];
    for (var i = 0; i < TARGET.length; i++) {
        genome[i] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    return genome.join("");
};

var getGenePool = function (genome) {
    var pool = [];
    for (var i = 0; i < GENE_POOL; i++) {
        pool[i] = genome;
    }
    return pool;
};

var doMutation = function (genome) {
    var newGenome = "";

    for (var i = 0; i < genome.length; i++) {
        if (Math.floor(Math.random() * MUT_PROB) === 1) {
            if (genome[i] != TARGET[i]) {
                newGenome += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            } else {
                newGenome += genome[i];
            }
        } else {
            newGenome += genome[i];
        }
    }
    return newGenome;
}

var getFittest = function (pool) {
    var fittestLoc = 0;
    var fittest = 0;
    for (var i = 0; i < pool.length; ++i) {
        if (getFitness(pool[i]) > fittest) {
            fittest = getFitness(pool[i]);
            fittestLoc = i;
        }
    }
    return pool[fittestLoc];
};

var getFitness = function (genome) {
    var fitness = 0;
    for (var i = 0; i < TARGET.length; i++) {
        if (genome[i] === TARGET[i]) {
            fitness++;
        }
    }
    return fitness;
};

var putOnPage = function (boolean, String, numGens) {
    var container = document.getElementById('fittesteach');
    if (boolean) {
        container.innerHTML += "<p>" + numGens + " (" + getFitness(String) + ")" + ": " + String + "</p>";
    } else {
        var currentFittest = document.createElement("p");
        currentFittest.innerHTML += "<p>" + numGens + " (" + getFitness(String) + ")" + ": " + String + "</p>";
        container.insertBefore(currentFittest, container.firstChild);
    }
}

var evolve = function () {
    // Clear out old Generations
    document.getElementById('fittesteach').innerHTML = "<p></p>"
    var numGens = 0;
    var fittest = generateGenome();

    while (getFitness(fittest) !== TARGET.length) {
        numGens++;
        // Output for he number of generations
        document.getElementById("generationanchor").innerHTML = "<p>Total Generations: " + numGens + "</p>";

        var pool = getGenePool(fittest);
        var pool2 = [];
        for (var i = 0; i < pool.length; i++) {
            // I took out a ,true in the thing here
            pool2[i] = doMutation(pool[i]);
        }
        fittest = getFittest(pool2);
        if (numGens % SHOWN_GEN === 0) {
            // Change this value for different sorting method
            var topDown = true;
            // Output for the fittest of each population

            putOnPage(topDown, fittest, numGens);
        }
    }
    return fittest;
};

//Un comment to evolve on startup
//evolve();