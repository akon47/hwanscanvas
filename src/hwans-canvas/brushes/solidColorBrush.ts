import { BaseBrush } from "./baseBrush";
import { Color } from "../common/common";

export class SolidColorBrush extends BaseBrush {
  color: Color;

  constructor(color: Color) {
    super();
    this.color = color;
  }

  getStyle(): string {
    return `#${(this.color.r + 0x100).toString(16).substr(-2)}${(
      this.color.g + 0x100
    )
      .toString(16)
      .substr(-2)}${(this.color.b + 0x100).toString(16).substr(-2)}${(
      this.color.a + 0x100
    )
      .toString(16)
      .substr(-2)}`;
  }
}
