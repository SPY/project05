/// <reference path="../typings/tsd.d.ts" />

'use strict'

import * as express from 'express'
import {server as WebSocketServer} from 'websocket'
import {createServer} from 'http'

const server = createServer()
const app = express()

app.get('/maps', (req, res) => {
    res.status(200).json([])
})

app.get('/games', (req, res) => {
    res.status(200).json([])
})

server.on('request', app)
server.listen(8890)

const ws = new WebSocketServer({
    httpServer: server
})

ws.on('connect', connection => {
    console.log('somebody connected')
})