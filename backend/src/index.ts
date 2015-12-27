/// <reference path="../typings/tsd.d.ts" />

'use strict'

import * as express from 'express'
import {
  server as WebSocketServer,
  connection as WSConnection,
  IMessage as WSMessage
} from 'websocket'
import {createServer} from 'http'
import {
  ServerMessage,
  HelloMsg,
  ClientMessageType,
  ServerMessageType,
  ServerMessageContainer
} from '../../common/Protocol'
import {EventEmitter, EventListener} from '../../common/Event'

const app = express()

app.get('/maps', (req, res) => {
  res.status(200).json([])
})

app.get('/games', (req, res) => {
  res.status(200).json([])
})

app.listen(8890)

const httpServer = createServer()
const ws = new WebSocketServer({ httpServer })

class Game {
  private connections: ClientConnection[] = []
  private playerId = 1
  constructor(public id: string) {}
  
  addClient(ws: WSConnection) {
    const client = new ClientConnection(ws)
    this.connections.push(client)
    client.helloEvent.on(this.onHello.bind(this, client))
  }
  
  onHello(from: ClientConnection, hello: HelloMsg) {
    from.send({
      type: ServerMessageType.GameEnterMsg,
      payload: {
        playerId: 'player' + this.playerId++,
        objects: []
      }
    })
  }
}

class ClientConnection {
  private _helloEvent = new EventEmitter<HelloMsg>()
  
  constructor(private ws: WSConnection) {
    ws.on('message', this.onMessage.bind(this))
    ws.on('close', this.onClose.bind(this))
  }
  
  onMessage(msg: WSMessage) {
    const {type, payload} = JSON.parse(msg.utf8Data)
    switch (type) {
      case ClientMessageType.HelloMsg:
        this._helloEvent.trigger(payload)
        break
    }
  }
  
  onClose() {
    this._helloEvent.unsubscribeAll()
  }
  
  get helloEvent(): EventListener<HelloMsg> {
    return this._helloEvent.listener
  }
  
  send(msg: ServerMessageContainer) {
    this.ws.send(JSON.stringify(msg))
  }
}

const games: { [id: string]: Game } = {
  ['42']: new Game('42')
}

ws.on('request', request => {
  const {pathname, query: {id}} = request.resourceURL
  if (pathname === '/game' && id in games) {
    games[id].addClient(request.accept())
  }
  else {
    request.reject(404, 'Game with such id doesn\'t exist')
  }
})

httpServer.listen(8889)