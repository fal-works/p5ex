import { FrameCounter } from './FrameCounter';
import { EMPTY_FUNCTION } from '../basic';

/**
 * (To be filled)
 */
export abstract class TimedFrameCounter extends FrameCounter {
  /**
   * Function that will be called when the cycle has been completed.
   */
  completeBehavior: () => any;

  /**
   * True if this counter is activated.
   */
  get isOn(): boolean { return this._isOn; }

  protected durationFrameCount: number;
  // tslint:disable:variable-name
  protected _isOn: boolean;
  // tslint:enable

  /**
   *
   * @param durationFrameCount
   * @param completeBehavior
   */
  constructor(
    durationFrameCount: number,
    completeBehavior: () => any = EMPTY_FUNCTION,
  ) {
    super();

    this._isOn = true;
    this.completeBehavior = completeBehavior;

    this.durationFrameCount = durationFrameCount;
  }

  /**
   * Activate this counter.
   * @param duration
   * @chainable
   */
  on(duration?: number): TimedFrameCounter {
    this._isOn = true;
    if (duration) this.durationFrameCount = duration;

    return this;
  }

  /**
   * Deactivate this counter.
   * @chainable
   */
  off(): TimedFrameCounter {
    this._isOn = false;

    return this;
  }

  /**
   * @override
   */
  step(): void {
    if (!this._isOn) return;

    this.count += 1;

    if (this.count > this.durationFrameCount) {
      this.completeCycle();
    }
  }

  /**
   * Returns the progress ratio within the cycle.
   */
  abstract getProgressRatio(): number;

  protected abstract completeCycle(): void;
}
