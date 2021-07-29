import { Page } from "../page";

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

  public abstract onLoaded(): void;

  public abstract onMouseDown(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): void;
  public abstract onMouseMove(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): void;
  public abstract onMouseUp(
    page: Page,
    x: number,
    y: number,
    buttons: number
  ): void;
  public abstract getCursor(): string;

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
}
