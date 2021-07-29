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
  private downPoint: Point;
  private movePoint: Point;
  private selectionMode: SelectionMode;
  private selectedShapes: Array<BaseShape>;

  constructor() {
    super();
    this.cursor = "default";
    this.selectionMode = SelectionMode.None;
    this.selectionBoxPoint1 = new Point();
    this.selectionBoxPoint2 = new Point();
    this.downPoint = new Point();
    this.movePoint = new Point();
    this.selectedShapes = [];
  }

  public onLoaded(): void {
    this.cursor = "default";
    this.selectedShapes = [];
    this.selectionMode = SelectionMode.None;
  }

  public onMouseDown(page: Page, x: number, y: number, buttons: number): void {
    this.downPoint = new Point(x, y);

    if (buttons == 1) {
      const hitInfo = this.makeHitTest(page, this.downPoint);
      if (hitInfo.shape) {
        if (hitInfo.handleIndex >= 0) {
          console.log("handle down");
          this.selectionMode = SelectionMode.HandleMove;
        } else {
          if (this.selectedShapes.indexOf(hitInfo.shape) < 0) {
            this.selectedShapes = [hitInfo.shape];
          }
          this.selectionMode = SelectionMode.ShapeMove;
        }
      } else {
        this.selectedShapes = [];
        this.selectionMode = SelectionMode.GroupSelection;
        this.selectionBoxPoint1 = this.downPoint;
        this.selectionBoxPoint2 = this.downPoint;
      }
    }

    this.invalidate();
  }

  public onMouseMove(page: Page, x: number, y: number, buttons: number): void {
    this.movePoint = new Point(x, y);

    switch (this.selectionMode) {
      case SelectionMode.None: {
        const hitInfo = this.makeHitTest(page, this.movePoint);
        if (buttons == 0) {
          if (hitInfo.shape) {
            this.cursor = "all-scroll";
          } else {
            this.cursor = "default";
          }
        }
        break;
      }
      case SelectionMode.GroupSelection:
        if (buttons == 1) {
          this.cursor = "default";
          this.selectionBoxPoint2 = this.movePoint;
        }
        break;
      case SelectionMode.ShapeMove:
        break;
    }

    this.invalidate();
  }

  public onMouseUp(page: Page, x: number, y: number, buttons: number): void {
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
      shape.drawHandle(context, this.scaleFactor);
      context.restore();
    }

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
