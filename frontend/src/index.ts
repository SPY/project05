/// <reference path="../typings/tsd.d.ts" />

import * as MatterJS from 'matter-js'

const engine = MatterJS.Engine.create(document.querySelector('.wrapper'))

MatterJS.Engine.run(engine)
