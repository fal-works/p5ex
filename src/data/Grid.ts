import { TwoDimensionalArray } from './TwoDimensionalArray';

/**
 * (To be filled)
 */
export abstract class AbstractCell {
  /**
   * Null object.
   * @static
   */
  static get NULL(): NullCell { return NULL; }

  abstract getNeighborCell(relativeX: number, relativeY: number): AbstractCell;
  abstract setNeighborCell(relativeX: number, relativeY: number, cell: AbstractCell): void;
}

/**
 * (To be filled)
 */
export class Cell extends AbstractCell {
  /**
   * Neighbor cells.
   */
  protected readonly neighborCells: TwoDimensionalArray<AbstractCell>;

  /**
   *
   * @param neighborRange
   */
  constructor(neighborRange: number = 1) {
    super();

    this.neighborCells = new TwoDimensionalArray<AbstractCell>(
      2 * neighborRange + 1, 2 * neighborRange + 1, NULL,
    );
  }

  /**
   * Returns the specified neighbor cell.
   * @param {number} relativeX
   * @param {number} relativeY
   */
  getNeighborCell(relativeX: number, relativeY: number): AbstractCell {
    const neighborRange = Math.floor(this.neighborCells.xCount / 2);

    if (
      relativeX < -neighborRange || relativeX > neighborRange ||
      relativeY < -neighborRange || relativeY > neighborRange
    ) return NULL;

    return this.neighborCells.get2D(relativeX + neighborRange, relativeY + neighborRange);
  }

  /**
   * Sets the provided cell as a neighbor of this cell.
   * @param relativeX
   * @param relativeY
   * @param cell
   */
  setNeighborCell(relativeX: number, relativeY: number, cell: AbstractCell): void {
    const neighborRange = Math.floor(this.neighborCells.xCount / 2);
    this.neighborCells.set2D(relativeX + neighborRange, relativeY + neighborRange, cell);
  }
}

export class NullCell extends AbstractCell {
  getNeighborCell(relativeX: number, relativeY: number): AbstractCell {
    return this;
  }

  setNeighborCell(relativeX: number, relativeY: number, cell: AbstractCell): void { }
}

const NULL = new NullCell();


export interface Index2D {
  x: number;
  y: number;
}

/**
 * (To be filled)
 */
export class Grid {
  /**
   * Cells.
   */
  cell2DArray: TwoDimensionalArray<AbstractCell>;

  private cellIndexMap: Map<AbstractCell, Index2D>;

  /**
   *
   * @param {number} xCount
   * @param {number} yCount
   * @param {number} neighborRange
   * @param {boolean} loopAtEndOfScreen
   */
  constructor(xCount: number, yCount: number, neighborRange: number, loopAtEndOfScreen: boolean) {
    this.cell2DArray = new TwoDimensionalArray<AbstractCell>(xCount, yCount, NULL);
    this.cellIndexMap = new Map<AbstractCell, Index2D>();

    for (let yIndex = 0; yIndex < yCount; yIndex += 1) {
      for (let xIndex = 0; xIndex < xCount; xIndex += 1) {
        const cell = new Cell(neighborRange);
        this.cell2DArray.set2D(xIndex, yIndex, cell);
        this.cellIndexMap.set(cell, { x: xIndex, y: yIndex });
      }
    }

    this.cell2DArray.loop((cell: Cell) => {
      this.setNeighborCells(cell, neighborRange, loopAtEndOfScreen);
    });
  }

  /**
   * Returns the specified cell.
   * @param {number} x - X index.
   * @param {number} y - Y index.
   */
  getCell(x: number, y: number): AbstractCell {
    return this.cell2DArray.get2D(x, y);
  }

  /**
   * Returns the x and y index of the given cell.
   * @param cell
   */
  getCellIndex(cell: AbstractCell): Index2D {
    return this.cellIndexMap.get(cell) || { x: -1, y: -1 };
  }

  /**
   * (To be filled)
   * @param {AbstractCell} referenceCell
   * @param {number} relX
   * @param {number} relY
   * @param {boolean} loopAtEndOfScreen
   */
  getRelativePositionCell(
    referenceCell: AbstractCell, relX: number, relY: number, loopAtEndOfScreen: boolean,
  ): AbstractCell {
    if (referenceCell === NULL) return referenceCell;
    if (relX === 0 && relY === 0) return referenceCell;

    const referenceIndex = this.getCellIndex(referenceCell);
    const targetIndex = {
      x: referenceIndex.x + relX,
      y: referenceIndex.y + relY,
    };

    if (loopAtEndOfScreen) {
      if (targetIndex.x < 0) targetIndex.x += this.cell2DArray.xCount;
      else if (targetIndex.x >= this.cell2DArray.xCount) targetIndex.x -= this.cell2DArray.xCount;
      if (targetIndex.y < 0) targetIndex.y += this.cell2DArray.yCount;
      else if (targetIndex.y >= this.cell2DArray.yCount) targetIndex.y -= this.cell2DArray.yCount;
    } else {
      if (
        targetIndex.x < 0 || targetIndex.x >= this.cell2DArray.xCount ||
        targetIndex.y < 0 || targetIndex.y >= this.cell2DArray.yCount
      ) return NULL;
    }

    return this.cell2DArray.get2D(targetIndex.x, targetIndex.y);
  }

  private setNeighborCells(
    referenceCell: Cell, neighborRange: number, loopAtEndOfScreen: boolean,
  ): void {
    for (let relativeX = -neighborRange; relativeX <= neighborRange; relativeX += 1) {
      for (let relativeY = -neighborRange; relativeY <= neighborRange; relativeY += 1) {
        referenceCell.setNeighborCell(
          relativeX + neighborRange,
          relativeY + neighborRange,
          this.getRelativePositionCell(referenceCell, relativeX, relativeY, loopAtEndOfScreen),
        );
      }
    }
  }
}
