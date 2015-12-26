/// <reference path="../typings/tsd.d.ts" />

import * as MatterJS from 'matter-js'

const {Engine, Bodies, Body} = MatterJS

const engine = MatterJS.Engine.create(document.querySelector('.wrapper'))
const ground = Bodies.rectangle(400, 500, 780, 40, { isStatic: true, friction: 1 })
const boxy = Bodies.rectangle(300, 100, 50, 50);

MatterJS.World.add(engine.world, [ground, boxy]);

document.addEventListener('keydown', (ev: KeyboardEvent) => {
  if (ev.keyCode === 68) {
    Body.applyForce(boxy, boxy.position, { x: 1, y: 0 })
  }
}, false)

MatterJS.Engine.run(engine)
