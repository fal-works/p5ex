import p5exInterface from './p5exInterface';
import * as nmfl from 'no-more-for-loops';

/**
 * Extension of p5 class.
 */
class p5ex extends p5 implements p5exInterface {
  /**
   * Current renderer object, either the p5ex instance itself or any p5.Graphics instance.
   * Will be used as the drawing target.
   */
  currentRenderer: p5ex;

  /**
   * Sets the current renderer object.
   * @param renderer
   */
  setCurrentRenderer(renderer: p5ex | p5.Graphics): void {
    this.currentRenderer = renderer as p5ex;
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
  scalableCanvas: p5ex.ScalableCanvas;


  /**
   * The HTML element which holds the p5 sketch.
   */
  node: HTMLElement;

  private scalableCanvasType: p5ex.ScalableCanvasType;

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
  setFrameRate(fps: number | undefined = 60): p5ex {
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
    type: p5ex.ScalableCanvasType,
    parameters?: p5ex.ScalableCanvasParameters,
    rendererType?: string,
  ): void {
    this.scalableCanvasType = type;
    this.scalableCanvas = new p5ex.ScalableCanvas(
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
    type?: p5ex.ScalableCanvasType,
    parameters?: p5ex.ScalableCanvasParameters,
  ): void {
    this.scalableCanvas.resize(
      this.createScalableCanvasParameter(type || this.scalableCanvasType, parameters),
    );
  }

  protected createScalableCanvasParameter(
    type: scalableCanvas.ScalableCanvasType,
    parameters?: p5ex.ScalableCanvasParameters,
  ): scalableCanvas.ScalableCanvasParameters {
    this.updateMaxCanvasRegion();
    const maxShortSide = this.maxCanvasRegion.getShortSideLength();

    switch (type) {
      case scalableCanvas.ScalableCanvasType.SQUARE640x640:
        return {
          scaledWidth: maxShortSide,
          scaledHeight: maxShortSide,
          nonScaledShortSideLength: 640,
        };
      case scalableCanvas.ScalableCanvasType.RECT640x480:
        return {
          scaledWidth: maxShortSide,
          scaledHeight: 0.75 * maxShortSide,
          nonScaledShortSideLength: 480,
        };
      case scalableCanvas.ScalableCanvasType.FULL:
        return {
          scaledWidth: this.maxCanvasRegion.width,
          scaledHeight: this.maxCanvasRegion.height,
          nonScaledShortSideLength: 640,
        };
      default:
        return parameters || scalableCanvas.DUMMY_PARAMETERS;
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
  ): p5ex.ShapeColor {
    return new p5ex.ShapeColor(
      this, strokeColor, fillColor, alphaEnabled, alphaResolution,
    );
  }

  /**
   * Creates a new p5ex.Drawer instance.
   * @param element
   * @param drawParam
   */
  createDrawer(
    element: p5ex.Drawable, drawParam: p5ex.DrawParameter,
  ): p5ex.Drawer {
    return new p5ex.Drawer(this, element, drawParam);
  }

  /**
   * Creates a new p5ex.DrawerBuiler instance.
   */
  createDrawerBuilder(): p5ex.DrawerBuilder {
    return new p5ex.DrawerBuilder(this);
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
  ): p5ex.AlphaBackground {
    return new p5ex.AlphaBackground(
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
   * @param {p5ex.NumberContainer} [scaleFactorRef]
   */
  createScalableShape(
    shapeType: p5ex.ShapeType,
    baseShapeSize: number,
    scaleFactorRef?: p5ex.NumberContainer,
  ) {
    return new p5ex.ScalableShape(this, shapeType, baseShapeSize, scaleFactorRef);
  }

  loopArray;
  loopArrayBackwards;
  roundRobin;
  nestedLoopJoin;

  randomInt;
  randomIntBetween;
  getRandom;
  randomSign;
  popRandom;

  distSq;

  setIlluminant;
  cielabColor;
  cielchColor;
}

p5ex.prototype.loopArray = nmfl.loopArray;
p5ex.prototype.loopArrayBackwards = nmfl.loopArrayBackwards;
p5ex.prototype.roundRobin = nmfl.roundRobin;
p5ex.prototype.nestedLoopJoin = nmfl.nestedLoopJoin;

p5ex.prototype.randomInt = random.randomInt;
p5ex.prototype.randomIntBetween = random.randomIntBetween;
p5ex.prototype.getRandom = random.getRandom;
p5ex.prototype.randomSign = random.randomSign;
p5ex.prototype.popRandom = random.popRandom;

p5ex.prototype.distSq = math.distSq;

p5ex.prototype.setIlluminant = cielab.setIlluminant;
p5ex.prototype.cielabColor = cielab.cielabColor;
p5ex.prototype.cielchColor = cielab.cielchColor;


namespace p5ex {
  // Syntax 'import A = N.B'
  // https://github.com/Microsoft/TypeScript/issues/12473
  // https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#10.3

  export import LoopableArray = nmfl.LoopableArray;

  export import KeyCodes = constants.KeyCodes;

  export import WeightedRandomSelector = weightedRandomSelector.WeightedRandomSelector;

  export import TwoDimensionalArray = twoDimensionalArray.TwoDimensionalArray;
  export import Edge = edge.Edge;
  export import NaiveEdge = edge.NaiveEdge;
  export import Cell = grid.Cell;
  export import Grid = grid.Grid;

  export import ScalableCanvas = scalableCanvas.ScalableCanvas;
  export import ScalableCanvasType = scalableCanvas.ScalableCanvasType;
  export import ScalableCanvasParameters = scalableCanvas.ScalableCanvasParameters;

  export import Drawable = drawable.Drawable;
  export import DrawableArray = drawable.DrawableArray;
  export import Steppable = steppable.Steppable;
  export import SteppableArray = steppable.SteppableArray;
  export import Sprite = sprite.Sprite;
  export import SpriteArray = sprite.SpriteArray;
  export import Cleanable = cleanable.Cleanable;
  export import CleanableArray = cleanable.CleanableArray;
  export import CleanableSprite = cleanableSprite.CleanableSprite;
  export import CleanableSpriteArray = cleanableSprite.CleanableSpriteArray;

  export import ShapeColor = shapeColor.ShapeColor;
  export import RandomShapeColor = randomShapeColor.RandomShapeColor;
  export import Illuminants = cielab.Illuminants;

  export import NumberContainer = numberContainer.NumberContainer;
  export import ScaleFactor = scaleFactor.ScaleFactor;
  export import DrawParameter = drawer.DrawParameter;
  export import Drawer = drawer.Drawer;
  export import DrawerBuilder = drawer.DrawerBuilder;
  export import AlphaBackground = alphaBackground.AlphaBackground;
  export import ShapeType = shapeType.ShapeType;
  export import ShapeTypes = shapeType.ShapeTypes;
  export import ScalableShape = scalableShape.ScalableShape;
  export import LineSegment = lineSegment.LineSegment;
  export import CircularArc = circularArc.CircularArc;

  export import AngleQuantity = angleQuantity.AngleQuantity;
  export import KinematicQuantity = kinematicQuantity.KinematicQuantity;
  export import PhysicsBody = physicsBody.PhysicsBody;

  export import FrameCounter = frameCounter.FrameCounter;
  export import LoopedFrameCounter = loopedFrameCounter.LoopedFrameCounter;
  export import NonLoopedFrameCounter = nonLoopedFrameCounter.NonLoopedFrameCounter;
}

import * as constants from './basic/constants';
import * as random from './basic/random_functions';
import * as math from './basic/math_functions';
import * as weightedRandomSelector from './basic/WeightedRandomSelector';

import * as shapeColor from './color/ShapeColor';
import * as randomShapeColor from './color/RandomShapeColor';
import { degamma } from './color/degamma';
import * as cielab from './color/cielab_color_functions';

import * as twoDimensionalArray from './data/TwoDimensionalArray';
import * as edge from './data/Edge';
import * as grid from './data/Grid';

import * as scalableCanvas from './drawing/ScalableCanvas';

import * as drawable from './loopables/Drawable';
import * as steppable from './loopables/Steppable';
import * as sprite from './loopables/Sprite';
import * as cleanable from './loopables/Cleanable';
import * as cleanableSprite from './loopables/CleanableSprite';

import * as numberContainer from './basic/NumberContainer';
import * as scaleFactor from './drawing/ScaleFactor';
import * as drawer from './drawing/Drawer';
import * as alphaBackground from './drawing/AlphaBackground';
import * as shapeType from './drawing/ShapeType';
import * as scalableShape from './drawing/ScalableShape';
import * as lineSegment from './drawing/LineSegment';
import * as circularArc from './drawing/CircularArc';

import * as angleQuantity from './physics/AngleQuantity';
import * as kinematicQuantity from './physics/KinematicQuantity';
import * as physicsBody from './physics/PhysicsBody';

import * as frameCounter from './frame/FrameCounter';
import * as loopedFrameCounter from './frame/LoopedFrameCounter';
import * as nonLoopedFrameCounter from './frame/NonLoopedFrameCounter';


export default p5ex;
