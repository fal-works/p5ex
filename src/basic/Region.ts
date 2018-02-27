/**
 * Spatial region.
 */
export abstract class Region {
  /**
   * Returns true if the region contains the provided position.
   * @param position
   */
  abstract contains(position: p5.Vector): boolean;
}

/**
 * Rectangle-shaped spatial region.
 */
export class RectangleRegion extends Region {
  readonly leftPositionX: number;
  readonly topPositionY: number;
  readonly rightPositionX: number;
  readonly bottomPositionY: number;

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

  contains(position: p5.Vector): boolean {
    return (
      position.x >= this.leftPositionX && position.x <= this.rightPositionX &&
      position.y >= this.topPositionY && position.y <= this.bottomPositionY
    );
  }
}
