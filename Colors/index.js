const anchor = document.getElementById('anchor')
const DISTANCETOP = 0
var lines = []
var fitness = []
var INCREMENT = 5

const prompter = () => {
  INCREMENT = prompt('Increment?', 5)
  window.GENE_POOL = (100 / INCREMENT) * (100 / INCREMENT)
  reset('M')
}

const purge = () => {
  lines = []
  do {
    var myElem = document.getElementById('DeleteMe')
    if (myElem !== null) myElem.remove()
  } while (myElem !== null)
}

// Put on page
const updatePage = (x) => x.forEach((item) => anchor.appendChild(item))

function divide (pool) {
  // purge already printed squares
  if (lines !== []) purge()
  const styles = `margin-top: ${DISTANCETOP}%; width: ${INCREMENT}%; height: ${INCREMENT}%;`
  pool.forEach((rawColor) => {
    const color = `rgb(${rawColor.join(',')})`
    const div = document.createElement('div')
    div.id = 'DeleteMe'
    div.style = styles + `background-color: ${color}; color: ${color};`
    lines.push(div)
  })
  updatePage(lines)
}
