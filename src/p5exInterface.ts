interface p5ex extends p5 {
  currentRenderer: p5;

  readonly maxCanvasRegion: {
    width: number,
    height: number,
    getShortSideLength: () => number,
  };

  scalableCanvas: ScalableCanvas;

  idealFrameRate: number;
  unitAngleSpeed: number;
  unitSpeed: number;
  unitAccelerationMagnitude: number;

  setFrameRate(fps?: number | undefined): p5ex;

  setMaxCanvasRegion(node?: HTMLElement | string): void;

  createScalableCanvas(
    type: ScalableCanvasType,
    scaledWidth?: number,
    scaledHeight?: number,
    nonScaledShortSideLength?: number,
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

import { ScalableCanvas, ScalableCanvasType } from './drawing/ScalableCanvas';
import { Drawable } from './loopables/Drawable';
import { ShapeColor } from './color/ShapeColor';
import {
  DrawParameter,
  Drawer,
  DrawerBuilder,
} from './drawing/Drawer';

export default p5ex;
