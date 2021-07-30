/* eslint-disable @typescript-eslint/no-unused-vars */
import { CursorType, Point } from "../common/common";
import { Page } from "../page";
import { EditorToolResult } from "./baseEditorTool";
import { EditorToolBaseShape } from "./editorToolBaseShape";
import { EditorToolType } from "./editorToolType";

export abstract class EditorToolBaseRectangleShape extends EditorToolBaseShape {
  activeHandleIndex: number;

  constructor() {
    super();
    this.activeHandleIndex = -1;
  }

  onLoaded(): CursorType {
    super.onLoaded();
    return CursorType.Cross;
  }

  public onMouseDown(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null {
    super.onMouseDown(page, x, y, buttons);
    this.activeHandleIndex = 4;
    return {
      changedCursorType: CursorType.Cross,
    } as EditorToolResult;
  }

  public onMouseMove(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null {
    if (this.addedShape) {
      this.activeHandleIndex = this.addedShape.moveHandleTo(
        new Point(x, y),
        this.activeHandleIndex
      );
    }
    this.invalidate();
    return {
      changedCursorType: CursorType.Cross,
    } as EditorToolResult;
  }
}
