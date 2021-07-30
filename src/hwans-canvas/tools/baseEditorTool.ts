import { CursorType, Point, Rect } from "../common/common";
import { Page } from "../page";
import { BaseShape } from "../shapes/baseShape";
import { EditorToolType } from "./editorToolType";

export interface EditorToolResult {
  changedCursorType: CursorType;
  changedEditorToolType?: EditorToolType;
  addedShape?: BaseShape;
}

export abstract class BaseEditorTool {
  private renderTargetContext?: CanvasRenderingContext2D;
  private updateCount: number;

  protected scaleFactor: number;

  public constructor() {
    this.renderTargetContext = undefined;
    this.updateCount = 0;
    this.scaleFactor = 1;
  }

  public setScaleFactor(scaleFactor: number): void {
    this.scaleFactor = scaleFactor;
    this.invalidate();
  }

  public abstract onLoaded(): CursorType;

  public abstract onMouseDown(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null;
  public abstract onMouseMove(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null;
  public abstract onMouseUp(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): EditorToolResult | null;

  protected abstract draw(context: CanvasRenderingContext2D): void;

  public setRenderTarget(canvas?: HTMLCanvasElement): void {
    let context = undefined;
    if (canvas) {
      context = canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    this.renderTargetContext = context;
    this.invalidate();
  }

  public beginUpdate(): void {
    this.updateCount++;
  }

  public endUpdate(): void {
    this.updateCount--;
    this.invalidate();
  }

  public invalidate(): void {
    if (this.renderTargetContext && this.updateCount <= 0) {
      this.renderTargetContext.save();
      this.draw(this.renderTargetContext);
      this.renderTargetContext.restore();
    }
  }

  protected getHandleWidth(): number {
    return 5 / (this.scaleFactor || 1);
  }

  protected getHandleLineWidth(): number {
    return 2 / (this.scaleFactor || 1);
  }

  protected getHandleRect(point: Point): Rect {
    const handleWidth = this.getHandleWidth();
    return new Rect(
      point.x - handleWidth,
      point.y - handleWidth,
      handleWidth * 2,
      handleWidth * 2
    );
  }

  protected drawHandles(
    context: CanvasRenderingContext2D,
    shaeps: Array<BaseShape>
  ): void {
    context.save();
    context.fillStyle = "#f00";
    context.strokeStyle = "#f00";
    context.lineWidth = this.getHandleLineWidth();

    for (const shape of shaeps) {
      const bounds = shape.getBounds();
      context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
      for (let i = 0; i < shape.getHandleCount(); i++) {
        const handleRect = this.getHandleRect(shape.getHandle(i));
        context.fillRect(
          handleRect.x,
          handleRect.y,
          handleRect.width,
          handleRect.height
        );
      }
    }
    context.restore();
  }
}
