import { default as p5ex } from '../p5exInterface';
import { lerp } from '../basic';

/**
 * Draws a sine wave.
 * @param p
 * @param drawingLength
 * @param peakToPeakAmplitude
 * @param waveLength
 */
export function drawSineWave(
  p: p5ex, drawingLength: number, peakToPeakAmplitude: number, waveLength: number,
): void {
  const renderer = p.currentRenderer;
  const peakAmplitude = 0.5 * peakToPeakAmplitude;

  let reachedEnd = false;
  renderer.beginShape();

  for (let x = 0; x <= drawingLength; x += 1) {
    if (x > drawingLength) reachedEnd = true;

    renderer.vertex(
      reachedEnd ? drawingLength : x,
      -peakAmplitude * Math.sin(p.TWO_PI * x / waveLength),
    );

    if (reachedEnd) break;
  }

  renderer.endShape();
}

/**
 * Set color to the specified pixel.
 * @param renderer - Instance of either p5 or p5.Graphics.
 * @param x - The x index of the pixel.
 * @param y - The y index of the pixel.
 * @param red - The red value (0 - 255).
 * @param green - The green value (0 - 255).
 * @param blue - The blue value (0 - 255).
 * @param pixelDensity - If not specified, renderer.pixelDensity() will be called.
 */
export function setPixel(
  renderer: p5 | p5.Graphics,
  x: number,
  y: number,
  red: number,
  green: number,
  blue: number,
  alpha: number,
  pixelDensity?: number,
): void {
  const g = renderer as p5;
  const d = pixelDensity || g.pixelDensity();

  for (let i = 0; i < d; i += 1) {
    for (let j = 0; j < d; j += 1) {
      const idx = 4 * ((y * d + j) * g.width * d + (x * d + i));
      g.pixels[idx] = red;
      g.pixels[idx + 1] = green;
      g.pixels[idx + 2] = blue;
      g.pixels[idx + 3] = alpha;
    }
  }
}

/**
 * Lerp color to the specified pixel. The alpha channel remains unchanged.
 * @param renderer - Instance of either p5 or p5.Graphics.
 * @param x - The x index of the pixel.
 * @param y - The y index of the pixel.
 * @param red - The red value (0 - 255).
 * @param green - The green value (0 - 255).
 * @param blue - The blue value (0 - 255).
 * @param pixelDensity - If not specified, renderer.pixelDensity() will be called.
 * @param lerpRatio - The lerp ratio (0 - 1). If 1, the color will be replaced.
 */
export function lerpPixel(
  renderer: p5 | p5.Graphics,
  x: number,
  y: number,
  red: number,
  green: number,
  blue: number,
  pixelDensity?: number,
  lerpRatio: number = 1,
): void {
  const g = renderer as p5;
  const d = pixelDensity || g.pixelDensity();

  for (let i = 0; i < d; i += 1) {
    for (let j = 0; j < d; j += 1) {
      const idx = 4 * ((y * d + j) * g.width * d + (x * d + i));
      g.pixels[idx] = lerp(g.pixels[idx], red, lerpRatio);
      g.pixels[idx + 1] = lerp(g.pixels[idx + 1], green, lerpRatio);
      g.pixels[idx + 2] = lerp(g.pixels[idx + 2], blue, lerpRatio);
      // g.pixels[idx + 3] = 255;
    }
  }
}

/**
 * Fill the canvas or graphics (according to p.currentRenderer) with gradation.
 * @param p
 * @param backgroundColor
 * @param fromColor
 * @param toColor
 * @param lerpRatioExponent
 */
export function gradationBackground(
  p: p5ex,
  backgroundColor: p5.Color,
  fromColor: p5.Color,
  toColor: p5.Color,
  lerpRatioExponent: number = 1,
): void {
  const g = p.currentRenderer;
  g.background(backgroundColor);
  g.strokeWeight(2);

  for (let y = 0; y < g.width; y += 1) {
    const lerpRatio = Math.pow(y / (g.height - 1), lerpRatioExponent);
    g.stroke(p.lerpColor(fromColor, toColor, lerpRatio));
    g.line(0, y, g.width - 1, y);
  }
}

/**
 * Blends the specified color (default: black) to each pixel with a random alpha value.
 * @param renderer - Instance of either p5 or p5.Graphics.
 * @param {number} maxAlpha - The max value of alpha channel (1 - 255).
 * @param {number} [red]
 * @param {number} [green]
 * @param {number} [blue]
 */
export function applyRandomTexture(
  renderer: p5 | p5.Graphics,
  maxAlpha: number,
  red: number = 0,
  green: number = 0,
  blue: number = 0,
): p5 | p5.Graphics {
  const g: any = renderer;
  const width = g.width;
  const height = g.height;

  g.loadPixels();
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      setPixel(renderer, x, y, red, green, blue, Math.random() * maxAlpha);
    }
  }

  g.updatePixels();

  return g;
}
