import p5exInterface from './p5exInterface';

/**
 * Extension of p5 class.
 */
class p5exClass extends p5 implements p5exInterface {
  /**
   * Current renderer object, either the p5ex instance itself or any p5.Graphics instance.
   * Will be used as the drawing target.
   */
  currentRenderer: p5exClass;

  /**
   * Sets the current renderer object.
   * @param renderer
   */
  setCurrentRenderer(renderer: p5exClass | p5.Graphics): void {
    this.currentRenderer = renderer as p5exClass;
  }

  /**
   * The width and height of the HTML element which contains the sketch.
   * If the HTML element is not provided, the width and height of the window will be set.
   */
  readonly maxCanvasRegion: {
    width: number,
    height: number,
    getShortSideLength: () => number,
  };

  /**
   * (To be filled)
   */
  scalableCanvas: ScalableCanvas;


  /**
   * The HTML element which holds the p5 sketch.
   */
  node: HTMLElement;

  private scalableCanvasType: ScalableCanvasType;

  // tslint:disable:variable-name
  private _idealFrameRate: number;
  private _unitAngleSpeed: number;
  private _unitSpeed: number;
  private _unitAccelerationMagnitude: number;
  // tslint:enable

  /**
   * The ideal frame rate which was set by setFrameRate().
   */
  get idealFrameRate(): number { return this._idealFrameRate; }

  /**
   * Anglular displacement in radians per frame which corresponds to 1 cycle per second.
   * Set by setFrameRate().
   */
  get unitAngleSpeed(): number { return this._unitAngleSpeed; }

  /**
   * Positional displacement per frame which corresponds to 1 unit length per second.
   * Set by setFrameRate().
   */
  get unitSpeed(): number { return this._unitSpeed; }

  /**
   * Change of speed per frame which corresponds to 1 unit speed per second.
   * Set by setFrameRate().
   */
  get unitAccelerationMagnitude(): number { return this._unitAccelerationMagnitude; }

  /**
   * Constructor of class p5ex.
   * @param sketch
   * @param node
   * @param sync
   */
  constructor(
    sketch: Function, node?: HTMLElement | boolean | string, sync?: boolean,
  ) {
    super(
      sketch,
      typeof node === 'string' ? document.getElementById(node) || undefined : node,
      sync,
    );

    if (!node || typeof node === 'boolean') {
      this.node = document.body;
    } else {
      this.node = typeof node === 'string' ? document.getElementById(node) || document.body : node;
    }

    this.currentRenderer = this;

    this.maxCanvasRegion = {
      width: 0,
      height: 0,
      getShortSideLength() { return Math.min(this.width, this.height); },
    };
    this.updateMaxCanvasRegion();
    this.setFrameRate();
  }

  /**
   * Calls frameRate() and sets variables related to the frame rate.
   * @param {number} [fps=60] - The ideal frame rate per second.
   */
  setFrameRate(fps: number | undefined = 60): p5exClass {
    this.frameRate(fps);

    if (fps) {
      this._idealFrameRate = fps;
      this._unitAngleSpeed = 2 * Math.PI / this._idealFrameRate;
      this._unitSpeed = 1 / this._idealFrameRate;
      this._unitAccelerationMagnitude = this._unitSpeed / this._idealFrameRate;
    }

    return this;
  }

  /**
   * Updates the value of the variable maxCanvasRegion.
   */
  updateMaxCanvasRegion(): void {
    this.maxCanvasRegion.width = this.windowWidth;
    this.maxCanvasRegion.height = this.windowHeight;

    if (this.node === document.body) return;

    const containerRect = this.node.getBoundingClientRect();
    this.maxCanvasRegion.width = containerRect.width;
    this.maxCanvasRegion.height = containerRect.height;
  }

  /**
   * Create an instance of ScalableCanvas. This includes calling of createCanvas().
   * @param {ScalableCanvasType} type - Type chosen from p5ex.ScalableCanvasType.
   * @param {ScalableCanvasParameters} [parameters] - Parameters for type CUSTOM.
   * @param {string} [rendererType] - Either P2D or WEBGL.
   */
  createScalableCanvas(
    type: ScalableCanvasType,
    parameters?: ScalableCanvasParameters,
    rendererType?: string,
  ): void {
    this.scalableCanvasType = type;
    this.scalableCanvas = new ScalableCanvas(
      this,
      this.createScalableCanvasParameter(type, parameters),
      this.node,
      rendererType,
    );
  }

  /**
   * Resizes the ScalableCanvas. Does not work on OpenProcessing.
   * @param {ScalableCanvasType} [type] - Type chosen from p5ex.ScalableCanvasType.
   *     If undefined, the last used type will be used again.
   * @param {ScalableCanvasParameters} [parameters] - Parameters for type CUSTOM.
   */
  resizeScalableCanvas(
    type?: ScalableCanvasType,
    parameters?: ScalableCanvasParameters,
  ): void {
    this.scalableCanvas.resize(
      this.createScalableCanvasParameter(type || this.scalableCanvasType, parameters),
    );
  }

