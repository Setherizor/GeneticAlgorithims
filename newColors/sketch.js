let population
let target
let popmax
let mutationRate

const density = 45
const canvasSize = 600
const size = canvasSize / density

let stats, firstColor, loopButton, resetButton
let looping = false;

function toggleLoop() {
  looping = !looping
  looping ? loop() : noLoop()
}

function createPopulation() {
  population = new Population(target, mutationRate, popmax)
  noLoop()
  looping = false
  drawPopulation()
}

function setup() {
  loopButton = createButton('Toggle Loop')
  loopButton.mousePressed(toggleLoop)

  resetButton = createButton('Reset Simulation')
  resetButton.mousePressed(createPopulation)

  stats = createP("Stats")
  stats.class("stats")

  firstColor = createP("First Color:")
  firstColor.class("best")

  createCanvas(canvasSize, canvasSize)
  smooth()
  noStroke()
  frameRate(10)

  target = [183, 75, 242]
  popmax = sq(density)
  mutationRate = 0.006

  document.getElementById("body").style["background-color"] = "rgb("+target.join(',')+")"

  createPopulation()
}

function draw() {
  // Run the Evolution
  population.naturalSelection()
  population.generate()
  population.calcFitness()
  population.evaluate()

  // If we found the target, stop
  if (population.isFinished()) {
    println(millis() / 1000.0)
    noLoop()
  }

  firstColor.html("First Color: " + population.population[0].genes)

  let statstext;
  statstext += "total generations:     " + population.getGenerations() + "<br>"
  statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>"
  statstext += "total population:      " + popmax + "<br>"
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%"
  stats.html(statstext)

  drawPopulation()
}

function drawPopulation() {
  let adj = (height / density) / 2
  let disBetween = adj * 2
  let x = -adj
  let y = adj
  // Draw Squares
  var i = 0
  var j = 0
  population.population.forEach(s => {
    fill(s.genes)
    rect(i++ * disBetween, j * disBetween, size, size)
    if (i >= density) {
      j++
      i = 0
    }
  })
}