export class Point {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
  }

  getLeft(): number {
    return this.x;
  }
  getTop(): number {
    return this.y;
  }
  getRight(): number {
    return this.x + this.width;
  }
  getBottom(): number {
    return this.y + this.height;
  }
  getCenterX(): number {
    return this.x + this.width / 2.0;
  }
  getCenterY(): number {
    return this.y + this.height / 2.0;
  }
  getCenter(): Point {
    return new Point(this.getCenterX(), this.getCenterY());
  }
}

export class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r?: number, g?: number, b?: number, a?: number) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 1;
  }
}
