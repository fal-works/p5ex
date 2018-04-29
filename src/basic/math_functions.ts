import dummyP5 from './dummyP5';

/**
 * Calculates the squared value of the Euclidean distance between
 * two points (considering a point as a vector object).
 */
export function distSq(v1: p5.Vector, v2: p5.Vector): number {
  return Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2) + Math.pow(v2.z - v1.z, 2);
}

/**
 * Multiplies the given matrix and array.
 * The number of matrix columns and the array length must be identical.
 * @param {number[][]} matrix - Any matrix.
 * @param {number[]} array - Any one-dimensional array of numbers.
 * @param {number[]} [target] - Target array for receiving the result.
 * @returns Product of the given values as an array.
 */
export function multiplyMatrixAndArray(
  matrix: number[][], array: number[], target?: number[],
): number[] {
  const matrixRowCount = matrix.length;
  const matrixColumnCount = matrix[0].length;
  /* tslint:disable:prefer-array-literal */
  const resultArray = target || new Array<number>(matrixRowCount);
  /* tslint:enable */

  for (let row = 0; row < matrixRowCount; row += 1) {
    resultArray[row] = 0;
    for (let col = 0; col < matrixColumnCount; col += 1) {
      resultArray[row] += matrix[row][col] * array[col];
    }
  }

  return resultArray;
}

const TWO_PI = 2 * Math.PI;

/**
 * Calculates the difference between two angles in range of -PI to PI.
 * @param angleA - the angle to subtract from
 * @param angleB - the angle to subtract
 */
export function angleDifference(angleA: number, angleB: number): number {
  let diff = (angleA - angleB) % TWO_PI;
  if (diff < -Math.PI) diff += TWO_PI;
  else if (diff > Math.PI) diff -= TWO_PI;
  return diff;
}

/**
 * Calculates the direction angle from one vector to another.
 * @param referencePosition
 * @param targetPosition
 */
export function getDirectionAngle(referencePosition: p5.Vector, targetPosition: p5.Vector): number {
  return Math.atan2(
    targetPosition.y - referencePosition.y,
    targetPosition.x - referencePosition.x,
  );
}

// Temporal vectors for calculation use in getClosestPositionOnLineSegment()
const tmpVectorAP: p5.Vector = dummyP5.createVector();
const tmpVectorAB: p5.Vector = dummyP5.createVector();

/**
 * Returns the position on the line segment AB which is closest to the reference point P.
 * @param {p5.Vector} P - The position of the reference point.
 * @param {p5.Vector} A - The position of the line segment start point.
 * @param {p5.Vector} B - The position of the line segment end point.
 * @param {p5.Vector} target - The vector to receive the result.
 */
export function getClosestPositionOnLineSegment(
  P: p5.Vector, A: p5.Vector, B: p5.Vector, target: p5.Vector,
): p5.Vector {
  p5.Vector.sub(P, A, tmpVectorAP);
  p5.Vector.sub(B, A, tmpVectorAB);

  const magnitudeSquaredAB = tmpVectorAB.magSq();
  const dotProductAPAB = p5.Vector.dot(tmpVectorAP, tmpVectorAB);

  // The distance ratio of AX to AB (X = the closest point)
  const distanceRatioAX = dotProductAPAB / magnitudeSquaredAB;

  if (distanceRatioAX <= 0) return A;
  if (distanceRatioAX >= 1) return B;

  const vectorAX = tmpVectorAB.mult(distanceRatioAX);
  p5.Vector.add(A, vectorAX, target);
  return target;
}

/**
 * Just lerp.
 * @param startValue - The start value.
 * @param endValue - The end value.
 * @param ratio - The ratio between 0 and 1.
 */
export function lerp(
  startValue: number,
  endValue: number,
  ratio: number,
): number {
  return startValue + ratio * (endValue - startValue);
}
