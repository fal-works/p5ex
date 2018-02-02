import { default as p5ex } from '../p5exInterface';
import { Drawable } from '../loopables/Drawable';
import { NumberContainer } from '../basic/NumberContainer';

/**
 * (To be filled)
 */
export class CircularArc implements Drawable {
  // tslint:disable-next-line:variable-name
  private _isClockwise: boolean;
  private validate: (arc: CircularArc) => void;
  private drawTrimmedArc: (
    p: p5ex,
    centerPosition: p5.Vector, diameter: number, trimmedStartAngle: number, trimmedEndAngle: number,
  ) => void;

  get isClockwise(): boolean { return this._isClockwise; }
  set isClockwise(flag: boolean) {
    this._isClockwise = flag;
    this.validate = flag ? validateClockwise : validateAntiClockwise;
    this.drawTrimmedArc = flag ? drawClockwise : drawAntiClockwise;
  }

  constructor(
    public readonly p: p5ex,
    public centerPosition: p5.Vector,
    public diameter: NumberContainer,
    public startAngle: NumberContainer,
    public endAngle: NumberContainer,
    isClockwise: boolean,
    public startRatio: NumberContainer,
    public endRatio: NumberContainer,
  ) {
    this.isClockwise = isClockwise;
  }

  draw(): void {
    this.validate(this);

    const angleDifference = this.endAngle.value - this.startAngle.value;
    const start = this.startAngle.value +
      this.startRatio.value * angleDifference;
    const end = this.startAngle.value +
      this.endRatio.value * angleDifference;

    this.drawTrimmedArc(this.p, this.centerPosition, this.diameter.value, start, end);
  }
}

function validateClockwise(arc: CircularArc): void {
  if (arc.startAngle.value > arc.endAngle.value) arc.endAngle.value += arc.p.TWO_PI;
}

function validateAntiClockwise(arc: CircularArc): void {
  if (arc.startAngle.value < arc.endAngle.value) arc.endAngle.value -= arc.p.TWO_PI;
}

function drawClockwise(
  p: p5ex,
  centerPosition: p5.Vector, diameter: number, trimmedStartAngle: number, trimmedEndAngle: number,
): void {
  p.currentRenderer.arc(
    centerPosition.x,
    centerPosition.y,
    diameter,
    diameter,
    trimmedStartAngle,
    trimmedEndAngle,
  );
}

function drawAntiClockwise(
  p: p5ex,
  centerPosition: p5.Vector, diameter: number, trimmedStartAngle: number, trimmedEndAngle: number,
): void {
  p.currentRenderer.arc(
    centerPosition.x,
    centerPosition.y,
    diameter,
    diameter,
    trimmedEndAngle,
    trimmedStartAngle,
  );
}
