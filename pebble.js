import * as Matter from "matter-js"
import { pointsToSplinePath } from "./pointsToSplinePath.js"

export const Pebble = () => {
    console.log('ell')
}

export class Box {
    constructor({x, y, w, h, world, points, svg}) {
        this.w = w
        this.h = h
        this.points = points
        this.path = pointsToSplinePath(points, true)
        svg.append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', '2')
        .attr('fill', 'none')
        .attr('d', this.path)
        let vertices = Matter.Svg.pathToVertices(svg.select('path').node(), 10);
        this.body = Matter.Bodies.fromVertices(0, 0, vertices)
        Matter.World.add(world, this.body)
        this.centreOfMass = {x: this.body.position.x, y: this.body.position.y}


    }
    draw(svg) {
        console.log('ell')
        var pos = this.body.position
        var angle = this.body.angle

        svg.append('g')
        .attr('transform', `translate(${pos.x - this.centreOfMass.x} ${pos.y - this.centreOfMass.y}) rotate(${angle * 180 / Math.PI}) `)
        .append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', '2')
        .attr('fill', 'none')
        .attr('d', this.path)
    }

    // this.show = function(){
    //     var pos = this.body.position
    //   var angle = this.body.angle
      
    //   push()
    //   translate(pos.x, pos.y)
    //   rotate(angle)
    //   rectMode(CENTER)
    //   // print(angle)
    //   ellipse(0,0,this.w,this.h)
    //   pop()
      
    //   // this.body.
    // }
  }