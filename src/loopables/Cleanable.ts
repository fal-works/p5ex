import * as nmfl from 'no-more-for-loops';

export interface Cleanable {
  isToBeRemoved: boolean;
  clean(): void;
}

/**
 * (To be filled)
 */
export class CleanableArray<T extends Cleanable> extends nmfl.LoopableArray<T>
  implements Cleanable {
  /**
   * True if the instance is to be removed.
   */
  isToBeRemoved: boolean;

  /**
   * List of elements which has been removed recently.
   */
  readonly recentRemovedElements: nmfl.LoopableArray<T>;

  /**
   *
   * @param initialCapacity
   */
  constructor(initialCapacity?: number) {
    super(initialCapacity);
    this.recentRemovedElements = new nmfl.LoopableArray<T>(initialCapacity);
  }

  /**
   * Updates the variable 'isToBeRemoved'.
   * If it has cleanable child elements, calls clean() recursively and
   * removes the child elements which are to be removed.
   */
  clean(): void {
    this.recentRemovedElements.clear();
    let validElementCount = 0;

    for (let i = 0; i < this.length; i += 1) {
      this.array[i].clean();

      if (this.array[i].isToBeRemoved) {
        this.recentRemovedElements.push(this.array[i]);
        continue;
      }

      this.array[validElementCount] = this.array[i];
      validElementCount += 1;
    }

    this.length = validElementCount;
  }
}
