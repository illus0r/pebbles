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

import {pointsToSplinePath} from "./pointsToSplinePath.js"
import {Pebble, Box} from "./pebble.js"


document.addEventListener("DOMContentLoaded", () => {
    console.log('hey')

    const svg = d3.select('svg')
    const points = [[100, 100], [200, 200], [100, 200]]

    function frame(timestamp) {
        // console.log(timestamp)
        // svg.selectAll('path').remove()
        svg.append('path')
            .attr('stroke', 'black')
            .attr('stroke-width', '2')
            .attr('fill', 'none')
            .attr('d', pointsToSplinePath(points, true))
        // window.requestAnimationFrame(frame)
    }
    frame()


    document.addEventListener("click", (event) => {
        points.push([event.x, event.y])
    });

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
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
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    if (typeof fetch !== 'undefined') {
        // var select = function (root, selector) {
        //     return Array.prototype.slice.call(root.querySelectorAll(selector));
        // };

        // var loadSvg = function (url) {
        //     return fetch(url)
        //         .then(function (response) { return response.text(); })
        //         .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
        // };


        var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

        // console.log('pebble.node()', pebble.node())
        // console.log('svg.select(\'path\').node()', svg.select('path').node())
        var vertexSets = [svg.select('path').node()]
            // var vertexSets = [pebble.node()]
            console.log(vertexSets)
                vertexSets = vertexSets.map(function (path) { return Svg.pathToVertices(path, 10); });

        
        Composite.add(world, Bodies.fromVertices(100 + 1 * 150, 200 + 1 * 50, vertexSets, {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1
            }
        }, true));

    } else {
        Common.warn('Fetch is not available. Could not load SVG.');
    }

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
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function () {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };


});

