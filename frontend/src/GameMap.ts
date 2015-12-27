import {GameMapBlock} from './GameMapBlock';
import {GameMapSpawnPlace} from './GameMapSpawnPlace';
import {vec2d} from '../../common/math/Vec2d';

export class GameMap {
  private blocks: GameMapBlock[];
  private spawnPlaces: GameMapSpawnPlace[];

  constructor (textMap: string, blockWidth: number, blockHeight: number) {
    var lines = textMap.split('\n');
    var self = this;

    this.blocks = [];
    this.spawnPlaces = [];

    lines.forEach((line, lineNoFromEnd) => {
      var lineNo = lines.length - 1 - lineNoFromEnd;

      line.split('').forEach((char, charNo) => {
        switch (char) {
          case '#':
            self.blocks.push(new GameMapBlock(
              vec2d(charNo * blockWidth, lineNo * blockHeight),
              vec2d(blockWidth, blockHeight)
            ));
            break;
          case 'S':
            self.spawnPlaces.push(
              new GameMapSpawnPlace(vec2d((charNo + 0.5) * blockWidth, (lineNo + 0.5) * blockHeight))
            );
            break;
          default:
            break;
        }
      })
    })
  }

  getBlocks () {
    return this.blocks;
  }

  getSpawnPlace() {
    return this.spawnPlaces[0].position;
  }
}
