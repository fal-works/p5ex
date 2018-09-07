import { TwoDimensionalArray } from './TwoDimensionalArray';

/**
 * (To be filled)
 */
export interface Cell {
  getNeighborCell(relativeX: number, relativeY: number): Cell;
  setNeighborCell(relativeX: number, relativeY: number, cell: Cell): void;
}

/**
 * (To be filled)
 */
export class NullCell implements Cell {
  getNeighborCell(relativeX: number, relativeY: number): Cell {
    return this;
  }

  setNeighborCell(relativeX: number, relativeY: number, cell: Cell): void { }
}

const NULL = new NullCell();

/**
 * (To be filled)
 */
export class NaiveCell implements Cell {
  /**
   * Neighbor cells.
   */
  protected readonly neighborCells: TwoDimensionalArray<Cell>;

  /**
   *
   * @param neighborRange
   */
  constructor(neighborRange: number = 1) {
    this.neighborCells = new TwoDimensionalArray<Cell>(
      2 * neighborRange + 1, 2 * neighborRange + 1, NULL,
    );
  }

  /**
   * Returns the specified neighbor cell.
   * @param {number} relativeX
   * @param {number} relativeY
   */
  getNeighborCell(relativeX: number, relativeY: number): Cell {
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
  setNeighborCell(relativeX: number, relativeY: number, cell: Cell): void {
    const neighborRange = Math.floor(this.neighborCells.xCount / 2);
    this.neighborCells.set2D(relativeX + neighborRange, relativeY + neighborRange, cell);
  }
}

export interface Index2D {
  x: number;
  y: number;
}

/**
 * (To be filled)
 */
export class Grid<T extends Cell> {
  /**
   * Cells.
   */
  cell2DArray: TwoDimensionalArray<T>;

  private cellIndexMap: Map<T, Index2D>;

  /**
   *
   * @param {number} xCount
   * @param {number} yCount
   * @param {number} neighborRange
   * @param {boolean} loopAtEndOfScreen
   */
  constructor(
    xCount: number, yCount: number, neighborRange: number, loopAtEndOfScreen: boolean,
    cellFactory: (neighborRange: number) => T,
    public readonly nullCell: T,
  ) {
    this.cell2DArray = new TwoDimensionalArray<T>(xCount, yCount, nullCell);
    this.cellIndexMap = new Map<T, Index2D>();

    for (let yIndex = 0; yIndex < yCount; yIndex += 1) {
      for (let xIndex = 0; xIndex < xCount; xIndex += 1) {
        const cell = cellFactory(neighborRange);
        this.cell2DArray.set2D(xIndex, yIndex, cell);
        this.cellIndexMap.set(cell, { x: xIndex, y: yIndex });
      }
    }

    this.cell2DArray.loop((cell: T) => {
      this.setNeighborCells(cell, neighborRange, loopAtEndOfScreen);
    });
  }

  /**
   * Returns the specified cell.
   * @param {number} x - X index.
   * @param {number} y - Y index.
   */
  getCell(x: number, y: number): T {
    return this.cell2DArray.get2D(x, y);
  }

  /**
   * Returns the x and y index of the given cell.
   * @param cell
   */
  getCellIndex(cell: T): Index2D {
    return this.cellIndexMap.get(cell) || { x: -1, y: -1 };
  }

  /**
   * (To be filled)
   * @param referenceCell
   * @param {number} relX
   * @param {number} relY
   * @param {boolean} loopAtEndOfScreen
   */
  getRelativePositionCell(
    referenceCell: T, relX: number, relY: number, loopAtEndOfScreen: boolean,
  ): T {
    if (referenceCell === this.nullCell) return referenceCell;
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
      ) return this.nullCell;
    }

    return this.cell2DArray.get2D(targetIndex.x, targetIndex.y);
  }

  private setNeighborCells(
    referenceCell: T, neighborRange: number, loopAtEndOfScreen: boolean,
  ): void {
    for (let relativeX = -neighborRange; relativeX <= neighborRange; relativeX += 1) {
      for (let relativeY = -neighborRange; relativeY <= neighborRange; relativeY += 1) {
        referenceCell.setNeighborCell(
          relativeX,
          relativeY,
          this.getRelativePositionCell(referenceCell, relativeX, relativeY, loopAtEndOfScreen),
        );
      }
    }
  }
}
