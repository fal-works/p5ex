/**
 * (To be filled)
 */
export class ScaleFactor {
  private readonly p: p5ex;
  private internalValue: number;
  private internalReciprocalValue: number;

  constructor(p: p5ex, value: number = 1) {
    this.p = p;
    this.internalValue = value;
    this.internalReciprocalValue = 1 / value;
  }

  /**
   * The numeric value of the scale factor.
   */
  get value(): number {
    return this.internalValue;
  }

  set value(v: number) {
    if (v === 0) {
      this.internalValue = 0.0001;
      this.internalReciprocalValue = 10000;
      return;
    }

    this.internalValue = v;
    this.internalReciprocalValue = 1 / v;
  }

  /**
   * The reciprocal value of the scale factor.
   */
  get reciprocalValue() {
    return this.internalReciprocalValue;
  }

  /**
   * Calls scale().
   */
  public applyScale(): void {
    this.p.currentRenderer.scale(this.internalValue);
  }

  /**
   * Calls scale() with the reciprocal value.
   */
  public cancel(): void {
    this.p.currentRenderer.scale(this.internalReciprocalValue);
  }
}

import { default as p5ex } from '../p5exInterface';
