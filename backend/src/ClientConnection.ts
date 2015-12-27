import {
  connection as WSConnection,
  IMessage as WSMessage
} from 'websocket'

import {
  HelloMsg,
  ClientMessageType,
  ServerMessageContainer,
  ChangeStateMsg
} from '../../common/Protocol'

import {EventEmitter, EventListener} from '../../common/Event'

export class ClientConnection {
  private _helloEvent = new EventEmitter<HelloMsg>();
  private _closeEvent = new EventEmitter<void>();
  private _changeStateEvent = new EventEmitter<ChangeStateMsg>()
  
  constructor(private ws: WSConnection) {
    ws.on('message', this.onMessage.bind(this))
    ws.on('close', this.onClose.bind(this))
  }
  
  protected onMessage(msg: WSMessage) {
    const {type, payload} = JSON.parse(msg.utf8Data)
    switch (type) {
      case ClientMessageType.HelloMsg:
        this._helloEvent.trigger(payload)
        break
      case ClientMessageType.ChangeStateMsg:
        this._changeStateEvent.trigger(payload)
        break
    }
  }
  
  protected onClose() {
    this._closeEvent.trigger()
    this._closeEvent.unsubscribeAll()
    this._helloEvent.unsubscribeAll()
  }
  
  get helloEvent(): EventListener<HelloMsg> {
    return this._helloEvent.listener
  }
  
  get changeStateEvent(): EventListener<ChangeStateMsg> {
    return this._changeStateEvent.listener
  }
  
  get closeEvent(): EventListener<void> {
    return this._closeEvent.listener
  }
  
  send(msg: ServerMessageContainer) {
    this.ws.send(JSON.stringify(msg))
  }
}