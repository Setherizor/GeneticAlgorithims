// Adapted From The Nature of Code
// Daniel Shiffman

// Genetic Algorithm, Evolving Strings
// Demonstration of using a genetic algorithm to perform a search

/* 
  TODO: Add choosen text and button functionality for choosing stuff
*/

let target
let popmax
let mutationRate
let population
let bestPhrase
let allPhrases
let stats

function setup() {
  bestPhrase = createP("Best phrase:")
  bestPhrase.class("best")

  allPhrases = createP("All phrases:")
  allPhrases.position(600, 10)
  allPhrases.class("all")

  stats = createP("Stats")
  stats.class("stats")

  target = "To be or not to be."
  popmax = 200
  mutationRate = 0.01

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax)
}

function draw() {
  // Generate mating pool
  population.naturalSelection()
  population.generate()
  population.calcFitness()
  population.evaluate()
  // If we found the target phrase, stop
  if (population.isFinished()) {
    console.log(millis() / 1000.0)
    noLoop()
  }
  displayInfo()
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest()
  bestPhrase.html("Best phrase:<br>" + answer)
  let statstext;
  statstext += "total generations:     " + population.getGenerations() + "<br>"
  statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>"
  statstext += "total population:      " + popmax + "<br>"
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%"
  stats.html(statstext)
  allPhrases.html("All phrases:<br>" + population.allPhrases())
}