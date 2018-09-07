import { default as p5ex } from '../p5exInterface';
import { Drawable } from '../loopables';

/**
 * (To be filled)
 */
export class AlphaBackground implements Drawable {
  private readonly p: p5ex;
  private backgroundColor: p5.Color;
  private drawIntervalFrameCount: number;
  private blendModeString: BLEND_MODE | undefined;
  private defaultBlendModeString: BLEND_MODE | undefined;

  /**
   *
   * @param p5exInstance
   * @param backgroundColor
   * @param drawIntervalFrameCount
   * @param blendModeString
   * @param defaultBlendModeString
   */
  constructor(
    p5exInstance: p5ex,
    backgroundColor: p5.Color,
    drawIntervalFrameCount: number = 1,
    blendModeString?: BLEND_MODE,
    defaultBlendModeString?: BLEND_MODE,
  ) {
    this.p = p5exInstance;
    this.backgroundColor = backgroundColor;
    this.drawIntervalFrameCount = drawIntervalFrameCount;
    this.blendModeString = blendModeString;
    this.defaultBlendModeString = defaultBlendModeString;
  }

  /**
   * Draws the background.
   */
  public draw(): void {
    if (this.p.frameCount % this.drawIntervalFrameCount !== 0) return;

    if (this.blendModeString) this.p.blendMode(this.blendModeString);
    this.p.noStroke();
    this.p.fill(this.backgroundColor);
    this.p.rect(0, 0, this.p.width, this.p.height);
    if (this.defaultBlendModeString) this.p.blendMode(this.defaultBlendModeString);
  }
}
