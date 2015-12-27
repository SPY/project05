import {Character} from './Character';
import {GameMap} from './GameMap';

export class World {
  private map: GameMap;
  private characters: Character[];

  constructor (map: GameMap) {
    this.characters = [];
    this.map = map;
  }

  addCharacter (character: Character) {
    this.characters.push(character);
  }

  getBlocks () {
    return this.map.getBlocks();
  }

  getCharacters () {
    return this.characters;
  }
}
