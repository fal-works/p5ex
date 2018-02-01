/**
 * (To be filled)
 */
export class WeightedRandomSelector<T> {
  private readonly candidateList: { element: T, threshold: number }[];
  private candidateCount: number;
  private totalProbabiligyWeight: number;

  constructor() {
    this.candidateList = [];
    this.candidateCount = 0;
    this.totalProbabiligyWeight = 0;
  }

  /**
   * Adds one element with provided weight of probability.
   * @param element
   * @param probabilityWeight
   * @chainable
   */
  push(element: T, probabilityWeight: number): WeightedRandomSelector<T> {
    this.candidateList.push(
      {
        element,
        threshold: this.totalProbabiligyWeight + probabilityWeight,
      },
    );
    this.candidateCount += 1;
    this.totalProbabiligyWeight += probabilityWeight;

    return this;
  }

  /**
   * Clears all elements.
   * @chainable
   */
  clear(): WeightedRandomSelector<T> {
    this.candidateList.length = 0;
    this.candidateCount = 0;
    this.totalProbabiligyWeight = 0;

    return this;
  }

  /**
   * Returns one element randomly.
   * The probability for each element is:
   * (probability weight of the element) / (total probability weight)
   */
  get(): T {
    const rnd = Math.random() * this.totalProbabiligyWeight;

    for (let i = 0; i < this.candidateCount; i += 1) {
      if (rnd < this.candidateList[i].threshold) return this.candidateList[i].element;
    }

    return this.candidateList[this.candidateCount - 1].element;   // unreachable
  }
}
