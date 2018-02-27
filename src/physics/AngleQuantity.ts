import { NumberContainer } from '../basic';
import { Steppable } from '../loopables';

/**
 * (To be filled)
 */
export class AngleQuantity implements Steppable {
  /**
   * Null object of AngleQuantity.
   * @static
   */
  static get NULL(): AngleQuantity { return NULL; }

  /**
   * Reference to the angle.
   */
  angleReference: NumberContainer;

  /**
   * Reference to the anglular velocity.
   */
  angleVelocityReference: NumberContainer;

  /**
   *
   * @param angle
   * @param angleVelocity
   */
  constructor(angle: number = 0, angleVelocity: number = 0) {
    this.angleReference = new NumberContainer(angle);
    this.angleVelocityReference = new NumberContainer(angleVelocity);
  }

  /**
   * Current angle value.
   */
  get angle(): number { return this.angleReference.value; }
  set angle(v: number) { this.angleReference.value = v; }

  /**
   * Current anglular velocity value.
   */
  get angleVelocity(): number { return this.angleVelocityReference.value; }
  set angleVelocity(v: number) { this.angleVelocityReference.value = v; }

  /**
   * Updates the angle.
   */
  step(): void {
    this.angle += this.angleVelocity;
  }
}

export class NullAngleQuantity extends AngleQuantity {
  get angle(): number { return 0; }
  set angle(v: number) { }
  get angleVelocity(): number { return 0; }
  set angleVelocity(v: number) { }
  step() { }
}

const NULL = new NullAngleQuantity();
