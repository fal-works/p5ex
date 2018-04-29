/**
 * Returns true if the mouse is within the canvas.
 * @param p - The p5 instance.
 */
export function mouseIsInCanvas(p: p5): boolean {
  if (p.mouseX < 0) return false;
  if (p.mouseX > p.width) return false;
  if (p.mouseY < 0) return false;
  if (p.mouseY > p.height) return false;

  return true;
}
