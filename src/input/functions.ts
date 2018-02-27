import { default as p5ex } from '../p5exInterface';

/**
 * Returns true if the mouse cursor is on the canvas.
 * @param p - p5ex instance.
 */
export function mouseOnCanvas(p: p5ex): boolean {
  if (p.mouseX < 0) return false;
  if (p.mouseX > p.width) return false;
  if (p.mouseY < 0) return false;
  if (p.mouseY > p.height) return false;

  return true;
}
