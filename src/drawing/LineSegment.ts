import { default as p5ex } from '../p5exInterface';
import { Drawable } from '../loopables/Drawable';

/**
 * (To be filled)
 */
export class LineSegment implements Drawable {
  constructor(
    readonly p: p5ex,
    readonly x1: number,
    readonly y1: number,
    readonly x2: number,
    readonly y2: number,
  ) {
  }

  draw(): void {
    this.p.currentRenderer.line(this.x1, this.y1, this.x2, this.y2);
  }
}
