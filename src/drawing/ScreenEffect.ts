import { default as p5ex } from '../p5exInterface';
import { ShapeColor } from '../color';

/**
 * (To be filled)
 */
export abstract class ScreenEffect {
  protected readonly p: p5ex;

  constructor(p: p5ex) {
    this.p = p;
  }

  abstract apply(): void;
  abstract reset(): void;
}

/**
 * (To be filled)
 */
export class ScreenShake extends ScreenEffect {
  dampingRatio: number;
  protected amplitude: number;
  protected offsetX: number;
  protected offsetY: number;

  constructor(p: p5ex, dampingRatio: number = 0.95) {
    super(p);
    this.dampingRatio = dampingRatio;
    this.amplitude = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  apply(): void {
    if (this.amplitude === 0) return;

    this.offsetX = Math.random() * this.amplitude;
    this.offsetY = Math.random() * this.amplitude;
    this.p.currentRenderer.translate(this.offsetX, this.offsetY);
    this.amplitude = this.amplitude * this.dampingRatio;

    if (this.amplitude < 1) this.amplitude = 0;
  }

  set(amplitude: number) {
    this.amplitude = Math.max(this.amplitude, amplitude);
  }

  reset() {
    this.amplitude = 0;
  }

  cancel() {
    this.p.currentRenderer.translate(-this.offsetX, -this.offsetY);
  }
}

/**
 * (To be filled)
 */
export class ScreenFlash extends ScreenEffect {
  protected readonly flashColor: ShapeColor;
  protected alphaValue: number;
  protected valueChange: number;

  constructor(p: p5ex, flashColor: p5.Color = p.color(255)) {
    super(p);

    this.alphaValue = 0;
    this.valueChange = 0;
    this.flashColor = p.shapeColor(null, flashColor, true);
  }

  apply(): void {
    if (this.alphaValue === 0) return;

    this.flashColor.applyColor(this.alphaValue);
    this.p.currentRenderer.rect(
      0, 0, this.p.scalableCanvas.nonScaledWidth, this.p.scalableCanvas.nonScaledHeight,
    );
    this.alphaValue -= this.valueChange;

    if (this.alphaValue < 1) this.alphaValue = 0;
  }

  set(initialAlphaValue: number, durationSeconds: number) {
    this.alphaValue = initialAlphaValue;
    this.valueChange = initialAlphaValue / (durationSeconds * this.p.idealFrameRate);
  }

  reset() {
    this.alphaValue = 0;
  }
}
