import { BaseBrush } from "./baseBrush";
import { Color } from "../common/common";

export class SolidColorBrush extends BaseBrush {
  color: Color;

  constructor(color: Color) {
    super();
    this.color = color;
  }

  getStyle(): string {
    return `#${this.color.r.toString(16 + 0x100).substr(-2)}${this.color.g
      .toString(16 + 0x100)
      .substr(-2)}${this.color.b.toString(16 + 0x100).substr(-2)}${this.color.a
      .toString(16 + 0x100)
      .substr(-2)}`;
  }
}
