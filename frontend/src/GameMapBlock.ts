import {vec2d, Vec2d} from '../../common/math/Vec2d';

export class GameMapBlock {
  public position: Vec2d;
  public dimensions: Vec2d;

  constructor (position: Vec2d, dimensions: Vec2d) {
    this.position = position;
    this.dimensions = dimensions;
  }
}
