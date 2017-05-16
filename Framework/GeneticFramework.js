var TARGET = ""; // Here is a target Genome
var GEN = 0;
var GENE_POOL = 50;
var MUT_PROB = 50;
var GEN_SKIP = 1;

/**
 * Function to generate base Genome
 */
var generateGenome = function () {
    // TODO: Make function to return genome (String)
    var genome = randomGenome();
    return genome;
};

/** 
 * Function to mutate a genome
 */
var mutate = function (genome) {
    // TODO: write function to mutate single genome as desired
    var mutated = mutateGenome(genome);
    return mutated;
};

/**
 * Function which copies genome into array with no changes.
 */
var getGenePool = function (genome) {
    var pool = [];
    for (i = 0; i < GENE_POOL; i += 1) {
        pool[i] = genome;
    }
    return pool;
};

/**
 * Does mutation on each individual in pool
 * The elements change based on type of Genome you use
 * TODO: FINISH FUNCTION ELEMENTS
 */
var doMutation = function (pool) {
    var newPool = [];
    var currIndex = 0;
    var currentElement = "";
    var targetElement = "";

    // Loop runs for every element in the gene pool
    for (i = 0; i < pool.length; i += 1) {
        // Reference current element here
        currentElement = pool[i];
        // Reference target element here
        targetElement = "";

        if (Math.random() * 101 < MUT_PROB) {
            // this locks in correct elements and mutates incorrect ones
            if (currentElement != targetElement) {
                newPool[currIndex] = mutate(currentElement);
            }
        } else {
            newPool[currIndex] = currentElement;
        }
        currIndex++;
    }
    return newPool;
};

/**
 * Gets fitness of single Genome
 * TODO: FINISH FUNCTION
 */
var getFitness = function (genome) {
    var fitness = 0;

    // Evaluate fitnes here (AKA: write the called function)
    fitness = howFit(genome);

    return fitness;
};

/**
 * Gets most fit of all in gene pool.
 * TODO: CHECK FUNCTION
 */
var getFittest = function (pool) {
    var fittestLocation = 0;
    var fittest = 0;
    // Set this equal to G for Greater than and L for less than
    // G is a fitness maximization & L is a fitness minimization
    var evalDirection = "G";

    for (i = 0; i < pool.length; i += 1) {
        if (evalDirection == "G") {
            if (getFitness(pool[i]) > fittest) {
                fittest = getFitness(pool[i]);
                fittestLoc = i;
            }
        } else if (evalDirection == "L") {
            if (getFitness(pool[i]) < fittest) {
                fittest = getFitness(pool[i]);
                fittestLoc = i;
            }
        }
    }
    return pool[fittestLocation];
};

/**
 * Continiously evolves until finding a pool where the fittest
 * Geneome meets the preCondition
 * this only works if you have a set TARGET genome
 *
 * returns the genome which meets condition.
 */
var evolve = function (preCondition) {
    var genome = generateGenome();
    var pool = getGenePool(genome);
    GENERATION = 1;
    var fittest = getFittest(pool);

    while (getFitness(fittest) != preCondition) {
        GENERATION++;
        pool = getGenePool(fittest);
        fittest = getFittest(pool);
    }
    // This should be the fittest possible.
    return fittest;
};

/**
 * Resets the gene pool and generates new one
 */
var reset = function () {
    pool = [];
    GEN = 1;
    genome = generateGenome();
    pool = getGenePool(genome);
    fittest = getFittest(pool)
};

/**
 * Does a generation, logs generation numbers (No Repeat)
 * TODO: FINISH FUNCTION
 * This is most likely where you will program output code
 */
function doGen() {
    for (var i = 0; i < GEN_SKIP; i += 1) {
        pool = getGenePool(fittest);
        fittest = getFittest(pool);
        // Uncomment next line for verbose mode
        // console.log("GEN: " + GEN);
        GEN++;
    }
    // Might need to change based on genome format.
    console.log("GEN: " + GEN + " Fittest(" + getFitness(fittest) + ")= " + fittest.toString());
};