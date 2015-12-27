import {
  ServerMessageType,
  SyncMsg,
  GameEnterMsg,
  Vec2d,
  PlayerState
} from '../../common/Protocol'
import {ClientConnection} from './ClientConnection'

export class Player {
  public position: Vec2d;
  public orientation: Vec2d;
  
  constructor(
    public connection: ClientConnection,
    public id: string
  ) {
      this.position = { x: 0, y: 0 }
      this.orientation = { x: 0, y: 0 }
  }
  
  welcome(sync: SyncMsg) {
    const payload: GameEnterMsg = {
      playerId: this.id,
      objects: sync.objects
    }
    this.connection.send({
      type: ServerMessageType.GameEnterMsg,
      payload
    })
  }
  
  sync(sync: SyncMsg) {
    this.connection.send({
      type: ServerMessageType.SyncMsg,
      payload: sync
    })
  }
  
  setPosition(position: Vec2d) {
    this.position = position
  }
  
  state(): PlayerState {
    return {
      id: this.id,
      position: this.position,
      orientation: this.orientation,
      left: false,
      right: false,
      jump: false
    }
  }
}
