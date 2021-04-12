"use strict"

/*

// - самому рендерить на СВГ
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

import { Pebble } from "./pebble.js"
import { AddGradientsToSvg } from "./addGradientsToSvg.js"

document.addEventListener("DOMContentLoaded", () => {

    const svg = d3.select('svg')
    AddGradientsToSvg(svg)
    let pebbles = []

    var Engine = Matter.Engine,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    let engine = Engine.create()
    let world = engine.world
    world.gravity.y = 0


    let tPrev
    function frame(_timestamp) {
        svg.selectAll('g').remove()
        svg.selectAll('circle').remove()
        let t = Number(new Date())

        // debugger
        world.bodies.forEach(b => {
            let centre = {x: 250, y: 250}
            let pos = {x: b.position.x, y: b.position.y}
            let force = .0000001
            Matter.Body.applyForce(b, pos, {
                x: - force * (pos.x - centre.x), 
                y: - force * (pos.y - centre.y),
            })
        })
        Engine.update(engine, (t - tPrev) * .2)

        tPrev = t
        pebbles.forEach(p => p.draw(svg))
        window.requestAnimationFrame(frame)
    }
    frame()


    document.addEventListener("click", (event) => {
        points.push([event.x, event.y])
    });

    for (let i = 0; i < 350; i++) {
        // const points = new Array(3).fill(0).map(() => [500 * Math.random(), 500 * Math.random()])
        let points = []
        for (let j = 0; j < 3; j++) {
            let angle = j * Math.PI * 2 / 3
            let amp = (1 + 1 * Math.random()) * 150 / Math.sqrt(i+10)
            let x = amp * Math.sin(angle)
            let y = amp * Math.cos(angle)
            points.push([x, y])
        }
        let pebble = new Pebble({ x: 50 + 412 * Math.random(), y: 50 + 412 * Math.random(), world, points })
        Composite.add(world, pebble.body)
        pebbles.push(pebble)
    }
    // Composite.add(world, [
    //     Bodies.rectangle(256, -25, 512, 50, { isStatic: true }),
    //     Bodies.rectangle(256+25, 512, 512, 50, { isStatic: true }),
    //     Bodies.rectangle(512+25, 256, 50, 256, { isStatic: true }),
    //     Bodies.rectangle(-25, 256, 50, 256, { isStatic: true })
    // ]);

});

