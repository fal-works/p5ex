interface p5exInterface extends p5 {
  currentRenderer: p5;

  setCurrentRenderer(renderer: p5 | p5.Graphics): void;

  readonly maxCanvasRegion: {
    width: number,
    height: number,
    getShortSideLength: () => number,
  };

  scalableCanvas: ScalableCanvas;

  node: HTMLElement;

  idealFrameRate: number;
  unitAngleSpeed: number;
  unitSpeed: number;
  unitAccelerationMagnitude: number;

  setFrameRate(fps?: number | undefined): p5exInterface;

  updateMaxCanvasRegion(): void;

  createScalableCanvas(
    type: ScalableCanvasType,
    parameters?: ScalableCanvasParameters,
    rendererType?: string,
  ): void;

  shapeColor(
    strokeColor: p5.Color | null | undefined, fillColor: p5.Color | null | undefined,
    alphaEnabled?: boolean, alphaResolution?: number,
  ): ShapeColor;

  createDrawer(
    element: Drawable, drawParam: DrawParameter,
  ): Drawer;

  createDrawerBuilder(): DrawerBuilder;
}

import {
  ScalableCanvas,
  ScalableCanvasType,
  ScalableCanvasParameters,
} from './drawing/ScalableCanvas';
import { Drawable } from './loopables/Drawable';
import { ShapeColor } from './color/ShapeColor';
import {
  DrawParameter,
  Drawer,
  DrawerBuilder,
} from './drawing/Drawer';

export default p5exInterface;
