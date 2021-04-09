const d3 = require('d3')
import pointsToSplinePath from "./pointsToSplinePath.js"
const svg = d3.select('svg')

const points_ = []

function draw() {
    svg.selectAll('path').remove()
    svg.append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', '2')
        .attr('fill', 'none')
        .attr('d', pointsToSplinePath(points_, true))
}
draw()


document.addEventListener("click", (event) => {
    points_.push([event.x, event.y])
    draw()
});