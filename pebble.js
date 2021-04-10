export const Pebble = () => {
    console.log('ell')
}

export const Box = (x, y, w, h) => {
    this.body = Bodies.circle(x, y, w/2, h/2)
    // this.body = Bodies.fromVertices()
    World.add(world, this.body)
    this.w = w
    this.h = h
    
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


