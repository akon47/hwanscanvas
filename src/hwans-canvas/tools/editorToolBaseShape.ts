/* eslint-disable @typescript-eslint/no-unused-vars */
import { CursorType, Point } from "../common/common";
import { Page } from "../page";
import { BaseShape } from "../shapes/baseShape";
import { BaseEditorTool, EditorToolResult } from "./baseEditorTool";
import { EditorToolType } from "./editorToolType";

export abstract class EditorToolBaseShape extends BaseEditorTool {
  protected addedShape?: BaseShape;

  constructor() {
    super();
    this.addedShape = undefined;
  }

  onLoaded(): CursorType {
    this.addedShape = undefined;
    this.invalidate();
    return CursorType.Arrow;
  }

  protected abstract createNewShape(point: Point): BaseShape;

  public onMouseDown(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null {
    this.addedShape = this.createNewShape(new Point(x, y));
    page.addShape(this.addedShape);
    this.invalidate();
    return null;
  }

  public onMouseUp(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null {
    return {
      changedCursorType: CursorType.Arrow,
      changedEditorToolType: EditorToolType.Pointer,
      addedShape: this.addedShape,
    } as EditorToolResult;
  }

  protected draw(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    if (this.addedShape) {
      this.drawHandles(context, [this.addedShape]);
    }
  }
}
