import {World} from './World';
import {Vec2d} from '../../common/math/Vec2d';

export class Renderer {
  public width: number;
  public height: number;
  private context: CanvasRenderingContext2D;
  private world: World;
  private scale: number;
  private camera: Vec2d;

  constructor(context: CanvasRenderingContext2D,
              width: number,
              height: number,
              world: World,
              camera: Vec2d) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.camera = camera;

    this.scale = 5;

    this.world = world;
  }

  render () {
    var self = this;
    this.context.clearRect(0, 0, this.width, this.height);

    this.world.getBlocks().forEach(block => {
      self.context.fillStyle = 'green';
      self.context.fillRect(
        (block.position.x - self.camera.x) * self.scale + self.width / 2,
        (self.camera.y - block.position.y) * self.scale + self.height / 2,
        -(block.dimensions.x * self.scale),
        (block.dimensions.y * self.scale)
      );
    });

    this.world.getCharacters().forEach(character => {
      self.context.fillStyle = 'orange';
      self.context.fillRect(
        (character.position.x - self.camera.x + character.width / 2) * self.scale + self.width / 2,
        (self.camera.y - character.position.y - character.height / 2) * self.scale + self.height / 2,
        -(character.width * self.scale),
        (character.height * self.scale)
      );
    })
  }
}
