import { BaseShape } from "./shapes/baseShape";

export class Page {
  private width: number;
  private height: number;
  private shapes: Array<BaseShape>;

  private renderTargetContext?: CanvasRenderingContext2D;
  private updateCount: number;

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.shapes = [];
    this.renderTargetContext = undefined;
    this.updateCount = 0;
  }

  public draw(context: CanvasRenderingContext2D): void {
    for (const shape of this.shapes) {
      context.save();
      shape.draw(context);
      context.restore();
    }
  }

  public addShape(shape: BaseShape): void {
    this.shapes.push(shape);
    this.onAddedShape(shape);
  }

  public removeShape(shape: BaseShape): boolean {
    const index = this.shapes.indexOf(shape);
    if (index >= 0) {
      this.shapes.splice(index, 1);
      this.onRemovedShape(shape);
      return true;
    } else {
      return false;
    }
  }

  public getShapes(): Array<BaseShape> {
    return this.shapes;
  }

  public getShapeCount(): number {
    return this.shapes.length;
  }

  public getShape(index: number): BaseShape {
    return this.shapes[index];
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public beginUpdate(): void {
    this.updateCount++;
  }

  public endUpdate(): void {
    this.updateCount--;
    this.invalidate();
  }

  public setRenderTarget(canvas?: HTMLCanvasElement): void {
    let context = undefined;
    if (canvas) {
      context = canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    this.renderTargetContext = context;
    this.invalidate();
  }

  public invalidate(): void {
    if (this.renderTargetContext && this.updateCount <= 0) {
      this.renderTargetContext.clearRect(
        0,
        0,
        this.renderTargetContext.canvas.width,
        this.renderTargetContext.canvas.height
      );
      this.draw(this.renderTargetContext);
    }
  }

  private onAddedShape(shape: BaseShape): void {
    shape.oninvalidated = () => {
      this.invalidate();
    };
    this.invalidate();
  }

  private onRemovedShape(shape: BaseShape): void {
    shape.oninvalidated = null;
    this.invalidate();
  }
}
