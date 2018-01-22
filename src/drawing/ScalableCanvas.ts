/**
 * (To be filled)
 */
export class ScalableCanvas {
  /**
   * Corresponding HTML canvas element.
   */
  readonly canvasElement: HTMLElement;

  private readonly p: p5;

  // tslint:disable:variable-name
  private _scaleFactor: number;
  private _inversedScaleFactor: number;
  private _nonScaledWidth: number;
  private _nonScaledHeight: number;
  private _aspectRatio: number;
  // tslint:enable

  /**
   * (To be filled)
   */
  get scaleFactor(): number {
    return this._scaleFactor;
  }

  /**
   * (To be filled)
   */
  get nonScaledWidth(): number {
    return this._nonScaledWidth;
  }

  /**
   * (To be filled)
   */
  get nonScaledHeight(): number {
    return this._nonScaledHeight;
  }

  /**
   * (To be filled)
   */
  get aspectRatio(): number {
    return this._aspectRatio;
  }

  /**
   * Calls createCanvas() of the current p5 instance and
   * sets common variables related to the canvas size.
   * @param {p5} p5Instance - p5 instance.
   * @param {number} scaledWidth - Scaled width (the actual pixel size of the canvas).
   * @param {number} scaledHeight - Scaled height (the actual pixel size of the canvas).
   * @param {number} nonScaledShortSideLength - Internal length of the short side of the screen.
   * @param {string} [rendererType] - Either P2D or WEBGL.
   */
  constructor(
    p5Instance: p5,
    scaledWidth: number,
    scaledHeight: number,
    nonScaledShortSideLength: number,
    rendererType?: string,
  ) {
    this.p = p5Instance;

    this.canvasElement = p5Instance.createCanvas(scaledWidth, scaledHeight, rendererType);

    this.updateSize(nonScaledShortSideLength);
  }

  /**
   * (To be filled)
   * @param nonScaledShortSideLength
   */
  updateSize(nonScaledShortSideLength: number): void {
    const p = this.p;
    this._scaleFactor = Math.min(p.width, p.height) / nonScaledShortSideLength;
    this._inversedScaleFactor = 1 / this._scaleFactor;
    this._nonScaledWidth = p.width / this._scaleFactor;
    this._nonScaledHeight = p.height / this._scaleFactor;
    this._aspectRatio = p.width / p.height;
  }

  /**
   * Runs scale() of the current p5 instance for fitting the sketch to the current canvas.
   * Should be called every frame before drawing objects on the canvas.
   */
  scale(): void {
    this.p.scale(this._scaleFactor);
  }

  /**
   * Runs scale() with the inversed scale factor.
   */
  cancelScale(): void {
    this.p.scale(this._inversedScaleFactor);
  }

  /**
   * Converts a length value on the scaled canvas to the non-scaled one.
   * Typically used for interpreting mouseX and mouseY.
   * @param {number} scaledLength - scaled length value
   */
  getNonScaledValueOf(scaledLength: number): number {
    return scaledLength / this._scaleFactor;
  }
}

/**
 * (To be filled)
 */
export const enum ScalableCanvasType {
  SQUARE640x640,
  RECT640x480,
  FULL,
  CUSTOM,
}
