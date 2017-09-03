/**
 * Not updated as of 9-3-17
 * Added better functions and some ES6 Magic ;)
 */

var TARGET = '' // Here is a target Genome
var GENERATION = 0
var GENE_POOL = 50
var MUT_PROB = 50
var GEN_SKIP = 1

/**
 * Function to generate base Genome
 */
const generateGenome = () => {
  // TODO: Make function to return genome (String)
  var genome = randomGenome()
  return genome
}

/**
 * Function to mutate a genome
 */
const mutate = (genome) => {
  // TODO: write function to mutate single genome as desired
  return mutateGenome(genome)
}

/**
 * Function which copies genome into array with no changes.
 * instruction either copies "C" or mutates "M"
 */
var getGenePool = function (genome, instructions) {
  var pool = new Array(GENE_POOL)
  // Copies base Genome into pool
  if (instructions === 'C') {
    pool.fill(genome)
  }
  // Mutates base Genome into pool
  else if (instructions === 'M') {
    pool = doMutation(pool.fill(genome))
  }
  return pool
}

/**
 * Does mutation on each individual in pool
 * The elements change based on type of Genome you use
 * TODO: FINISH FUNCTION ELEMENTS
 */
const doMutation = (pool) => {
  // Reference target
  let target = ''
  // Finds if probability alone allows mutation 0-100 perent
  const canMutate = () => Math.floor(Math.random() * 101) < MUT_PROB
  // Returns a piece of the genome you want to use
  const randPiece = () => Math.floor(Math.random() * 256)
  // Evaluates equilavence between x and target element
  const notTarget = x => i => x !== tar[i]
  // If the element is correct, keep it, else get a new random piece to replace it
  const targetLock = (x, i) => notTarget(x)(i) ? randrandPiece() : x

  // For genome parts, ask if mut probability allows mutation,
  // Then if it is already correct, otherwise get random number
  return genome.map((num, index) => {
    return canMutate() ? targetLock(num, index) : num
  })
}

/**
 * Gets fitness of single Genome
 * TODO: FINISH FITNESS EVALUATION
 */
const getFitness = (genome) => {
  var fitness = 1
  return fitness
}

/**
 * Gets most fit of all in gene pool.
 * TODO: CHECK FUNCTION
 */
const getFittest = (pool) => {
  var fittestLocation = 0
  var fittest = 0
  // Set this equal to G for Greater than and L for less than
  // G is a fitness maximization & L is a fitness minimization
  const evalDirection = 'G'
  pool.forEach((item, i) => {
    if (evalDirection === 'G' || (getFitness(item) > fittest)) {
      fittest = getFitness(item)
      fittestLocation = i
    } else if (evalDirection === 'L' || (getFitness(item) < fittest)) {
      fittest = getFitness(item)
      fittestLocation = i
    }
  })
  return pool[fittestLocation]
}

/**
 * Continiously evolves until finding a pool where the fittest
 * Geneome meets the preCondition
 * this only works if you have a set TARGET genome
 *
 * returns the genome which meets condition.
 */
const evolve = (preCondition) => {
  var genome = generateGenome()
  var pool = getGenePool(genome)
  GENERATION = 1
  var fittest = getFittest(pool)

  while (getFitness(fittest) !== preCondition) {
    GENERATION++
    pool = getGenePool(fittest)
    fittest = getFittest(pool)
  }
  // This should be the fittest possible.
  return fittest
}

/**
 * Resets the gene pool and generates new one
 */
const reset = () => {
  pool = []
  GENERATION = 1
  genome = generateGenome()
  pool = getGenePool(genome)
  fittest = getFittest(pool)
}

/**
 * Does a generation, logs generation numbers (No Repeat)
 * TODO: FINISH FUNCTION
 * This is most likely where you will program output code
 */
function doGen () {
  for (var i = 0; i < GEN_SKIP; i += 1) {
    pool = getGenePool(fittest)
    fittest = getFittest(pool)
    // Uncomment next line for verbose mode
    // console.log("GEN: " + GEN);
    GENERATION++
  }
  // Might need to change based on genome format.
  console.log(`GEN: ${GENERATION} Fittest(${getFitness(fittest)})= ${fittest.toString()}`)
};
