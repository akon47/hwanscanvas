import { BaseBrush } from "../brushes/baseBrush";
import { SolidColorBrush } from "../brushes/solidColorBrush";
import { Color } from "../common/common";

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

  protected callOnInvalidated(): void {
    this.oninvalidated?.();
  }
}
