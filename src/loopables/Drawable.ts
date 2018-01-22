import * as nmfl from 'no-more-for-loops';

export interface Drawable {
  draw(): void;
}

/**
 * (To be filled)
 */
export class DrawableArray<T extends Drawable> extends nmfl.LoopableArray<T> implements Drawable {
  private static drawFunction(value: Drawable) {
    value.draw();
  }

  /**
   * Draws all child elements.
   */
  public draw(): void {
    this.loop(DrawableArray.drawFunction);
  }
}
