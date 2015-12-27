import {
  connection as WSConnection,
  IMessage as WSMessage
} from 'websocket'

import {
  HelloMsg,
  ClientMessageType,
  ServerMessageContainer
} from '../../common/Protocol'

import {EventEmitter, EventListener} from '../../common/Event'

export class ClientConnection {
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