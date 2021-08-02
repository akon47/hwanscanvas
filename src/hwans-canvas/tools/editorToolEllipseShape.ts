import { Point } from "../common/common";
import { BaseShape } from "../shapes/baseShape";
import { EllipseShape } from "../shapes/ellipseShape";
import { EditorToolBaseRectangleShape } from "./editorToolBaseRectangleShape";

export class EditorToolEllipseShape extends EditorToolBaseRectangleShape {
  createNewShape(point: Point): BaseShape {
    return new EllipseShape(undefined, undefined, point.x, point.y, 1, 1);
  }
}
