import {connection as WSConnection} from 'websocket'
import {ClientConnection} from './ClientConnection'
import {
  HelloMsg,
  ServerMessageType,
} from '../../common/Protocol'

export class Game {
  private connections: ClientConnection[] = []
  private playerId = 1
  constructor(public id: string) {}
  
  joinClient(ws: WSConnection) {
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