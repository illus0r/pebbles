"use strict"

/*

- самому рендерить на СВГ
- градиенты камушкам рандомные
- гранолой раскидать
- запаковка на хик

- строить пирамидки из них, заблокировать перемещение по оси у
- раскраска прикольная
- разнообразить форму
- СВГ маски для каких-нибудь эффектов.
- СВГ фильтры для зергистой поверхности и псевдообъёма
- разобраться, почему из СВГ можно элемент парсить, а из памяти —  нет.

*/


import "pathseg"
import * as d3 from "d3"
import * as Matter from "matter-js"

import { Pebble, Box } from "./pebble.js"


// function Box(x, y, w, h) {
//     this.w = w
//     this.h = h

//     this.body = Matter.Bodies.circle(x, y, w/2, h/2)
//     // this.body = Bodies.fromVertices()
//     Matter.World.add(world, this.body)

//     // this.show = function(){
//     //     var pos = this.body.position
//     //   var angle = this.body.angle

//     //   push()
//     //   translate(pos.x, pos.y)
//     //   rotate(angle)
//     //   rectMode(CENTER)
//     //   // print(angle)
//     //   ellipse(0,0,this.w,this.h)
//     //   pop()

//     //   // this.body.
//     // }
//   }







document.addEventListener("DOMContentLoaded", () => {
    console.log('hey')

    const svg = d3.select('svg')
    const points = [[10, 200], [-10, 200], [5, 100]]

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    let tPrev
    function frame(_timestamp) {
        svg.selectAll('g').remove()
        svg.selectAll('path').remove()
        let t = Number(new Date())
        Engine.update(engine, (t - tPrev) * .2)
        tPrev = t
        try {
            box.draw(svg)
        } catch (error) {
            console.log('draw is not defined')
        }
        window.requestAnimationFrame(frame)
    }
    frame()


    document.addEventListener("click", (event) => {
        points.push([event.x, event.y])
    });


    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600
        }
    });

    Render.run(render);

    // create runner
    // var runner = Runner.create();
    // Runner.run(runner, engine);


    // add bodies

    let box = new Box({ x: 100, y: 100, w: 50, h: 50, world, points, svg});
    Composite.add(world, box.body);
    // box.draw(svg)

    // Composite.add(world, Bodies.fromVertices(100 + 1 * 150, 200 + 1 * 50, vertexSets, {
    //     render: {
    //         fillStyle: color,
    //         strokeStyle: color,
    //         lineWidth: 1
    //     }
    // }, true));



    Composite.add(world, [
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });









    // context for MatterTools.Demo
    // return {
    //     engine: engine,
    //     runner: runner,
    //     render: render,
    //     canvas: render.canvas,
    //     stop: function () {
    //         Matter.Render.stop(render);
    //         Matter.Runner.stop(runner);
    //     }
    // };


});

