/// <reference path="../typings/tsd.d.ts" />

'use strict'

import * as express from 'express'
import {server as WebSocketServer} from 'websocket'
import {createServer} from 'http'
import {Game} from './Game'
import {CONNECTION_PORT, API_PORT} from '../../common/Config'
import {MAPS_METHOD, GAME_METHOD, GAMES_METHOD} from '../../common/API'

const app = express()

app.get(MAPS_METHOD, (req, res) => {
  res.status(200).json([])
})

app.get(GAMES_METHOD, (req, res) => {
  res.status(200).json([])
})

app.listen(API_PORT)

// websockets

const httpServer = createServer()
const ws = new WebSocketServer({ httpServer })

interface Games {
  [id: string]: Game;
}

const games: Games = {
  ['42']: new Game('42')
}

ws.on('request', request => {
  const {pathname, query: {id}} = request.resourceURL
  if (pathname === GAME_METHOD && id in games) {
    games[id].joinClient(request.accept())
  }
  else {
    request.reject(404, 'Game with such id doesn\'t exist')
  }
})

httpServer.listen(CONNECTION_PORT)
