import {
  ServerMessageType,
  SyncMsg,
  GameEnterMsg,
  Vec2d as IVec2d,
  PlayerState,
  ChangeStateMsg
} from '../../common/Protocol'
import {Vec2d, vec2d} from '../../common/math/Vec2d'
import {ClientConnection} from './ClientConnection'

export class Player {
  public position: Vec2d;
  public orientation: Vec2d;
  
  constructor(
    public connection: ClientConnection,
    public id: string
  ) {
      this.position = Vec2d.single(0)
      this.orientation = vec2d(1, 0)
      this.connection.changeStateEvent.on(this.onChangeState.bind(this))
  }
  
  onChangeState(state: ChangeStateMsg) {
    if (state.right) {
      this.position = this.position.plus(vec2d(10, 0))
    }
    if (state.left) {
      this.position = this.position.plus(vec2d(-10, 0))
    }
    if (state.fall) {
      this.position = this.position.plus(vec2d(0, 10))
    }
    if (state.jump) {
      this.position = this.position.plus(vec2d(0, -10))
    }
  }
  
  welcome(sync: SyncMsg) {
    const payload: GameEnterMsg = {
      playerId: this.id,
      timestamp: sync.timestamp,
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
