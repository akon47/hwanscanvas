import { Point } from "../common/common";
import { BaseShape } from "../shapes/baseShape";
import { RectangleShape } from "../shapes/rectangleShape";
import { EditorToolBaseRectangleShape } from "./editorToolBaseRectangleShape";

export class EditorToolRectangleShape extends EditorToolBaseRectangleShape {
  createNewShape(point: Point): BaseShape {
    return new RectangleShape(undefined, undefined, point.x, point.y, 1, 1);
  }
}
