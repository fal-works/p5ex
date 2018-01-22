import { cielabValueToXyzValue } from './cielabValueToXyzValue';
import { multiplyMatrixAndArray } from '../basic/math_functions';
import { Illuminant, Illuminants, xyzToLinearRgbConversionMatrix } from './XyzColorConstants';
import { degamma } from './degamma';

export { Illuminants } from './XyzColorConstants';

let currentIlluminant: Illuminant = Illuminants.D50;

/**
 * Sets the current illuminant. (e.g. D50, D65 etc.)
 * @param illuminant - Any Illuminant.
 * @example setIlluminant(Illuminants.D65);
 */
export function setIlluminant(illuminant: Illuminant): void {
  currentIlluminant = illuminant;
}

const temporalArray1: [number, number, number] = [0, 0, 0];
const temporalArray2: [number, number, number] = [0, 0, 0];
const temporalArray3: [number, number, number] = [0, 0, 0];
const temporalArray4: [number, number, number] = [0, 0, 0];

function assignArray(
  array: [number, number, number], v0: number, v1: number, v2: number,
): [number, number, number] {
  array[0] = v0;
  array[1] = v1;
  array[2] = v2;
  return array;
}

/**
 * Clips the given linear RGB factor to the valid range (0 - 1)
 * and converts it to an sRGB value (0 - 255).
 * @param factor - Factor of either red, green or blue in the linear RGB color space.
 * @returns sRGB value.
 * @ignore
 */
function linearRgbFactorToSrgbValue(factor: number): number {
  return degamma(Math.min(Math.max(factor, 0), 1)) * 255;
}

/**
 * Converts CIELAB values to an array of RGB values (0 - 255).
 * @param {number} lValue - L*: Lightness (0 - 100)
 * @param {number} aValue - a* (0 - ca. 100)
 * @param {number} bValue - b* (0 - ca. 100)
 * @param {number} [alphaValue] - Alhpa value (0 - 255)
 * @returns New Array of sRGB values.
 */
export function cielabColor(
  lValue: number, aValue: number, bValue: number, alphaValue?: number,
): number[] {
  const labValue = assignArray(temporalArray1, lValue, aValue, bValue);
  const xyzValue = cielabValueToXyzValue(labValue, currentIlluminant, temporalArray2);

  const rgbFactor = <[number, number, number]> multiplyMatrixAndArray(
    xyzToLinearRgbConversionMatrix, xyzValue, temporalArray3,
  );

  const srgbValue = assignArray(
    temporalArray4,
    linearRgbFactorToSrgbValue(rgbFactor[0]),
    linearRgbFactorToSrgbValue(rgbFactor[1]),
    linearRgbFactorToSrgbValue(rgbFactor[2]),
  );

  return alphaValue ? [
    srgbValue[0],
    srgbValue[1],
    srgbValue[2],
    alphaValue,
  ] : [
    srgbValue[0],
    srgbValue[1],
    srgbValue[2],
  ];
}

/**
 * Converts CIELCh values to an array of RGB values (0 - 255).
 * @param {number} lValue - L*: Lightness (0 - 100)
 * @param {number} cValue - C*: Chroma (0 - ca. 100)
 * @param {number} hValue - h*: Hue (0 - 2PI)
 * @param {number} [alphaValue] - Alhpa value (0 - 255)
 */
export function cielchColor(
  lValue: number, cValue: number, hValue: number, alphaValue?: number,
): number[] {
  return cielabColor(lValue, cValue * Math.cos(hValue), cValue * Math.sin(hValue), alphaValue);
}
