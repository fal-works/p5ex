import { Steppable } from '../loopables/Steppable';

/**
 * (To be filled)
 */
export class KinematicQuantity implements Steppable {
  /**
   * Current position.
   */
  readonly position: p5.Vector;

  /**
   * Current velocity.
   */
  readonly velocity: p5.Vector;

  constructor() {
    this.position = new p5.Vector();
    this.velocity = new p5.Vector();
  }

  /**
   * Updates the position.
   */
  step(): void {
    this.position.add(this.velocity);
  }

  /**
   * Returns the current speed.
   */
  getSpeed(): number {
    return this.velocity.mag();
  }

  /**
   * Returns the current direction angle.
   */
  getDirection(): number {
    return this.velocity.heading();
  }

  /**
   * Adds the given value to the current speed.
   * @param speedChange
   */
  addSpeed(speedChange: number) {
    this.velocity.setMag(Math.max(0, this.velocity.mag() + speedChange));
  }
}
