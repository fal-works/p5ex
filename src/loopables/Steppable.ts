import { LoopableArray } from 'no-more-for-loops';

export interface Steppable {
  step(): void;
}

/**
 * (To be filled)
 */
export class SteppableArray<T extends Steppable> extends LoopableArray<T> implements Steppable {
  private static stepFunction(value: Steppable) {
    value.step();
  }

  /**
   * Steps all child elements.
   */
  public step(): void {
    this.loop(SteppableArray.stepFunction);
  }
}
