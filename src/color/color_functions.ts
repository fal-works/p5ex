import { dummyP5 } from '../basic';

/**
 * Applies display gamma correction to the given number.
 * @param value - any number in a linear color space (0 - 1).
 * @ignore
 */
export function degamma(value: number): number {
  if (value <= 0.0031308) return 12.92 * value;

  return 1.055 * Math.pow(value, 1.0 / 2.4) - 0.055;
}

/**
 * Returns the difference of two colors. The alpha values of the original colors will be ignored.
 * @param {p5.Color} c1 - The color to subtract from
 * @param {p5.Color} c2 - The color to subtract
 * @param {number} [alphaValue] - Alpha value of the result color
 */
export function subtractColor(c1: p5.Color, c2: p5.Color, alphaValue ?: number): p5.Color {
  return dummyP5.color(
    dummyP5.red(c1) - dummyP5.red(c2),
    dummyP5.green(c1) - dummyP5.green(c2),
    dummyP5.blue(c1) - dummyP5.blue(c2),
    alphaValue,
  );
}

/**
 * Creates a new p5.Color instance in HSB color mode and
 * immediately reset the color mode to default.
 * @param {number} h - Hue (0 - 360)
 * @param {number} s - Saturation (0 - 100)
 * @param {number} b - Brightness (0 - 100)
 * @param {number} [a] - Alpha (0 - 255)
 */
export function hsbColor(h: number, s: number, b: number, a ?: number): p5.Color {
  dummyP5.colorMode(dummyP5.HSB, 360, 100, 100, 255);
  const c = dummyP5.color(h, s, b);
  dummyP5.colorMode(dummyP5.RGB, 1, 1, 1, 255);
  const gammaCorrectedColor = dummyP5.color(
    degamma(dummyP5.red(c)), degamma(dummyP5.green(c)), degamma(dummyP5.blue(c)), a,
  );
  dummyP5.colorMode(dummyP5.RGB, 255, 255, 255, 255);

  return gammaCorrectedColor;
}
