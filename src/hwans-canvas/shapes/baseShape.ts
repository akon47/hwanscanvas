import { BaseBrush } from "../brushes/baseBrush";
import { SolidColorBrush } from "../brushes/solidColorBrush";
import { Color, Rect, Point, CursorType } from "../common/common";

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

  abstract getHandleCount(): number;
  abstract getHandle(handleIndex: number): Point;
  abstract getHandleCursor(handleIndex: number): CursorType;
  abstract moveHandleTo(point: Point, handleIndex: number): number;

  public handleOffset(dx: number, dy: number, handleIndex: number): number {
    if (handleIndex >= 0 && handleIndex < this.getHandleCount()) {
      const handlePoint = this.getHandle(handleIndex);
      return this.moveHandleTo(
        new Point(handlePoint.x + dx, handlePoint.y + dy),
        handleIndex
      );
    }
    return -1;
  }

  abstract getBounds(): Rect;

  abstract contains(point: Point): boolean;
  abstract intersectsWith(rect: Rect): boolean;

  abstract offset(x: number, y: number): void;

  protected invalidate(): void {
    this.oninvalidated?.();
  }
}
