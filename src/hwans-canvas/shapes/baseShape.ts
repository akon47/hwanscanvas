import { BaseBrush } from "../brushes/baseBrush";
import { SolidColorBrush } from "../brushes/solidColorBrush";
import { Color } from "../common/common";

export abstract class BaseShape {
  protected fillBrush: BaseBrush;
  protected strokeBrush: BaseBrush;

  constructor() {
    this.fillBrush = new SolidColorBrush(new Color(255, 255, 255, 255));
    this.strokeBrush = new SolidColorBrush(new Color(255, 255, 255, 255));
  }

  abstract draw(context: CanvasRenderingContext2D): void;
}
