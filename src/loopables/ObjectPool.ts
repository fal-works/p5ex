import { LoopableArray } from 'no-more-for-loops';
import { Cleanable, CleanableArray } from './Cleanable';

/**
 * Pool object with use() and recycle(obj) methods.
 */
export interface NaivePool<T> {
  use(): T;
  recycle(usedObject: T): void;
}

/**
 * Object pool which calls the provided function for every element when using & recyling.
 * Intended to use with the library deePool, but can also be used with another implementation.
 */
export class ObjectPool<T> {
  // recycle() must be a clojure for use in recycleAll()
  /**
   * Recycles the object.
   * @param usedObject
   */
  readonly recycle: (usedObject: T) => void;

  readonly naivePool: NaivePool<T>;
  protected readonly useProcess: (object: T) => any;
  protected readonly recycleProcess: (object: T) => any;

  /**
   *
   * @param naivePool - The pool object with use() and recycle(obj) methods.
   * @param useProcess - The callback function which will be called in use().
   * @param recycleProcess - The callback function which will be called in recycle().
   */
  constructor(
    naivePool: NaivePool<T>,
    useProcess?: (object: T) => any,
    recycleProcess?: (object: T) => any,
  ) {
    this.naivePool = naivePool;
    this.useProcess = useProcess || ((object: T) => { });
    this.recycleProcess = recycleProcess || ((object: T) => { });

    this.recycle = (usedObject: T) => {
      this.recycleProcess(usedObject);
      this.naivePool.recycle(usedObject);
    };
  }

  /**
   * Returns an object which is currently not in use.
   */
  use(): T {
    const newObject = this.naivePool.use();
    this.useProcess(newObject);
    return newObject;
  }

  /**
   * Recycles all elements of the provided array.
   * @param array
   */
  recycleAll(array: LoopableArray<T>) {
    array.loop(this.recycle);
  }
}

/**
 * Array of pooled objects. Recycles every removing object when clean() has been called.
 */
export class PoolableArray<T extends Cleanable> extends CleanableArray<T> {
  readonly pool: ObjectPool<T>;

  constructor(pool: ObjectPool<T>, initialCapacity?: number) {
    super(initialCapacity);
    this.pool = pool;
  }

  clean(): void {
    super.clean();
    this.recentRemovedElements.loop(this.pool.recycle);
    this.recentRemovedElements.clear();
  }
}
