import { Sprite, SpriteArray } from './Sprite';
import { Cleanable, CleanableArray } from './Cleanable';

export interface CleanableSprite extends Sprite, Cleanable { }

/**
 * (To be filled)
 */
export class CleanableSpriteArray<T extends CleanableSprite> extends CleanableArray<T>
  implements Sprite {
  /**
   * Steps all child elements.
   */
  public step: () => void;

  /**
   * Draws all child elements.
   */
  public draw: () => void;
}
CleanableSpriteArray.prototype.draw = SpriteArray.prototype.draw;
CleanableSpriteArray.prototype.step = SpriteArray.prototype.step;
