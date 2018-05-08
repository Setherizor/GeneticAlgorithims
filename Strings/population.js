// Adapted from The Nature of Code
// Daniel Shiffman

// Genetic Algorithm, Evolving Strings

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population {
  constructor(p, m, num) {
    this.population
    this.matingPool
    this.generations = 0
    this.finished = false
    this.target = p
    this.mutationRate = m
    this.perfectScore = 1
    this.best = ""
    this.population = []
    for (let i = 0; i < num; i++)
      this.population[i] = new DNA(this.target.length)
    this.matingPool = []
    this.calcFitness()
  }

  // Fill our fitness array with a value for every member of the population
  calcFitness() {
    this.population.forEach(c => c.calcFitness(target))
  }

  // Generate a mating pool
  naturalSelection() {
    // Clear the ArrayList
    this.matingPool = []
    let maxFitness = 0
    this.population.forEach(c => {
      if (c.fitness > maxFitness)
        maxFitness = c.fitness
    })

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    this.population.forEach(c => {
      let fitness = map(c.fitness, 0, maxFitness, 0, 1)
      let n = floor(fitness * 100)
      for (let j = 0; j < n; j++)
        this.matingPool.push(c)
    }, this)
  }

  // Create a new generation
  generate() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  getBest() {
    return this.best
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    let worldrecord = 0.0
    let index = 0
    this.population.forEach((c, idx) => {
      if (c.fitness > worldrecord) {
        index = idx
        worldrecord = c.fitness
      }
    })
    this.best = this.population[index].getPhrase()
    if (worldrecord === this.perfectScore)
      this.finished = true
  }

  isFinished() {
    return this.finished
  }

  getGenerations() {
    return this.generations
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = this.population.reduce((acc, c) => acc + c.fitness, 0)
    return total / (this.population.length)
  }

  allPhrases() {
    let everything = ""
    let displayLimit = min(this.population.length, 50)
    for (let i = 0; i < displayLimit; i++)
      everything += this.population[i].getPhrase() + "<br>"
    return everything
  }
}