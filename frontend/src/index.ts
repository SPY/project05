/// <reference path="../typings/tsd.d.ts" />

import * as MatterJS from 'matter-js'

const {Engine, Bodies, Body, Events} = MatterJS

const engine = MatterJS.Engine.create(document.querySelector('.wrapper'))
const ground = Bodies.rectangle(400, 500, 780, 40, { isStatic: true, friction: 1 })
const boxy = Bodies.rectangle(300, 100, 50, 50, { mass: 4 });

MatterJS.World.add(engine.world, [ground, boxy]);

const D_KEY = 68
const W_KEY = 87
const A_KEY = 65

let onGround = false

Events.on(engine, 'collisionStart', ({pairs}) => {
  onGround = pairs.some(({bodyA, bodyB}) =>
    bodyA === ground && bodyB === boxy
    || bodyA === boxy && bodyB === ground
  )
})

Events.on(engine, 'collisionEnd', ({pairs}) => {
  onGround = !pairs.some(({bodyA, bodyB}) =>
    bodyA === ground && bodyB === boxy
    || bodyA === boxy && bodyB === ground
  )
})

document.addEventListener('keydown', (ev: KeyboardEvent) => {
  switch (ev.keyCode) {
    case A_KEY:
      Body.applyForce(boxy, boxy.position, { x: -.1, y: 0 })
      break;
    case D_KEY:
      Body.applyForce(boxy, boxy.position, { x: .1, y: 0 })
      break;
    case W_KEY:
      if (onGround) {
        Body.applyForce(boxy, boxy.position, { x: 0, y: -.1 })
      }
  }
}, false)

MatterJS.Engine.run(engine)
