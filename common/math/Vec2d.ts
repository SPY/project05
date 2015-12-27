export class Vec2d {


  static single(n: number) {
    return new Vec2d(n, n);
  }

  static zero: Vec2d = new Vec2d(0, 0);

  constructor(
    public x: number,
    public y: number
  ) {}

  fact(n: number) {
    return new Vec2d(this.x * n, this.y * n);
  }

  plus(v: Vec2d) {
    return new Vec2d(this.x + v.x, this.y + v.y);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vec2d {
    let l = this.length();
    return new Vec2d(this.x/l, this.y/l);
  }

  dot(v: Vec2d) {
    return this.x * v.x + this.y * v.y;
  }

  middle(v: Vec2d): Vec2d {
    return new Vec2d((this.x + v.x)/2, (this.y + v.y)/2);
  }
}

export function vec2d(x: number, y: number) {
  return new Vec2d(x, y);
}