const ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890'"
const randPiece = () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]

const generateGenome = function (t) {
  return Array.from(t).map(() => { return randPiece() }).join('')
}

const getGenePool = function (genome, size) {
  return new Array(+size).fill(genome)
}

const doMutation = function (genome, target, mutationProbability) {
  const shouldMutate = (x) => { return Math.floor(Math.random() * 101) <= x }
  const isWrong = (item, i) => item !== target[i]
  const mutate = (item, i) => isWrong(item, i) ? randPiece() : item

  return Array.from(genome).map((item, i) => {
    return shouldMutate(+mutationProbability) ? mutate(item, i) : item
  }).join('')
}

const getFittest = function (pool, target) {
  var fittestIndex = 0
  var fittest = 0
  for (var i = 0; i < pool.length; ++i) {
    var currFitness = getFitness(pool[i], target)
    if (currFitness > fittest) {
      fittest = currFitness
      fittestIndex = i
    }
  }
  return pool[fittestIndex]
}

const getFitness = function (genome, target) {
  return Array.from(genome).reduce((sum, item, i) => {
    return (item === target[i]) ? sum + 1 : sum
  }, 0)
}

const putOnPage = function (topDown, genome, numGens, target) {
  const container = document.getElementById('fittesteach')
  const innerStuff = (t) => `<p>${numGens}(${getFitness(genome, t)}):${genome}</p>`

  if (topDown) {
    container.innerHTML += innerStuff(target)
  } else {
    var currentFittest = document.createElement('p')
    currentFittest.innerHTML += innerStuff()
    container.insertBefore(currentFittest, container.firstChild)
  }
}

var getInput = function () {
  window.TARGET = document.getElementById("TARGET").value
  window.GENE_POOL = document.getElementById("genePool").value
  window.MUT_PROB = document.getElementById("mutationProbability").value
  window.SHOWN_GEN = document.getElementById("shownGen").value
  // Runs Evolve
  document.getElementById('FINALLY').innerHTML = `<p>Result: "${evolve()}"</p>`
}

var evolve = function () {
  // Clear out old Generations
  document.getElementById('fittesteach').innerHTML = '<p></p>'
  var numGens = 0
  var fittest = generateGenome(TARGET)

  while (getFitness(fittest, TARGET) !== TARGET.length) {
    numGens++
    // Output for the number of generations
    document.getElementById('generationanchor').innerHTML = '<p>Total Generations: ' + numGens + '</p>'

    var pool = getGenePool(fittest, GENE_POOL)

    var pool2 = pool.map((item) => {
      return doMutation(item, TARGET, +MUT_PROB)
    })

    fittest = getFittest(pool2, TARGET)
    if (numGens % SHOWN_GEN === 0) {
      // Change this value for bottom-up sorting method
      var topDown = true
      // Output for the fittest of each population
      putOnPage(topDown, fittest, numGens, TARGET)
    }
  }
  return fittest
}
