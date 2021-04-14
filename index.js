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
    svg.attr('viewBox', "-512 -512 1024 1024")

    AddGradientsToSvg(svg)
    let pebbles = []

    var Engine = Matter.Engine,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    let engine = Engine.create()
    let world = engine.world
    world.gravity.y = 0.0
    // engine.enableSleeping = true


    let tPrev
    function frame(_timestamp) {
        svg.selectAll('g').remove()
        svg.selectAll('circle').remove()
        let t = Number(new Date())

        Engine.update(engine, (t - tPrev) * .2)
        // debugger
        world.bodies.forEach(b => {
            let centre = { x: 256, y: 256 }
            let pos = { x: b.position.x, y: b.position.y }

            let dist = (Math.hypot(pos.x, pos.y) + 50) / 512
            dist = Math.min(dist, 1)
            let angle = Math.atan2(pos.x, pos.y)
            let radius = 512 * Math.floor(dist * 5) / 5
            let target = {
                x: radius * Math.sin(angle),
                y: radius * Math.cos(angle)
            }

            let force = .00001 * b.mass
            Matter.Body.applyForce(b, pos, {
                x: - force * (pos.x - target.x), 
                y: - force * (pos.y - target.y),
            })
            // b.frictionAir = .05

        })

        tPrev = t
        pebbles.forEach(p => p.draw(svg))
        window.requestAnimationFrame(frame)
    }
    frame()


    // document.addEventListener("click", (event) => {
    //     points.push([event.x, event.y])
    // });

    let getSize = (indexPercent) => {
        // return 15
        return 17 * Math.pow(indexPercent, 4) + 10
    }

    const numberOfPebbles = 100
    for (let i = 0; i < numberOfPebbles; i++) {
        // const points = new Array(3).fill(0).map(() => [500 * Math.random(), 500 * Math.random()])
        let points = []
        for (let j = 0; j < 3; j++) {
            let angle = j * Math.PI * 2 / 3
            let amp = (.5 + 1.5 * Math.random()) * getSize(i / numberOfPebbles)
            let x = amp * Math.sin(angle)
            let y = amp * Math.cos(angle)
            points.push([x, y])
        }
        let radius = Math.random() * 512
        let angle = Math.random() * 2 * Math.PI
        let pebble = new Pebble({
            x:  radius * Math.sin(angle),
            y: radius * Math.cos(angle), 
            world, points })
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

