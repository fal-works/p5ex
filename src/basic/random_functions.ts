/**
 * Returns random value from the min number up to (but not including) the max number.
 */
export function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Returns random integer from 0 up to (but not including) the max number.
 */
export function randomInt(maxInt: number): number {
  return Math.floor(Math.random() * maxInt);
}

/**
 * Returns random integer from the min number up to (but not including) the max number.
 */
export function randomIntBetween(minInt: number, maxInt: number): number {
  return minInt + randomInt(maxInt - minInt);
}

/**
 * Returns one of array elements randomly.
 * @param array
 */
export function getRandom<T>(array: T[]): T {
  return array[randomInt(array.length)];
}

/**
 * Returns n or -n randomly. (n = provided number)
 * @param {number} n - any number
 */
export function randomSign(n: number): number {
  if (Math.random() < 0.5) return n;

  return -n;
}

/**
 * Returns and removes one array element randomly.
 * @param array
 */
export function popRandom<T>(array: T[]): T {
  return array.splice(randomInt(array.length), 1)[0];
}
