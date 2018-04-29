/**
 * Spatial region.
 */
export abstract class Region {
   /**
   * Returns true if the region contains the provided position.
   * @param position - The position to check.
   * @param margin - The outer margin value in non-scaled pixels.
   */
  abstract contains(position: p5.Vector, margin?: number): boolean;

  /**
   * Constrains the provided position in the region.
   * @param position - The position to constrain.
   * @param margin - The outer margin value in non-scaled pixels.
   */
  abstract constrain(position: p5.Vector, margin?: number): void;
}

/**
 * Rectangle-shaped spatial region.
 */
export class RectangleRegion extends Region {
  leftPositionX: number;
  topPositionY: number;
  rightPositionX: number;
  bottomPositionY: number;

  get width(): number { return this.rightPositionX - this.leftPositionX; }
  get height(): number { return this.bottomPositionY - this.topPositionY; }
  get area(): number { return this.width * this.height; }

  constructor(x1: number, y1: number, x2: number, y2: number, margin: number = 0) {
    super();

    this.leftPositionX = x1 - margin;
    this.topPositionY = y1 - margin;
    this.rightPositionX = x2 + margin;
    this.bottomPositionY = y2 + margin;
  }

  contains(position: p5.Vector, margin: number = 0): boolean {
    return (
      position.x >= this.leftPositionX - margin && position.x <= this.rightPositionX + margin &&
      position.y >= this.topPositionY - margin && position.y <= this.bottomPositionY + margin
    );
  }

  constrain(position: p5.Vector, margin: number = 0): void {
    if (position.x < this.leftPositionX - margin) position.x = this.leftPositionX - margin;
    else if (position.x > this.rightPositionX + margin) position.x = this.rightPositionX + margin;

    if (position.y < this.topPositionY - margin) position.y = this.topPositionY - margin;
    else if (position.y > this.bottomPositionY + margin) position.y = this.bottomPositionY + margin;
  }
}

// default region -> add
