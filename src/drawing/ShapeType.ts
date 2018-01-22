/**
 * (To be filled)
 */
export class ShapeType {
  /**
   * @param drawShape
   */
  constructor(public readonly drawShape: (renderer: p5, size: number) => void) { }
}

const COS60 = 1 / 2;
const SIN60 = Math.sqrt(3) / 2;

// tslint:disable:variable-name
/**
 * Set of shape types.
 */
export namespace ShapeTypes {
  /**
   * A p5ex.ShapeType instance representing a circle.
   */
  export const CIRCLE = new ShapeType(
    (renderer: p5, size: number) => { renderer.ellipse(0, 0, size, size); },
  );

  /**
   * A p5ex.ShapeType instance representing a square.
   */
  export const SQUARE = new ShapeType(
    (renderer: p5, size: number) => { renderer.rect(0, 0, size, size); },
  );

  /**
   * A p5ex.ShapeType instance representing a regular triangle.
   */
  export const REGULAR_TRIANGLE = new ShapeType(
    (renderer: p5, size: number) => {
      const radius = 0.5 * size;
      renderer.triangle(
        radius,
        0,
        -COS60 * radius,
        -SIN60 * radius,
        -COS60 * radius,
        +SIN60 * radius,
      );
    },
  );

  /**
   * A p5ex.ShapeType instance representing an upward regular triangle.
   */
  export const REGULAR_TRIANGLE_UPWARD = new ShapeType((renderer: p5, size: number) => {
    const radius = 0.5 * size;
    renderer.triangle(
      0,
      radius,
      -SIN60 * radius,
      -COS60 * radius,
      +SIN60 * radius,
      -COS60 * radius,
    );
  });
}
// tslint:enable
