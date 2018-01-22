import { getRandom } from '../basic/random_functions';
import { ShapeColor } from './ShapeColor';

/**
 * (To be filled)
 */
export class RandomShapeColor {
  private readonly candidateArray: ShapeColor[];

  constructor() {
    this.candidateArray = [];
  }

  /**
   * (To be filled)
   * @param createShapeColor - Any function which returns a p5ex.ShapeColor instance.
   * @param {number} candidateCount - Number of color candidates to push.
   */
  pushCandidateFromFunction(
    createShapeColor: () => ShapeColor,
    candidateCount: number,
  ): RandomShapeColor {
    for (let i = 0; i < candidateCount; i += 1) {
      this.candidateArray.push(createShapeColor());
    }

    return this;
  }

  /**
   * (To be filled)
   * @param {p5.Color} shapeColor - Any p5.Color instance.
   * @param {number} candidateCount - Number of color candidates to push.
   */
  pushCandidate(shapeColor: ShapeColor, candidateCount: number = 1): RandomShapeColor {
    for (let i = 0; i < candidateCount; i += 1) {
      this.candidateArray.push(shapeColor);
    }

    return this;
  }

  /**
   * Clears all color candidates.
   */
  clear(): RandomShapeColor {
    this.candidateArray.length = 0;

    return this;
  }

  /**
   * Returns one of color candidates randomly.
   */
  get(): ShapeColor {
    return getRandom(this.candidateArray);
  }
}
