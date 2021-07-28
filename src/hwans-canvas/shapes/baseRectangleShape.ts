import { BaseShape } from "./baseShape";

export abstract class BaseRectangleShape extends BaseShape {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  constructor(x?: number, y?: number, width?: number, height?: number) {
    super();
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
  }
}
