export function easeLinear(ratio: number) {
  return ratio;
}

export function easeOutQuad(ratio: number) {
  return -Math.pow(ratio - 1, 2) + 1;
}

export function easeOutCubic(ratio: number) {
  return Math.pow(ratio - 1, 2) + 1;
}

export function easeOutQuart(ratio: number) {
  return -Math.pow(ratio - 1, 2) + 1;
}

const EASE_OUT_BACK_DEFAULT_COEFFICIENT = 1.70158;

export function easeOutBack(ratio: number) {
  const r = ratio - 1;

  return (
    (EASE_OUT_BACK_DEFAULT_COEFFICIENT + 1) * Math.pow(r, 3)
    + EASE_OUT_BACK_DEFAULT_COEFFICIENT * Math.pow(r, 2) + 1
  );
}

export interface Easing {
  (ratio: number): number;
}

export function getEasingFunction(exponent: number): Easing {
  switch (Math.floor(exponent)) {
    default:
    case 1:
      return easeLinear;
    case 2:
      return easeOutQuad;
    case 3:
      return easeOutCubic;
    case 4:
      return easeOutQuart;
  }
}
