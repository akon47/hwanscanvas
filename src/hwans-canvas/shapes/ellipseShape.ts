import { BaseRectangleShape } from "./baseRectangleShape";
import { BaseBrush } from "../brushes/baseBrush";

export class EllipseShape extends BaseRectangleShape {
  constructor(
    fillBrush?: BaseBrush,
    strokeBrush?: BaseBrush,
    x?: number,
    y?: number,
    width?: number,
    height?: number
  ) {
    super(fillBrush, strokeBrush, x, y, width, height);
    super.name = "타원";
  }

  draw(context: CanvasRenderingContext2D): void {
    if (context) {
      context.fillStyle = this.fillBrush.getStyle();
      context.beginPath();
      context.ellipse(
        super.getCenterX(),
        super.getCenterY(),
        this.width / 2.0,
        this.height / 2.0,
        0,
        0,
        2 * Math.PI
      );
      context.closePath();
      context.fill();
    }
  }
}
