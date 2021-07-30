/* eslint-disable @typescript-eslint/no-unused-vars */
import { CursorType, Point, Rect } from "../common/common";
import { Page } from "../page";
import { BaseShape } from "../shapes/baseShape";
import { BaseEditorTool, EditorToolResult } from "./baseEditorTool";

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
  private selectionBoxPoint1: Point;
  private selectionBoxPoint2: Point;
  private downPoint: Point;
  private movePoint: Point;
  private downHandleIndex: number;
  private downHandleShape?: BaseShape;
  private selectionMode: SelectionMode;
  private selectedShapes: Array<BaseShape>;

  constructor() {
    super();
    this.selectionMode = SelectionMode.None;
    this.selectionBoxPoint1 = new Point();
    this.selectionBoxPoint2 = new Point();
    this.downHandleIndex = -1;
    this.downHandleShape = undefined;
    this.downPoint = new Point();
    this.movePoint = new Point();
    this.selectedShapes = [];
  }

  public onLoaded(): CursorType {
    this.selectedShapes = [];
    this.selectionMode = SelectionMode.None;
    this.invalidate();
    return CursorType.Arrow;
  }

  private getCursor(page: Page, point: Point): CursorType {
    const hitInfo = this.makeHitTest(page, this.movePoint);
    if (hitInfo.shape) {
      if (hitInfo.handleIndex >= 0) {
        return hitInfo.shape.getHandleCursor(hitInfo.handleIndex);
      } else {
        return CursorType.SizeAll;
      }
    } else {
      return CursorType.Arrow;
    }
  }

  public onMouseDown(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null {
    const editorToolResult = {
      changedCursorType: CursorType.Arrow,
    } as EditorToolResult;

    this.downPoint = new Point(x, y);

    if (buttons == 1) {
      const hitInfo = this.makeHitTest(page, this.downPoint);
      if (hitInfo.shape) {
        if (hitInfo.handleIndex >= 0) {
          this.selectedShapes = [hitInfo.shape];
          this.selectionMode = SelectionMode.HandleMove;
          this.downHandleIndex = hitInfo.handleIndex;
          this.downHandleShape = hitInfo.shape;
          editorToolResult.changedCursorType = CursorType.Cross;
        } else {
          if (this.selectedShapes.indexOf(hitInfo.shape) < 0) {
            this.selectedShapes = [hitInfo.shape];
          }
          this.selectionMode = SelectionMode.ShapeMove;
          editorToolResult.changedCursorType = CursorType.SizeAll;
        }
      } else {
        this.selectedShapes = [];
        this.selectionMode = SelectionMode.GroupSelection;
        this.selectionBoxPoint1 = this.downPoint;
        this.selectionBoxPoint2 = this.downPoint;
      }
    }

    this.invalidate();
    return editorToolResult;
  }

  public onMouseMove(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null {
    const editorToolResult = {
      changedCursorType: CursorType.Arrow,
    } as EditorToolResult;

    this.movePoint = new Point(x, y);

    switch (this.selectionMode) {
      case SelectionMode.None:
        editorToolResult.changedCursorType = this.getCursor(
          page,
          this.movePoint
        );
        break;
      case SelectionMode.GroupSelection:
        if (buttons == 1) {
          editorToolResult.changedCursorType = CursorType.Arrow;
          this.selectionBoxPoint2 = this.movePoint;
        }
        break;
      case SelectionMode.ShapeMove:
        editorToolResult.changedCursorType = CursorType.SizeAll;
        break;
      case SelectionMode.HandleMove:
        editorToolResult.changedCursorType = CursorType.Cross;
        break;
    }

    this.invalidate();
    return editorToolResult;
  }

  public onMouseUp(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null {
    const editorToolResult = {
      changedCursorType: CursorType.Arrow,
    } as EditorToolResult;

    const cursorPoint = new Point(x, y);

    switch (this.selectionMode) {
      case SelectionMode.None:
        break;
      case SelectionMode.GroupSelection: {
        const selectionRect = this.getSelectionRect();
        this.selectedShapes = [];
        for (let i = 0; i < page.getShapeCount(); i++) {
          const shape = page.getShape(i);
          if (shape.intersectsWith(selectionRect)) {
            this.selectedShapes.push(shape);
          }
        }
        break;
      }
      case SelectionMode.ShapeMove: {
        const dx = cursorPoint.x - this.downPoint.x;
        const dy = cursorPoint.y - this.downPoint.y;
        if (dx != 0 || dy != 0) {
          for (const shape of this.selectedShapes) {
            shape.offset(dx, dy);
          }
        }
        break;
      }
      case SelectionMode.HandleMove: {
        const dx = this.movePoint.x - this.downPoint.x;
        const dy = this.movePoint.y - this.downPoint.y;
        if ((dx != 0 || dy != 0) && this.downHandleShape) {
          this.downHandleShape.handleOffset(dx, dy, this.downHandleIndex);
        }
        break;
      }
    }

    this.selectionMode = SelectionMode.None;
    this.invalidate();
    return editorToolResult;
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
    this.drawHandles(context, this.selectedShapes);

    switch (this.selectionMode) {
      case SelectionMode.GroupSelection: {
        const selectionRect = this.getSelectionRect();
        context.fillStyle = "#c8c8c850";
        context.strokeStyle = "#fff";
        context.lineWidth = 2 / this.scaleFactor;

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
      case SelectionMode.ShapeMove: {
        const dx = this.movePoint.x - this.downPoint.x;
        const dy = this.movePoint.y - this.downPoint.y;
        if (dx != 0 || dy != 0) {
          context.translate(dx, dy);
          context.globalAlpha = 0.5;
          for (const shape of this.selectedShapes) {
            shape.draw(context);
          }
        }
        break;
      }
      case SelectionMode.HandleMove: {
        const dx = this.movePoint.x - this.downPoint.x;
        const dy = this.movePoint.y - this.downPoint.y;
        if ((dx != 0 || dy != 0) && this.downHandleShape) {
          const handleIndex = this.downHandleShape.handleOffset(
            dx,
            dy,
            this.downHandleIndex
          );
          context.globalAlpha = 0.5;
          this.downHandleShape.draw(context);
          this.downHandleShape.handleOffset(-dx, -dy, handleIndex);
        }
        break;
      }
    }
  }

  makeHitTest(page: Page, cursorPoint: Point): HitInfo {
    for (const shape of this.selectedShapes) {
      for (let i = 0; i < shape.getHandleCount(); i++) {
        const handleRect = this.getHandleRect(shape.getHandle(i));
        if (handleRect.contains(cursorPoint)) {
          return {
            shape: shape,
            handleIndex: i,
          };
        }
      }
    }

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
