const isNode = !(typeof window !== 'undefined' && window.document && document.createElement)
const svgSource = require('raw!../dist/owl-ui.svg')

if (!isNode) {
  const div = document.createElement('svg')
  div.id = 'owl-icons'
  div.innerHTML = svgSource

  document.body.appendChild(div)
}

module.exports = svgSource
