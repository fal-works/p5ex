/**
 * Parameters for creating p5ex.ScalableCanvas instance.
 */
export interface ScalableCanvasParameters {
  /**
   * Scaled width (the actual pixel size of the canvas).
   */
  scaledWidth: number;

  /**
   * Scaled height (the actual pixel size of the canvas).
   */
  scaledHeight: number;

  /**
   * Internal length of the short side of screen.
   */
  nonScaledShortSideLength: number;
}

export const DUMMY_PARAMETERS = {
  scaledWidth: 100,
  scaledHeight: 100,
  nonScaledShortSideLength: 100,
};

/**
 * (To be filled)
 * @hideConstructor
 */
export class ScalableCanvas {
  /**
   * Corresponding canvas element.
   * (The official p5.js type description defines it as an HTMLCanvasElement object,
   *  however it should actually be handled as a p5.Renderer instance.)
   */
  readonly canvasElement: any;

  private readonly p: p5;
  private nonScaledShortSideLength: number;

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

  constructor(
    p5Instance: p5,
    parameter: ScalableCanvasParameters,
    node: HTMLElement,
    rendererType?: string,
  ) {
    this.p = p5Instance;
    this.canvasElement = p5Instance.createCanvas(
      parameter.scaledWidth, parameter.scaledHeight, rendererType,
    );
    (this.canvasElement as any).parent(node);
    this.nonScaledShortSideLength = parameter.nonScaledShortSideLength;
    this.updateSize();
  }

  /**
   * (To be filled)
   * @param parameter
   */
  resize(parameter: ScalableCanvasParameters): void {
    this.p.resizeCanvas(
      parameter.scaledWidth,
      parameter.scaledHeight,
    );
    this.nonScaledShortSideLength = parameter.nonScaledShortSideLength;
    this.updateSize();
  }

  /**
   * (To be filled)
   */
  updateSize(): void {
    const p = this.p;
    this._scaleFactor = Math.min(p.width, p.height) / this.nonScaledShortSideLength;
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
