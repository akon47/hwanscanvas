/* eslint-disable @typescript-eslint/no-unused-vars */
import { Point, Rect } from "../common/common";
import { Page } from "../page";
import { BaseShape } from "../shapes/baseShape";
import { BaseEditorTool } from "./baseEditorTool";

interface HitInfo {
  shape?: BaseShape;
  handleIndex: number;
}

enum SelectionMode {
  None,
  GroupSelection,
  ShapeMove,
  HandleMove,
}

export class EditorToolPointer extends BaseEditorTool {
  private cursor: string;
  private selectionBoxPoint1: Point;
  private selectionBoxPoint2: Point;
  private selectionMode: SelectionMode;
  private selectedShapes: Array<BaseShape>;

  constructor() {
    super();
    this.cursor = "default";
    this.selectionMode = SelectionMode.None;
    this.selectionBoxPoint1 = new Point(0, 0);
    this.selectionBoxPoint2 = new Point(0, 0);
    this.selectedShapes = [];
  }

  public onMouseDown(page: Page, x: number, y: number, buttons: number): void {
    const cursorPoint = new Point(x, y);

    if (buttons == 1) {
      const hitInfo = this.makeHitTest(page, cursorPoint);
      if (hitInfo.shape) {
        if (hitInfo.handleIndex >= 0) {
          console.log("handle down");
          this.selectionMode = SelectionMode.HandleMove;
        } else {
          this.selectedShapes = [hitInfo.shape];
          this.selectionMode = SelectionMode.ShapeMove;
        }
      } else {
        this.selectedShapes = [];
        this.selectionMode = SelectionMode.GroupSelection;
        this.selectionBoxPoint1 = cursorPoint;
        this.selectionBoxPoint2 = cursorPoint;
      }
    }

    this.invalidate();
  }

  public onMouseMove(page: Page, x: number, y: number, buttons: number): void {
    const cursorPoint = new Point(x, y);

    const hitInfo = this.makeHitTest(page, cursorPoint);
    switch (this.selectionMode) {
      case SelectionMode.None:
        if (buttons == 0) {
          if (hitInfo.shape) {
            this.cursor = "pointer";
          } else {
            this.cursor = "default";
          }
        }
        break;
      case SelectionMode.GroupSelection:
        if (buttons == 1) {
          this.cursor = "default";
          this.selectionBoxPoint2 = cursorPoint;
        }
        break;
      case SelectionMode.ShapeMove:
        break;
    }

    this.invalidate();
  }

  public onMouseUp(page: Page, x: number, y: number, buttons: number): void {
    const cursorPoint = new Point(x, y);

    const selectionRect = this.getSelectionRect();
    switch (this.selectionMode) {
      case SelectionMode.None:
        break;
      case SelectionMode.GroupSelection:
        this.selectedShapes = [];
        for (let i = 0; i < page.getShapeCount(); i++) {
          const shape = page.getShape(i);
          if (shape.intersectsWith(selectionRect)) {
            this.selectedShapes.push(shape);
          }
        }
        break;
    }

    this.selectionMode = SelectionMode.None;
    this.invalidate();
  }

  public getCursor(): string {
    return this.cursor;
  }

  private getSelectionRect(): Rect {
    return new Rect(
      Math.min(this.selectionBoxPoint1.x, this.selectionBoxPoint2.x),
      Math.min(this.selectionBoxPoint1.y, this.selectionBoxPoint2.y),
      Math.abs(this.selectionBoxPoint1.x - this.selectionBoxPoint2.x),
      Math.abs(this.selectionBoxPoint1.y - this.selectionBoxPoint2.y)
    );
  }

  protected draw(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (const shape of this.selectedShapes) {
      context.save();
      shape.drawHandle(context);
      context.restore();
    }

    const selectionRect = this.getSelectionRect();
    switch (this.selectionMode) {
      case SelectionMode.GroupSelection:
        context.fillStyle = "#c8c8c850";
        context.strokeStyle = "#fff";
        context.lineWidth = 2;

        context.fillRect(
          selectionRect.x,
          selectionRect.y,
          selectionRect.width,
          selectionRect.height
        );
        context.strokeRect(
          selectionRect.x,
          selectionRect.y,
          selectionRect.width,
          selectionRect.height
        );

        break;
    }
  }

  makeHitTest(page: Page, cursorPoint: Point): HitInfo {
    let hitShape = undefined;
    let hitHandleIndex = -1;

    if (page) {
      for (let i = page.getShapeCount(); i >= 0; i--) {
        const shape = page.getShape(i);
        if (shape && shape.contains(cursorPoint)) {
          hitShape = shape;
          hitHandleIndex = -1;
          break;
        }
      }
    }

    return {
      shape: hitShape,
      handleIndex: hitHandleIndex,
    };
  }
}
