/**
 * Matrix for conversion color values from XYZ to linear RGB.
 * Values from "7. Conversion from XYZ (D65) to linear sRGB values" in
 * http://www.color.org/chardata/rgb/sRGB.pdf (April 2015)
 * @constant {number[][]} xyzToLinearRgbConversionMatrix
 * @ignore
 */
export const xyzToLinearRgbConversionMatrix = [
  [3.2406255, -1.537208, -0.4986286],
  [-0.9689307, 1.8757561, 0.0415175],
  [0.0557101, -0.2040211, 1.0569959],
];

/**
 * Matrix for converting color values from linear RGB to XYZ.
 * This is an inversed matrix of xyzToLinearRgbConversionMatrix
 * which is pre-calculated by math.js.
 * @constant {number[][]} linearRgbToXyzConversionMatrix
 * @ignore
 */
export const linearRgbToXyzConversionMatrix = [
  [0.4123999971730992, 0.35760000265100855, 0.18050001435233867],
  [0.21259999073612254, 0.7151999842346091, 0.07220001553015044],
  [0.01930001704591329, 0.11920004192621718, 0.9505000471041638],
];

/**
 * CIE standard illuminant.
 */
export class Illuminant {
  public readonly name: string;
  public readonly tristimulusValues: [number, number, number];

  constructor(name: string, tristimulusValues: [number, number, number]) {
    this.name = name;
    this.tristimulusValues = tristimulusValues;
  }
}

// tslint:disable:variable-name
/**
 * Map of illuminants.
 */
export const Illuminants = {
  D50: new Illuminant('D50', [0.9642, 1.0000, 0.8251]),
  D55: new Illuminant('D55', [0.9568, 1.0000, 0.9214]),
  D65: new Illuminant('D65', [0.95047, 1.00000, 1.08883]),
  E: new Illuminant('E', [1, 1, 1]),
};
// tslint:enable
