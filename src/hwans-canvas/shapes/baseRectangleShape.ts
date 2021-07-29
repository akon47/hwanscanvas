import { BaseShape } from "./baseShape";
import { BaseBrush } from "../brushes/baseBrush";
import { Point, Rect } from "../common/common";

export abstract class BaseRectangleShape extends BaseShape {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  constructor(
    fillBrush?: BaseBrush,
    strokeBrush?: BaseBrush,
    x?: number,
    y?: number,
    width?: number,
    height?: number
  ) {
    super(fillBrush, strokeBrush);
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
  }

  contains(point: Point): boolean {
    return new Rect(this.x, this.y, this.width, this.height).contains(point);
  }

  intersectsWith(rect: Rect): boolean {
    return new Rect(this.x, this.y, this.width, this.height).intersectsWith(
      rect
    );
  }

  drawHandle(context: CanvasRenderingContext2D): void {
    context.fillStyle = "red";
    context.strokeStyle = "#fff";
    context.lineWidth = 2;

    context.strokeRect(this.x, this.y, this.width, this.height);
    for (let i = 0; i < this.getHandleCount(); i++) {
      const handlePoint = this.getHandle(i);
    }
  }

  getHandleCount(): number {
    return 8;
  }

  getHandle(handleIndex: number): Point {
    const point = new Point();
    switch (handleIndex) {
      case 0:
        point.x = this.x;
        point.x = this.y;
        break;
      case 1:
        point.x = this.x + this.width / 2;
        point.x = this.y;
        break;
      case 2:
        point.x = this.x + this.width;
        point.x = this.y;
        break;
      case 3:
        point.x = this.x + this.width;
        point.y = this.y + this.height / 2;
        break;
      case 4:
        point.x = this.x + this.width;
        point.y = this.y + this.height;
        break;
      case 5:
        point.x = this.x + this.width / 2;
        point.y = this.y + this.height;
        break;
      case 6:
        point.x = this.x;
        point.y = this.y + this.height;
        break;
      case 7:
        point.x = this.x;
        point.y = this.y + this.height / 2;
        break;
    }
    return point;
  }
}
