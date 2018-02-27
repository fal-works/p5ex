import { default as p5ex } from '../p5exInterface';

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
