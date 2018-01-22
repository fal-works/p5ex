import { Illuminant } from './XyzColorConstants';

function createCielabToXyzFunc(): (value: number) => number {
  const delta: number = 6 / 29;
  const constantA = 16 / 116;
  const constantB = 3 * delta * delta;

  return (value: number): number => {
    if (value > delta) return value * value * value;

    return (value - constantA) * constantB;
  };
}

const cielabToXyzFunc = createCielabToXyzFunc();

/**
 * Converts color values from CIELAB (D65) to XYZ.
 * @param {number[]} cielabValue - Value array of L*, a*, b* (D65).
 * @param {Illuminant} illuminant - Instance of Illuminant.
 * @param {number[]} [target] - Target array for receiving the result.
 * @returns {number[]} XYZ value array.
 */
export function cielabValueToXyzValue(
  cielabValue: [number, number, number],
  illuminant: Illuminant,
  target?: [number, number, number],
): [number, number, number] {
  const yFactor: number = (cielabValue[0] + 16.0) / 116.0;
  const xFactor: number = yFactor + cielabValue[1] / 500.0;
  const zFactor: number = yFactor - cielabValue[2] / 200.0;

  if (target) {
    target[0] = illuminant.tristimulusValues[0] * cielabToXyzFunc(xFactor);
    target[1] = illuminant.tristimulusValues[1] * cielabToXyzFunc(yFactor);
    target[2] = illuminant.tristimulusValues[2] * cielabToXyzFunc(zFactor);
    return target;
  }

  return [
    illuminant.tristimulusValues[0] * cielabToXyzFunc(xFactor),
    illuminant.tristimulusValues[1] * cielabToXyzFunc(yFactor),
    illuminant.tristimulusValues[2] * cielabToXyzFunc(zFactor),
  ];
}
