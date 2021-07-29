import { BaseBrush } from "../brushes/baseBrush";
import { SolidColorBrush } from "../brushes/solidColorBrush";
import { Color, Rect, Point } from "../common/common";

export abstract class BaseShape {
  protected fillBrush: BaseBrush;
  protected strokeBrush: BaseBrush;
  public oninvalidated: (() => void) | null;

  constructor(fillBrush?: BaseBrush, strokeBrush?: BaseBrush) {
    this.fillBrush =
      fillBrush || new SolidColorBrush(new Color(255, 255, 255, 255));
    this.strokeBrush =
      strokeBrush || new SolidColorBrush(new Color(255, 255, 255, 255));
    this.oninvalidated = null;
  }

  abstract draw(context: CanvasRenderingContext2D): void;

  abstract drawHandle(
    context: CanvasRenderingContext2D,
    scaleFactor?: number
  ): void;
  abstract getHandleCount(): number;
  abstract getHandle(handleIndex: number): Point;

  abstract contains(point: Point): boolean;
  abstract intersectsWith(rect: Rect): boolean;

  abstract offset(x?: number, y?: number): void;

  protected invalidate(): void {
    this.oninvalidated?.();
  }
}
