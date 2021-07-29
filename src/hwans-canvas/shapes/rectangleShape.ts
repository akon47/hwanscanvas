import { BaseRectangleShape } from "./baseRectangleShape";
import { BaseBrush } from "../brushes/baseBrush";

export class RectangleShape extends BaseRectangleShape {
  constructor(
    fillBrush?: BaseBrush,
    strokeBrush?: BaseBrush,
    x?: number,
    y?: number,
    width?: number,
    height?: number
  ) {
    super(fillBrush, strokeBrush, x, y, width, height);
  }

  draw(context: CanvasRenderingContext2D): void {
    if (context) {
      context.fillStyle = this.fillBrush.getStyle();
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
