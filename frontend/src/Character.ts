import {Vec2d} from '../../common/math/Vec2d';

export class Character {
  public position: Vec2d;
  public width: number;
  public height: number;

  constructor(position: Vec2d) {
    this.width = 1;
    this.height = 1;
    this.position = position;
  }

  setPosition (position: Vec2d) {
    this.position = position;
  }
}
