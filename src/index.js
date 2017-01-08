const isNode = !(typeof window !== 'undefined' && window.document && document.createElement)
const svgSource = require('raw-loader!../dist/owl-ui.svg')

if (!isNode) {
  const svg = document.createElement('svg')
  svg.id = 'owl-icons'
  svg.innerHTML = svgSource

  document.body.appendChild(svg)
}

module.exports = svgSource
