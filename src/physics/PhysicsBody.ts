import { Steppable } from '../loopables/Steppable';
import { KinematicQuantity } from './KinematicQuantity';
import { distSq } from '../basic/math_functions';

const temporalVector: p5.Vector = new p5.Vector();

function sq(n: number) {
  return n * n;
}

/**
 * (To be filled)
 */
export class PhysicsBody implements Steppable {
  /**
   * Kinematic quantity.
   */
  readonly kinematicQuantity: KinematicQuantity;

  /**
   * Shortcut to kinematicQuantity.position.
   */
  readonly position: p5.Vector;

  /**
   * Shortcut to kinematicQuantity.velocity.
   */
  readonly velocity: p5.Vector;

  /**
   * The mass of the body.
   */
  mass: number;

  /**
   * Radius of the body which will be used for collision detection.
   */
  collisionRadius: number;

  private hasFriction: boolean;
  private decelerationFactor: number;

  constructor() {
    this.kinematicQuantity = new KinematicQuantity();
    this.position = this.kinematicQuantity.position;
    this.velocity = this.kinematicQuantity.velocity;
    this.mass = 1;
    this.collisionRadius = 0;
    this.hasFriction = false;
    this.decelerationFactor = 1;
  }

  /**
   * X position.
   */
  get x(): number {
    return this.position.x;
  }
  /**
   * Y position.
   */
  get y(): number {
    return this.position.y;
  }
  /**
   * Z position.
   */
  get z(): number {
    return this.position.z;
  }
  /**
   * X velocity.
   */
  get vx(): number {
    return this.velocity.x;
  }
  /**
   * Y velocity.
   */
  get vy(): number {
    return this.velocity.y;
  }
  /**
   * Z velocity.
   */
  get vz(): number {
    return this.velocity.z;
  }
  /**
   * Returns the current speed.
   */
  getSpeed(): number {
    return this.kinematicQuantity.getSpeed();
  }
  /**
   * Returns the current direction angle.
   */
  getDirection(): number {
    return this.kinematicQuantity.getDirection();
  }

  /**
   * Sets the friction of the body.
   * @param constant
   */
  setFriction(constant: number): void {
    if (constant === 0) {
      this.hasFriction = false;
      return;
    }
    this.hasFriction = true;
    this.decelerationFactor = 1 - constant;
  }

  /**
   * Constrains the current speed. Should be called every time if needed.
   * @param maxSpeed
   */
  constrainSpeed(maxSpeed: number) {
    if (this.velocity.magSq() > maxSpeed * maxSpeed) this.velocity.setMag(maxSpeed);
  }

  /**
   * Updates the body.
   */
  step(): void {
    this.kinematicQuantity.step();

    if (this.hasFriction) {
      this.kinematicQuantity.velocity.mult(this.decelerationFactor);
    }
  }

  /**
   * Accelerates the body.
   * @param x
   * @param y
   * @param z
   */
  accelerate(x: number, y: number, z?: number): void {
    this.kinematicQuantity.velocity.add(x, y, z);
  }

  /**
   * Apply the provided force to the body.
   * @param force
   */
  applyForce(force: p5.Vector): void {
    this.accelerate(
      force.x / this.mass,
      force.y / this.mass,
      force.z / this.mass,
    );
  }

  /**
   * Add the provided value to the speed of the body.
   * @param speedChange
   */
  addSpeed(speedChange: number): void {
    this.kinematicQuantity.addSpeed(speedChange);
  }

  /**
   * Returns true if the body collides the provided body.
   * @param other
   */
  collides(other: PhysicsBody): boolean {
    return (
      distSq(this.position, other.position) < sq(this.collisionRadius) + sq(other.collisionRadius)
    );
  }

  /**
   * (To be filled)
   * @param normalUnitVector
   * @param restitution
   */
  bounce(
    normalUnitVector: p5.Vector, restitution: number = 1,
  ): void {
    this.velocity.add(
      p5.Vector.mult(
        normalUnitVector,
        (1 + restitution) * p5.Vector.dot(this.velocity, p5.Vector.mult(normalUnitVector, -1)),
      ),
    );
  }

  /**
   * Applies attraction force to both this and the target body.
   * @param {PhysicsBody} other - the other body to interact with
   * @param {number} magnitudeFactor - the factor of magnitude other than the distance
   * @param {number} minMag - the minimum magnitude
   * @param {number} maxMag - the maximum magnitude
   * @param {number} cutoffMag - does not apply force if magnitude is smaller than this
   */
  attractEachOther(
    other: PhysicsBody, magnitudeFactor: number,
    minMag: number = 0, maxMag?: number, cutoffMag?: number,
  ): void {
    const force = this.calculateAttractionForce(
      other.position, magnitudeFactor, minMag, maxMag, cutoffMag,
    );

    if (!force) return;

    this.applyForce(force);
    force.mult(-1);
    other.applyForce(force);
  }

  /**
   * Applies attraction force to this body.
   * @param {p5.Vector} targetPosition - the target position
   * @param {number} magnitudeFactor - the factor of magnitude other than the distance
   * @param {number} minMag - the minimum magnitude
   * @param {number} maxMag - the maximum magnitude
   * @param {number} cutoffMag - does not apply force if magnitude is smaller than this
   */
  attractToPoint(
    targetPosition: p5.Vector, magnitudeFactor: number,
    minMag: number = 0, maxMag?: number, cutoffMag?: number,
  ): void {
    const force = this.calculateAttractionForce(
      targetPosition, magnitudeFactor, minMag, maxMag, cutoffMag,
    );

    if (!force) return;

    this.applyForce(force);
  }

  private calculateAttractionForce(
    targetPosition: p5.Vector, magnitudeFactor: number,
    minMag: number = 0, maxMag?: number, cutoffMag?: number,
  ): p5.Vector | null {
    const tmpVec = temporalVector;
    p5.Vector.sub(targetPosition, this.position, tmpVec); // set relative position
    const distanceSquared = tmpVec.magSq();
    let magnitude = Math.abs(magnitudeFactor) / distanceSquared;

    if (cutoffMag && magnitude < cutoffMag) return null;

    if (maxMag) magnitude = Math.min(Math.max(magnitude, minMag), maxMag);
    else magnitude = Math.max(magnitude, minMag);

    tmpVec.setMag(magnitude); // set force

    if (magnitudeFactor < 0) tmpVec.mult(-1);

    return tmpVec;
  }
}
