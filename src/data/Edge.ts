export interface Edge<T> {
  nodeA: T;
  nodeB: T;

  isIncidentTo(node: T): boolean;
  getAdjacentNode(node: T): T;
}

/**
 * A Naive implementation of an edge between two objects.
 */
export class NaiveEdge<T> implements Edge<T> {
  /**
   * The start point node.
   */
  nodeA: T;

  /**
   * The end point node.
   */
  nodeB: T;

  /**
   *
   * @param nodeA
   * @param nodeB
   */
  constructor(nodeA: T, nodeB: T) {
    this.nodeA = nodeA;
    this.nodeB = nodeB;
  }

  /**
   * Returns true if the provided node is incident to this edge.
   * @param node
   */
  isIncidentTo(node: T): boolean {
    return node === this.nodeA || node === this.nodeB;
  }

  /**
   * Returns the adjacent node of the given node via this edge.
   * If this edge is not incident to the given node, returns always the end point node.
   * @param {T} node - any node which is incident to this edge
   */
  getAdjacentNode(node: T): T {
    if (node === this.nodeB) return this.nodeA;
    return this.nodeB;
  }
}
