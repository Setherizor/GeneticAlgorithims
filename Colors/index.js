const anchor = document.getElementById('anchor')
var lines = []
var fitness = []
var DISTANCETOP = 0
var INCREMENT = 5

var prompter = function () {
  INCREMENT = prompt('Increment?', 5)
  GENE_POOL = (100 / INCREMENT) * (100 / INCREMENT)
  reset('M')
}

var purge = function () {
  lines = []
  do {
    var myElem = document.getElementById('DeleteMe')
    if (myElem != null) myElem.remove()
  } while (myElem != null)
}

var updatePage = function () {
  i = 0
  lines.forEach(function (item) {
    // Put on page
    anchor.appendChild(item)
  })
}

function divide(pool) {
  // purge already printed squares
  if (lines != []) purge()
  var i = 0

  var measure = '%'
  var styles = `margin-top: ${DISTANCETOP}%; width: ${INCREMENT + measure}; height: ${INCREMENT + measure};`
 
  pool.forEach(function (rawColor) {
    var color = `rgb(${rawColor.join(',')})`
    var div = document.createElement('div')
    // Needed for purge()
    div.id = 'DeleteMe'
    div.style = styles + `background-color: ${color}; color: ${color};`

    // Text ID
    // div.innerHTML = "id: " + 'D' + i.toString();;
    lines.push(div)
    // Increment pool inex
    i++
  })
  updatePage()
}
