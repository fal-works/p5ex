import * as nmfl from 'no-more-for-loops';

/**
 * (To be filled)
 */
export class TwoDimensionalArray<T> extends nmfl.LoopableArray<T> {
  /**
   * (To be filled)
   * @param {number} xCount
   * @param {number} yCount
   * @param fillElement
   */
  constructor(public readonly xCount: number, public readonly yCount: number, fillElement: T) {
    super(xCount * yCount);

    if (fillElement) {
      for (let i = 0, len = xCount * yCount; i < len; i += 1) {
        this.push(fillElement);
      }
    }
  }

  /**
   * Returns the specified element.
   * @param x
   * @param y
   */
  public get2D(x: number, y: number): T {
    return this.array[x + this.xCount * y];
  }

  /**
   * (To be filled)
   * @param x
   * @param y
   * @param element
   */
  public set2D(x: number, y: number, element: T): void {
    this.array[x + this.xCount * y] = element;
  }
}
