const ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890'"
const randPiece = () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]

const generateGenome = (t) => {
  return Array.from(t).map(() => { return randPiece() }).join('')
}

const getGenePool = (genome, size) => {
  return new Array(size).fill(genome)
}

const doMutation = (genome, target, mutationProbability) => {
  const shouldMutate = (x) => { return Math.floor(Math.random() * 101) <= x }
  const isWrong = (item, i) => item !== target[i]
  const mutate = (item, i) => isWrong(item, i) ? randPiece() : item

  return Array.from(genome).map((item, i) => {
    return shouldMutate(+mutationProbability) ? mutate(item, i) : item
  }).join('')
}

const getFittest = (pool, target) => {
  // b - a means sort from low to high, reverse to reverse
  const sortByFitness = (a, b) => { return b.f - a.f }

  var fitnesses = pool.map((item, index) => {
    return { 'f': getFitness(item, window.TARGET), 'index': index }
  }).sort(sortByFitness)

  return pool[fitnesses[0].index]
}

const getFitness = (genome, target) => {
  return Array.from(genome).reduce((sum, item, i) => {
    return (item === target[i]) ? sum + 1 : sum
  }, 0)
}

const putOnPage = (topDown, genome, numGens, target) => {
  const container = document.getElementById('fittesteach')
  const innerStuff = (t) => `<p>${numGens}(${getFitness(genome, t)}): ${genome}</p>`

  if (topDown) {
    container.innerHTML += innerStuff(target)
  } else {
    var currentFittest = document.createElement('p')
    currentFittest.innerHTML += innerStuff()
    container.insertBefore(currentFittest, container.firstChild)
  }
}

const getInput = () => {
  window.TARGET = document.getElementById('TARGET').value
  window.GENE_POOL = document.getElementById('genePool').value
  window.MUT_PROB = document.getElementById('mutationProbability').value
  window.SHOWN_GEN = document.getElementById('shownGen').value
  // Runs Evolve
  document.getElementById('FINALLY').innerHTML = `<p>Result: "${evolve()}"</p>`
}

const evolve = () => {
  // Clear out old Generations
  document.getElementById('fittesteach').innerHTML = '<p></p>'
  var numGens = 0
  var fittest = generateGenome(window.TARGET)

  while (getFitness(fittest, window.TARGET) !== window.TARGET.length) {
    numGens++
    // Output for the number of generations
    document.getElementById('generationanchor').innerHTML = '<p>Total Generations: ' + numGens + '</p>'

    var pool = getGenePool(fittest, window.GENE_POOL)

    var pool2 = pool.map((item) => {
      return doMutation(item, window.TARGET, +window.MUT_PROB)
    })

    fittest = getFittest(pool2, window.TARGET)
    if (numGens % window.SHOWN_GEN === 0) {
      // Change this value for bottom-up sorting method
      var topDown = true
      // Output for the fittest of each population
      putOnPage(topDown, fittest, numGens, window.TARGET)
    }
  }
  return fittest
}
