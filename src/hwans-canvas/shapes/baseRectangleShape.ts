import { BaseShape } from "./baseShape";
import { BaseBrush } from "../brushes/baseBrush";
import { CursorType, Point, Rect } from "../common/common";

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

  getBounds(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  getHandleCount(): number {
    return 8;
  }

  getHandle(handleIndex: number): Point {
    const point = new Point();
    switch (handleIndex) {
      case 0:
        point.x = this.x;
        point.y = this.y;
        break;
      case 1:
        point.x = this.x + this.width / 2;
        point.y = this.y;
        break;
      case 2:
        point.x = this.x + this.width;
        point.y = this.y;
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

  getHandleCursor(handleIndex: number): CursorType {
    switch (handleIndex) {
      case 0:
        return CursorType.SizeNWSE;
      case 1:
        return CursorType.SizeNS;
      case 2:
        return CursorType.SizeNESW;
      case 3:
        return CursorType.SizeWE;
      case 4:
        return CursorType.SizeNWSE;
      case 5:
        return CursorType.SizeNS;
      case 6:
        return CursorType.SizeNESW;
      case 7:
        return CursorType.SizeWE;
      default:
        return CursorType.Arrow;
    }
  }

  moveHandleTo(point: Point, handleIndex: number): number {
    let left = this.x;
    let top = this.y;
    let right = this.x + this.width;
    let bottom = this.y + this.height;

    switch (handleIndex) {
      case 0:
        left = point.x;
        top = point.y;
        break;
      case 1:
        top = point.y;
        break;
      case 2:
        right = point.x;
        top = point.y;
        break;
      case 3:
        right = point.x;
        break;
      case 4:
        right = point.x;
        bottom = point.y;
        break;
      case 5:
        bottom = point.y;
        break;
      case 6:
        left = point.x;
        bottom = point.y;
        break;
      case 7:
        left = point.x;
        break;
    }

    if (left > right) {
      switch (handleIndex) {
        case 0:
          handleIndex = 2;
          break;
        case 2:
          handleIndex = 0;
          break;
        case 3:
          handleIndex = 7;
          break;
        case 4:
          handleIndex = 6;
          break;
        case 6:
          handleIndex = 4;
          break;
        case 7:
          handleIndex = 3;
          break;
      }
    }

    if (top > bottom) {
      switch (handleIndex) {
        case 0:
          handleIndex = 6;
          break;
        case 1:
          handleIndex = 5;
          break;
        case 2:
          handleIndex = 4;
          break;
        case 4:
          handleIndex = 2;
          break;
        case 5:
          handleIndex = 1;
          break;
        case 6:
          handleIndex = 0;
          break;
      }
    }

    this.setLocation(
      left <= right ? left : right,
      top <= bottom ? top : bottom,
      Math.abs(right - left),
      Math.abs(bottom - top)
    );
    return handleIndex;
  }

  setLocation(x: number, y: number, width: number, height: number): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.invalidate();
  }

  offset(x: number, y: number): void {
    this.x += x;
    this.y += y;
    this.invalidate();
  }
}
