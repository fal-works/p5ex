// tslint:disable-next-line:class-name
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
}

import {
  ScalableCanvas,
  ScalableCanvasType,
  ScalableCanvasParameters,
} from './canvas/ScalableCanvas';

export default p5exInterface;
