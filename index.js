const anchor = document.getElementById('Anchor')
const options = [
  'Strings',
  'Colors',
  'Framework',
  'Home'
]
const colors = [
  '#B388EB',
  '#8093F1',
  '#72DDF7',
  '#FDC5F5'
]
options.forEach((item, i) => {
  const curr = document.createElement('div')
  curr.innerHTML = `<h1><a id=${item} href=./${item}/${item}><button class='btn draw-border'>${item}</button></a></h1>`
  curr.className = 'child'
  curr.style.backgroundColor = colors[i]
  anchor.appendChild(curr)
})
