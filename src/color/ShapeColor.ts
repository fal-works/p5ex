export interface ColorUnit {
  stroke(alphaValue?: number);
  fill(alphaValue?: number);
}

class NormalColorUnit implements ColorUnit {
  constructor(public readonly p: p5ex, public readonly p5Color: p5.Color) { }

  stroke(): void {
    this.p.currentRenderer.stroke(this.p5Color);
  }
  fill(): void {
    this.p.currentRenderer.fill(this.p5Color);
  }
}

class NoColorUnit implements ColorUnit {
  constructor(public readonly p: p5ex) { }
  stroke(): void {
    this.p.currentRenderer.noStroke();
  }
  fill(): void {
    this.p.currentRenderer.noFill();
  }
}

class UndefinedColorUnit implements ColorUnit {
  stroke(): void {
  }
  fill(): void {
  }
}

class AlphaColorUnit implements ColorUnit {
  readonly colorArray: p5.Color[];
  private readonly maxIndex: number;

  constructor(public readonly p: p5ex, c: p5.Color, alphaResolution: number = 256) {
    const array: p5.Color[] = [];
    for (let alphaFactor = 0; alphaFactor < alphaResolution; alphaFactor += 1) {
      array.push(
        p.color(p.red(c), p.green(c), p.blue(c), p.alpha(c) * alphaFactor / (alphaResolution - 1)),
      );
    }
    this.colorArray = array;
    this.maxIndex = alphaResolution - 1;
  }

  stroke(alphaValue?: number): void {
    this.p.currentRenderer.stroke(this.getColor(alphaValue));
  }

  fill(alphaValue?: number): void {
    this.p.currentRenderer.fill(this.getColor(alphaValue));
  }

  private getColor(alphaValue?: number) {
    return this.colorArray[alphaValue ? Math.floor(this.p.map(alphaValue, 0, 255, 0, this.maxIndex)) : this.maxIndex];
  }
}

function colorUnit(
  p: p5ex | undefined,
  p5Color: p5.Color | null | undefined,
  alphaEnabled?: boolean, alphaResolution?: number,
) {
  if (!p || p5Color === undefined) return new UndefinedColorUnit();
  if (p5Color === null) return new NoColorUnit(p);
  if (alphaEnabled) return new AlphaColorUnit(p, p5Color, alphaResolution);
  return new NormalColorUnit(p, p5Color);
}

/**
 * Composition of two p5.Color instances. One for stroke(), one for fill().
 */
export class ShapeColor {
  /**
   * Undefined object of p5ex.ShapeColor.
   * @static
   */
  static readonly UNDEFINED: ShapeColor = new ShapeColor(undefined, undefined, undefined);

  /**
   * A p5ex.ColorUnit instance for use in stroke().
   * @member
   */
  readonly strokeColor: ColorUnit;

  /**
   * A p5ex.ColorUnit instance for use in fill().
   * @member
   */
  readonly fillColor: ColorUnit;

  /**
   *
   * @param p - p5ex instance.
   * @param {p5.Color | null | undefined} strokeColor - Color for stroke(). Null means noStroke().
   * @param {p5.Color | null | undefined} fillColor - Color for fill(). Null means noFill().
   * @param {boolean} [alphaEnabled]
   * @param {number} [alphaResolution]
   */
  constructor(
    p: p5ex | undefined,
    strokeColor: p5.Color | null | undefined, fillColor: p5.Color | null | undefined,
    alphaEnabled?: boolean, alphaResolution?: number,
  ) {
    this.strokeColor = colorUnit(p, strokeColor, alphaEnabled, alphaResolution);
    this.fillColor = colorUnit(p, fillColor, alphaEnabled, alphaResolution);
  }

  /**
   * Applies colors to the current p5 renderer.
   * @param {number} alphaValue - Alpha channel value (0 - 255)
   */
  applyColor(alphaValue?: number): void {
    this.strokeColor.stroke(alphaValue);
    this.fillColor.fill(alphaValue);
  }
}

import { default as p5ex } from '../p5exInterface';
