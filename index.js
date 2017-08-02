var anchor = document.getElementById('Anchor')
var options = [
  'Strings',
  'Colors',
  'Framework',
  'Home'
]
options.forEach((item, i) => {
  var curr = document.createElement('div')
  curr.innerHTML = `<h1><a id=${item} href=./${item}/${item}><button class='btn draw-border'>${item}</button></a></h1>`

  curr.className = 'child'
  const bk = x => { curr.style.backgroundColor = x }

  (i === 0) ? bk('#B388EB')
    : (i === 1) ? bk('#8093F1')
      : (i === 2) ? bk('#72DDF7')
        : (i === 3) ? bk('#FDC5F5')
          : 0
  anchor.appendChild(curr)
})
