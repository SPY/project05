/// <reference path="../typings/tsd.d.ts" />

import {
  ClientMessageContainer,
  ClientMessage,
  ClientMessageType,
  ServerMessageType,
  SyncMsg,
  GameEnterMsg
} from '../../common/Protocol'
import {EventEmitter, EventListener} from '../../common/Event'

class GameConnection {
  private ws: WebSocket;
  private _syncEvent = new EventEmitter<SyncMsg>()
  private _gameEnterEvent = new EventEmitter<GameEnterMsg>()
  private _connectedEvent = new EventEmitter<void>()
  
  constructor(public gameId: string) {
    this.ws =  new WebSocket(`ws://${window.location.hostname}:8889/game?id=${gameId}`)
    this.ws.addEventListener('open', this.onConnect.bind(this), false)
    this.ws.addEventListener('message', this.onMessage.bind(this), false)
  }
  
  onConnect() {
    this._connectedEvent.trigger()
  }
  
  onMessage(event: MessageEvent) {
    const {type, payload} = JSON.parse(event.data)
    switch (type) {
      case ServerMessageType.SyncMsg:
        this._syncEvent.trigger(payload)
        break
      case ServerMessageType.GameEnterMsg:
        this._gameEnterEvent.trigger(payload)
        break;
    }
  }
  
  send(msg: ClientMessageContainer) {
    this.ws.send(JSON.stringify(msg))
  }
  
  get syncEvent(): EventListener<SyncMsg> {
    return this._syncEvent
  }
  
  get gameEnterEvent(): EventListener<SyncMsg> {
    return this._gameEnterEvent
  }
  
  get connectedEvent(): EventListener<void> {
    return this._connectedEvent
  }
}

const connection = new GameConnection('42')
connection.connectedEvent.on(() => {
  connection.send({
    type: ClientMessageType.HelloMsg,
    payload: {
      nickname: 'Deda',
      gameId: connection.gameId
    }
  })
})