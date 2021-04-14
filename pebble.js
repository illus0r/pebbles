import * as Matter from "matter-js"
import { pointsToSplinePath } from "./pointsToSplinePath.js"
import * as d3 from "d3"

export class Pebble {
    constructor({ x, y, world, points }) {
        this.drawScale = 1.
        this.points = points
        this.path = pointsToSplinePath(points, true)
        let pathElement = d3.create('svg:path')
            .attr('stroke', 'black')
            .attr('stroke-width', '2')
            .attr('fill', 'none')
            .attr('d', this.path)

        let vertices = Matter.Svg.pathToVertices(pathElement.node(), 10);
        this.centre = Matter.Vertices.centre(vertices)
        this.body = Matter.Bodies.fromVertices(0, 0, vertices)
        Matter.World.add(world, this.body)
        Matter.Body.translate(this.body, { x, y })

        this.colorId = Math.floor(Math.random()*10)
    }

    draw(svg) {
        var pos = this.body.position
        var angle = this.body.angle

        svg.append('g')
            .attr('transform', `
        translate(${pos.x} ${pos.y}) scale(${this.drawScale}) rotate(${angle * 180 / Math.PI}) translate(${-this.centre.x} ${-this.centre.y})`)
            .append('path')
            .attr('fill', `url(#gradient${this.colorId})`)
            .attr('d', this.path)
    }
}