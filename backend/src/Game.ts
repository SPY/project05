import {
  HelloMsg,
  SyncMsg,
  ServerMessageContainer,
  GameObjectType
} from '../../common/Protocol'
import {connection as WSConnection} from 'websocket'
import {Player} from './Player'
import {ClientConnection} from './ClientConnection'

const SYNC_INTERVAL = 20

export class Game {
  private players: Player[] = [];
  private playerId = 1;
  private syncTimer: NodeJS.Timer;

  constructor(public id: string) {}
  
  join(client: ClientConnection) {
    const player = new Player(client, 'player' + this.playerId++)
    this.players.push(player)
    client.helloEvent.on(this.onPlayerHello.bind(this, player))
    client.closeEvent.on(this.onPlayerLeave.bind(this, player))
    
    if (!this.syncTimer) {
      const syncer = () => {
        this.broadcastSync()
        this.syncTimer = setTimeout(syncer, SYNC_INTERVAL)
      }
      this.syncTimer = setTimeout(syncer, SYNC_INTERVAL)
    }
  }
  
  onPlayerHello(from: Player, hello: HelloMsg) {
    from.welcome(this.collectSync())
  }
  
  onPlayerLeave(player: Player) {
    this.players = this.players.filter(p => p !== player)
    this.broadcastSync()
  }
  
  collectSync(): SyncMsg {
    const timestamp = Date.now()
    return {
      timestamp,
      objects: this.players.map(player => ({
        type: GameObjectType.Player,
        state: player.state()
      }))
    }
  }
  
  broadcastSync() {
    const sync = this.collectSync()
    this.players.forEach(player => player.sync(sync))
  }
}