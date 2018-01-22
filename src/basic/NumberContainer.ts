/**
 * Container class of number.
 */
export class NumberContainer {
  /**
   * Null object of NumberContainer.
   * @static
   */
  static readonly NULL = new NumberContainer();

  /**
   * Containing number value.
   * @member
   */
  value: number;

  /**
   * @constructor
   * @param {number} value
   */
  constructor(value: number = 0) {
    this.value = value;
  }

  valueOf(): number {
    return this.value;
  }
}

Object.freeze(NumberContainer.NULL);