  protected createScalableCanvasParameter(
    type: ScalableCanvasType,
    parameters?: ScalableCanvasParameters,
  ): ScalableCanvasParameters {
    this.updateMaxCanvasRegion();
    const maxShortSide = this.maxCanvasRegion.getShortSideLength();

    switch (type) {
      case ScalableCanvasTypes.SQUARE640x640:
        return {
          scaledWidth: maxShortSide,
          scaledHeight: maxShortSide,
          nonScaledShortSideLength: 640,
        };
      case ScalableCanvasTypes.RECT640x480:
        return {
          scaledWidth: maxShortSide,
          scaledHeight: 0.75 * maxShortSide,
          nonScaledShortSideLength: 480,
        };
      case ScalableCanvasTypes.FULL:
        return {
          scaledWidth: this.maxCanvasRegion.width,
          scaledHeight: this.maxCanvasRegion.height,
          nonScaledShortSideLength: 640,
        };
      default:
        return parameters || SCALABLE_CANVAS_DUMMY_PARAMETERS;
    }
  }

  /**
   * Creates a new p5ex.ShapeColor instance.
   * @param {p5.Color | null | undefined} strokeColor - Color for stroke(). Null means noStroke().
   * @param {p5.Color | null | undefined} fillColor - Color for fill(). Null means noFill().
   * @param {boolean} [alphaEnabled]
   * @param {number} [alphaResolution]
   */
  shapeColor(
    strokeColor: p5.Color | null | undefined, fillColor: p5.Color | null | undefined,
    alphaEnabled?: boolean, alphaResolution?: number,
  ): ShapeColor {
    return new ShapeColor(
      this, strokeColor, fillColor, alphaEnabled, alphaResolution,
    );
  }

  /**
   * Creates a new p5ex.Drawer instance.
   * @param element
   * @param drawParam
   */
  createDrawer(
    element: Drawable, drawParam: DrawParameter,
  ): Drawer {
    return new Drawer(this, element, drawParam);
  }

  /**
   * Creates a new p5ex.DrawerBuiler instance.
   */
  createDrawerBuilder(): DrawerBuilder {
    return new DrawerBuilder(this);
  }

  /**
   * Creates a new p5ex.AlphaBackground instance.
   * @param backgroundColor
   * @param drawIntervalFrameCount
   * @param blendModeString
   * @param defaultBlendModeString
   */
  createAlphaBackground(
    backgroundColor: p5.Color,
    drawIntervalFrameCount: number = 1,
    blendModeString?: string,
    defaultBlendModeString?: string,
  ): AlphaBackground {
    return new AlphaBackground(
      this,
      backgroundColor,
      drawIntervalFrameCount,
      blendModeString,
      defaultBlendModeString,
    );
  }

  /**
   * Returns the difference of two colors. The alpha values of the original colors will be ignored.
   * @param {p5.Color} c1 - The color to subtract from
   * @param {p5.Color} c2 - The color to subtract
   * @param {number} [alphaValue] - Alpha value of the result color
   */
  subtractColor(c1: p5.Color, c2: p5.Color, alphaValue?: number): p5.Color {
    return this.color(
      this.red(c1) - this.red(c2),
      this.green(c1) - this.green(c2),
      this.blue(c1) - this.blue(c2),
      alphaValue,
    );
  }

  /**
   * Creates a new p5.Color instance in HSB color mode and
   * immediately reset the color mode to default.
   * @param {number} h - Hue (0 - 360)
   * @param {number} s - Saturation (0 - 100)
   * @param {number} b - Brightness (0 - 100)
   * @param {number} [a] - Alpha (0 - 255)
   */
  hsbColor(h: number, s: number, b: number, a?: number): p5.Color {
    this.colorMode(this.HSB, 360, 100, 100, 255);
    const c = this.color(h, s, b);
    this.colorMode(this.RGB, 1, 1, 1, 255);
    const gammaCorrectedColor = this.color(
      degamma(this.red(c)), degamma(this.green(c)), degamma(this.blue(c)), a,
    );
    this.colorMode(this.RGB, 255, 255, 255, 255);

    return gammaCorrectedColor;
  }

  /**
   * Creates a new instance of p5ex.ScalableShape.
   * @param shapeType - type chosen from p5ex.ShapeTypes
   * @param {number} baseShapeSize
   * @param {NumberContainer} [scaleFactorRef]
   */
  createScalableShape(
    shapeType: ShapeType,
    baseShapeSize: number,
    scaleFactorRef?: NumberContainer,
  ) {
    return new ScalableShape(this, shapeType, baseShapeSize, scaleFactorRef);
  }

  /**
   * Returns true if the mouse cursor is on the canvas.
   */
  mouseOnCanvas(): boolean {
    if (this.mouseX < 0) return false;
    if (this.mouseX > this.width) return false;
    if (this.mouseY < 0) return false;
    if (this.mouseY > this.height) return false;

    return true;
  }
}

import {
  NumberContainer,
} from './basic';

import {
  DUMMY_PARAMETERS as SCALABLE_CANVAS_DUMMY_PARAMETERS,
} from './drawing/ScalableCanvas';

import {
  Drawable,
} from './loopables';

import {
  ShapeColor,
  degamma,
} from './color';

import {
  ScalableCanvas,
  ScalableCanvasType,
  ScalableCanvasTypes,
  ScalableCanvasParameters,
  DrawParameter,
  Drawer,
  DrawerBuilder,
  AlphaBackground,
  ShapeType,
  ScalableShape,
} from './drawing';

export { p5exClass };
export * from './properties';
