var TARGET = [119, 190, 119]
var GENE_POOL = (100 / INCREMENT) * (100 / INCREMENT)
var MUT_PROB = 100
var GEN_SKIP = 1
var GEN = 0

var generateGenome = function () {
  // true = pretty colors, false = truely random
  var prettyColor = true
  return prettyColor ? getRandomColor() : truelyRandomColor()
}

var getGenePool = function (genome, instructions) {
  var pool = []
  // Copies base Genome into pool
  if (instructions === 'C') {
    for (var i = 0; i < GENE_POOL; i++) {
      pool[i] = genome
    }
  }
  // Mutates base Genome into pool
  else if (instructions === 'M') {
    for (var i = 0; i < GENE_POOL; i++) {
      pool[i] = doMutation(genome)
    }
  }
  // This will render the pool
  divide(pool)
  return pool
}

var doMutation = function (genome) {
  const canMutate = () => Math.floor(Math.random() * 101) < +MUT_PROB
  const randNumber = () => Math.floor(Math.random() * 256)
  const notTarget = x => i => x !== TARGET[i]
  const targetLock = (x, i) => notTarget(x)(i) ? randNumber() : x

  // For genome parts, ask if mut probability allows mutation,
  // Then if it is already correct, then get random number
  return genome.map(function (num, index) {
    return canMutate() ? targetLock(num, index) : num
  })
}

var getFitness = function (genome) {
  // Lower Fitness is best
  return genome.reduce(function (sum, element, index) {
    return sum += Math.abs(element - TARGET[index])
  }, 0)
}

var getFittest = function (pool) {
  const sortByFitness = (a, b) => { return a.f - b.f }

  var fitnesses = pool.map((item, index) => {
    return { 'f': getFitness(item), 'index': index }
  }).sort(sortByFitness)

  return pool[fitnesses[0].index]
}

var evolve = function () {
  var genome = generateGenome()
  var pool = getGenePool(genome, 'M')
  var fittest = getFittest(pool)

  while (getFitness(fittest) !== 0) {
    var pool = getGenePool(fittest, 'M')
    var fittest = getFittest(pool)
  }

  console.log(`GEN: ${GEN} Fittest= ${fittest.toString()}`)
  return fittest
}

// This UI code below allows us to step through individual generations with
// the button and load the page with a population
var reset = function (choice) {
  purge()
  GEN = 1
  genome = generateGenome()
  pool = getGenePool(genome, choice)
  fittest = getFittest(pool)
}

reset('M')
function doubleGen (choice) {
  for (var i = 0; i < GEN_SKIP; i++) {
    pool = getGenePool(fittest, choice)
    fittest = getFittest(pool)
    GEN++
  }
  console.log(`GEN: ${GEN} Fittest(${getFitness(fittest)})= ${fittest.toString()}`)
}
function showColor () {
  // function copies TARGET into one full page creature
  purge()
  var d = document.createElement('div')
  var color = `rgb(${TARGET.join(',')})`
  var styles = `margin-top: 0px;
                width: 100%;
                height: 100%; `

  styles += `background-color: ${color}; 
             color: ${color};`

  // Needed for purge()
  d.id = 'DeleteMe'
  //  g.innerHTML = "id: " + 'D' + i.toString();;
  d.style = styles
  anchor.appendChild(d)
}
