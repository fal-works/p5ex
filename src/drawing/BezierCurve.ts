import { default as p5ex } from '../p5exInterface';
import { dummyP5, NumberContainer } from '../basic';
import { Drawable } from '../loopables';

// temporal vectors for use in QuadraticBezierCurve.
const tmpMidPoint1 = dummyP5.createVector();
const tmpMidPoint2 = dummyP5.createVector();

/**
 * Trimmable quadratic bezier curve.
 */
export class QuadraticBezierCurve implements Drawable {
  readonly pointList: p5.Vector[];
  readonly resolution: number;
  readonly startRatio: NumberContainer;
  readonly endRatio: NumberContainer;
  protected readonly p: p5ex;

  /**
   *
   * @param p
   * @param startPoint
   * @param controlPoint
   * @param endPoint
   * @param resolution
   * @param startRatioRef
   * @param endRatioRef
   */
  constructor(
    p: p5ex,
    startPoint: p5.Vector,
    controlPoint: p5.Vector,
    endPoint: p5.Vector,
    resolution: number,
    startRatioRef: NumberContainer,
    endRatioRef: NumberContainer,
  ) {
    // tslint:disable-next-line:prefer-array-literal
    this.pointList = new Array<p5.Vector>(resolution + 1);
    this.resolution = resolution;
    this.startRatio = startRatioRef;
    this.endRatio = endRatioRef;
    this.p = p;

    for (let i = 0; i <= resolution; i += 1) {
      const ratio2 = i / resolution;
      const ratio1 = 1 - ratio2;
      tmpMidPoint1.set(
        ratio1 * startPoint.x + ratio2 * controlPoint.x,
        ratio1 * startPoint.y + ratio2 * controlPoint.y,
      );
      tmpMidPoint2.set(
        ratio1 * controlPoint.x + ratio2 * endPoint.x,
        ratio1 * controlPoint.y + ratio2 * endPoint.y,
      );
      this.pointList[i] = p.createVector(
        ratio1 * tmpMidPoint1.x + ratio2 * tmpMidPoint2.x,
        ratio1 * tmpMidPoint1.y + ratio2 * tmpMidPoint2.y,
      );
    }
  }

  draw(): void {
    const startIndex = Math.floor(this.startRatio.value * this.resolution);
    const endIndex = Math.floor(this.endRatio.value * this.resolution);
    const indexRemainder = this.endRatio.value * this.resolution - endIndex;
    const renderer = this.p.currentRenderer;
    const points = this.pointList;

    renderer.beginShape();

    for (let i = startIndex; i <= endIndex; i += 1) {
      renderer.vertex(
        points[i].x,
        points[i].y,
      );
    }

    if (indexRemainder > 0) {
      renderer.vertex(
        points[endIndex].x + indexRemainder * (points[endIndex + 1].x - points[endIndex].x),
        points[endIndex].y + indexRemainder * (points[endIndex + 1].y - points[endIndex].y),
      );
    }

    renderer.endShape();
  }
}
