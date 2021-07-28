import { BaseRectangleShape } from "./baseRectangleShape";

export class RectangleShape extends BaseRectangleShape {
  constructor(x?: number, y?: number, width?: number, height?: number) {
    super(x, y, width, height);
  }

  draw(context: CanvasRenderingContext2D): void {
    if (context) {
      context.fillStyle = this.fillBrush.getStyle();
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
