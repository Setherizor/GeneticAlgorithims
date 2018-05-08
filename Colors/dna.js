// Genetic Algorithm, Evolving Strings
// Adapted from The Nature of Code
// Daniel Shiffman

// A class to describe the creature's DNA
function newColorValue() {
  return floor(random(0, 255));
}

// Constructor (makes a random DNA)
class DNA {
  constructor(num) {
    this.genes = []
    this.fitness = 0
    while (this.genes.length < num)
      this.genes[this.genes.length] = newColorValue()
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join("-")
  }

  // Fitness function (returns floating point % of "correct" characters)
  calcFitness(target) {
    let colorDiff = (a, b) => sqrt(b.reduce((sum, element, index) => sum += sq((a[index] - element)), 0))
    let d = colorDiff(target, this.genes)
    this.fitness = map(d, 0, 442, 1, 0)
  }

  // Crossover
  crossover(partner) {
    // A new child
    let child = new DNA(this.genes.length)
    // Half from one, half from the other
    for (let i = 0; i < this.genes.length; i++)
      child.genes[i] = random(1, 100) < 50 ? this.genes[i] : partner.genes[i]
    //(this.genes[i] + partner.genes[i]) / 2
    return child
  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++)
      if (random(1) < mutationRate)
        this.genes[i] = newColorValue()
  }
}