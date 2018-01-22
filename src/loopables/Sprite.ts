import * as nmfl from 'no-more-for-loops';
import { Steppable, SteppableArray } from './Steppable';
import { Drawable, DrawableArray } from './Drawable';

export interface Sprite extends Steppable, Drawable {
}

/**
 * (To be filled)
 */
export class SpriteArray<T extends Sprite> extends nmfl.LoopableArray<T>
implements Steppable, Drawable {
  /**
   * Steps all child elements.
   */
  public step: () => void;
  /**
   * Draws all child elements.
   */
  public draw: () => void;
}
SpriteArray.prototype.step = SteppableArray.prototype.step;
SpriteArray.prototype.draw = DrawableArray.prototype.draw;
