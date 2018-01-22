import { TimedFrameCounter } from './TimedFrameCounter';

/**
 * (To be filled)
 */
export class LoopedFrameCounter extends TimedFrameCounter {
  /**
   *
   * @param duration
   * @param cycleCompleteBehavior
   */
  constructor(
    duration: number,
    cycleCompleteBehavior?: () => any,
  ) {
    super(duration, cycleCompleteBehavior);
  }

  /**
   * @override
   * @chainable
   */
  on(duration?: number): LoopedFrameCounter {
    super.on(duration);

    return this;
  }

  /**
   * @override
   * @chainable
   */
  off(): LoopedFrameCounter {
    super.off();

    return this;
  }

  /**
   * @override
   */
  getProgressRatio(): number {
    return this.count / this.durationFrameCount;
  }

  /**
   * @override
   */
  protected completeCycle(): void {
    this.completeBehavior();
    this.count = 0;
  }
}
