/**
 * Applies display gamma correction to the given number.
 * @param value - any number in a linear color space (0 - 1).
 * @ignore
 */
export function degamma(value: number): number {
  if (value <= 0.0031308) return 12.92 * value;

  return 1.055 * Math.pow(value, 1.0 / 2.4) - 0.055;
}
