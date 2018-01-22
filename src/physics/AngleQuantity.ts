import { Steppable } from '../loopables/Steppable';
import { NumberContainer } from '../basic/NumberContainer';

/**
 * (To be filled)
 */
export class AngleQuantity implements Steppable {
  /**
   * Null object.
   * @static
   */
  static readonly NULL: AngleQuantity = new AngleQuantity();

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

AngleQuantity.NULL.step = () => { };
Object.freeze(AngleQuantity.NULL);
