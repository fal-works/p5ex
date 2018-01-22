import { TimedFrameCounter } from './TimedFrameCounter';

/**
 * (To be filled)
 */
export class NonLoopedFrameCounter extends TimedFrameCounter {
  /**
   * True if the given frame count duration has ellapsed already.
   */
  get isCompleted(): boolean { return this._isCompleted; }

  // tslint:disable:variable-name
  private _isCompleted: boolean;
  // tslint:enable

  /**
   *
   * @param durationFrameCount
   * @param completeBehavior
   */
  constructor(
    durationFrameCount: number,
    completeBehavior?: () => any,
  ) {
    super(durationFrameCount, completeBehavior);

    this._isCompleted = false;
  }

  /**
   * @override
   * @chainable
   */
  on(duration?: number): NonLoopedFrameCounter {
    super.on(duration);

    return this;
  }

  /**
   * @override
   * @chainable
   */
  off(): NonLoopedFrameCounter {
    super.off();

    return this;
  }

  /**
   * @override
   */
  resetCount(): TimedFrameCounter {
    super.resetCount();
    this._isCompleted = false;

    return this;
  }

  /**
   * @override
   */
  getProgressRatio(): number {
    return this._isCompleted ? 1 : this.count / this.durationFrameCount;
  }

  /**
   * @override
   */
  protected completeCycle(): void {
    this._isCompleted = true;
    this._isOn = false;
    this.completeBehavior();
  }
}
