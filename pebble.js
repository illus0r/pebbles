import * as Matter from "matter-js"

export const Pebble = () => {
    console.log('ell')
}

export class Box {
    constructor({x, y, w, h, world}) {
        this.w = w
        this.h = h

        this.body = Matter.Bodies.circle(x, y, w/2, h/2)
        // this.body = Bodies.fromVertices()
        Matter.World.add(world, this.body)
    }
    draw(svg) {

        var pos = this.body.position
        var angle = this.body.angle

        svg.append('circle')
        .attr('cx', pos.x)
        .attr('cy', pos.y)
        .attr('r', 50)
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