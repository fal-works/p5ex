import { dummyP5 } from '../basic';

/**
 * Returns the 2D force vector which is to be applied to the load.
 * @param loadDirectionAngle - the direction angle from the fulcrum to the load
 * @param loadDistance - the distance between the fulcrum and the load
 * @param effortDistance - the distance between the fulcrum and the effort
 * @param effortForceMagnitude - the effort force magnitude
 * @param rotateClockwise - true if the load is to be rotated clockwise, otherwise false
 * @param target - the vector to receive the result. Will be newly created if not specified
 */
export function calculateLeverageForce(
  loadDirectionAngle: number, loadDistance: number, effortDistance: number,
  effortForceMagnitude: number, rotateClockwise: boolean, target: p5.Vector,
): p5.Vector {
  const force = target || dummyP5.createVector();
  const forceDirectionAngle =
    loadDirectionAngle + (rotateClockwise ? -dummyP5.HALF_PI : dummyP5.HALF_PI);
  force.set(Math.cos(forceDirectionAngle), Math.sin(forceDirectionAngle));
  force.setMag(effortForceMagnitude * effortDistance / loadDistance);  // load force
  return force;
}
