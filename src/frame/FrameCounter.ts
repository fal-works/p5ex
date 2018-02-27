import { Steppable } from '../loopables';

/**
 * (To be filled)
 */
export class FrameCounter implements Steppable {
  /**
   * Frame count.
   */
  count: number;

  constructor() {
    this.count = 0;
  }

  /**
   * Resets the counter.
   * @param count
   */
  resetCount(count: number = 0): FrameCounter {
    this.count = count;

    return this;
  }

  /**
   * Increments the frame count.
   */
  step(): void {
    this.count += 1;
  }

  /**
   * Returns the mod.
   * @param divisor
   */
  mod(divisor: number): number {
    return this.count % divisor;
  }
}
