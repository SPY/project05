/// <reference path="../typings/tsd.d.ts" />

'use strict'

import {readdir} from 'fs'
import * as express from 'express'

const app = express()

app.get('/maps', (req, res) => {
    res.status(200).json([])
})

app.get('/games', (req, res) => {
    res.status(200).json([])
})

app.listen(8890)