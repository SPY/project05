/// <reference path="../typings/tsd.d.ts" />

'use strict'

import * as express from 'express'
import {server as WebSocketServer} from 'websocket'
import {createServer} from 'http'
import {Game} from './Game'
import {CONNECTION_PORT, API_PORT} from '../../common/Config'
import {
  GAME_ENDPOINT, 
  MAPS_METHOD, MapsRes,
  GAMES_METHOD, GamesRes,
  MAP_METHOD, MapReq, MapRes
} from '../../common/API'
import * as bodyParser from 'body-parser'

// api endpoint
const app = express()
app.use(bodyParser.json())

app.get(MAPS_METHOD, (req, res) => {
  const data: MapsRes = { maps: [] }
  res.status(200).json(data)
})

app.get(GAMES_METHOD, (req, res) => {
  const data: GamesRes = { games: [] }
  res.status(200).json(data)
})

app.get(MAP_METHOD, (req, res) => {
  const {id}: MapReq = req.query
  const data: MapRes = { id }
  res.status(200).json(data)
})

app.listen(API_PORT)

// websocket endpoint

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
  if (pathname === GAME_ENDPOINT && id in games) {
    games[id].joinClient(request.accept())
  }
  else {
    request.reject(404, 'Game with such id doesn\'t exist')
  }
})

httpServer.listen(CONNECTION_PORT)
