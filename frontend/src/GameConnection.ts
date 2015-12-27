import {
  ClientMessageContainer,
  ClientMessage,
  ClientMessageType,
  ServerMessageType,
  SyncMsg,
  GameEnterMsg
} from '../../common/Protocol'
import {EventEmitter, EventListener} from '../../common/Event'
import {CONNECTION_PORT} from '../../common/Config'
import {GAME_ENDPOINT} from '../../common/API'

export class GameConnection {
  private ws: WebSocket;
  private _syncEvent = new EventEmitter<SyncMsg>()
  private _gameEnterEvent = new EventEmitter<GameEnterMsg>()
  private _connectedEvent = new EventEmitter<void>()
  
  constructor(public gameId: string) {
    const url = `ws://${window.location.hostname}:${CONNECTION_PORT}${GAME_ENDPOINT}?id=${gameId}`
    this.ws =  new WebSocket(url)
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