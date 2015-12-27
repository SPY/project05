/// <reference path="../typings/tsd.d.ts" />

import {ClientMessageType} from '../../common/Protocol'
import {EventEmitter, EventListener} from '../../common/Event'
import {CONNECTION_PORT} from '../../common/Config'

import {GameConnection} from './GameConnection'

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
