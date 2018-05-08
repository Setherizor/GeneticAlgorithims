let population
let target
let popmax
let mutationRate

const density = 40
const canvasSize = 700
const size = canvasSize / density
let cnv

let stats, firstColor, loopButton, resetButton, colorPicker
let looping = false;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null
}

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

  colorPicker = createInput('#7e13d6', 'color')
  colorPicker.input(myInputEvent)

  stats = createP("Stats")

  cnv = createCanvas(canvasSize, canvasSize)
  cnv.parent('body')

  smooth()
  noStroke()
  frameRate(10)

  target = hexToRgb(colorPicker.value())
  popmax = sq(density)
  mutationRate = 0.006

  createPopulation()
}

function myInputEvent() {
  target = hexToRgb(this.value())
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

  let statsText = ""
  statsText += "total generations:     " + population.getGenerations() + "<br>"
  statsText += "average fitness:       " + nf(population.getAverageFitness()) + "<br>"
  statsText += "total population:      " + popmax + "<br>"
  statsText += "mutation rate:         " + floor(mutationRate * 100) + "%"
  stats.html(statsText)

  drawPopulation()
}

function drawPopulation() {
  let adj = (height / density) / 2
  let disBetween = adj * 2
  let x = -adj
  let y = adj
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