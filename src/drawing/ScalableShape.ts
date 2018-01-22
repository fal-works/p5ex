import { default as p5ex } from '../p5exInterface';
import { ShapeType } from './ShapeType';
import { Drawable } from '../loopables/Drawable';
import { NumberContainer } from '../basic/NumberContainer';

/**
 * (To be filled)
 */
export class ScalableShape implements Drawable {
  /**
   * Reference to the scale factor.
   */
  scaleFactorRef: NumberContainer;

  private p: p5ex;
  private shapeType: ShapeType;
  private baseShapeSize: number;

  constructor(
    p5exInstance: p5ex,
    shapeType: ShapeType,
    baseShapeSize: number,
    scaleFactorRef: NumberContainer = new NumberContainer(1),
  ) {
    this.p = p5exInstance;
    this.shapeType = shapeType;
    this.baseShapeSize = baseShapeSize;
    this.scaleFactorRef = scaleFactorRef;
  }

  /**
   * Draws the shape.
   */
  draw(): void {
    this.shapeType.drawShape(this.p, this.scaleFactorRef.value * this.baseShapeSize);
  }
}
