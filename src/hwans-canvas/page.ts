import { BaseShape } from "./shapes/baseShape";

export class Page {
  width: number;
  height: number;
  shapes: Array<BaseShape>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.shapes = [];
  }

  draw(context: CanvasRenderingContext2D): void {
    for (const value of this.shapes) {
      value.draw(context);
    }
  }

  addShape(shape: BaseShape): void {
    this.shapes.push(shape);
  }
}
